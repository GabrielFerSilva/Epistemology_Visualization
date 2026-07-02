const container = document.getElementById('grafo');
const todosOsNos = [];

const corBaseIdeia = '#f4d35e';
const corConcorda = '#2e7d32';
const corDiscorda = '#c62828';
const corPadraoBordaPorTopico = {
    Incomensurabilidade: '#67c4ca'
    
};

function hexToRgb(hex) {
    const limpa = hex.replace('#', '');
    const expandida = limpa.length === 3
        ? limpa.split('').map(ch => ch + ch).join('')
        : limpa;
    const valor = parseInt(expandida, 16);
    return {
        r: (valor >> 16) & 255,
        g: (valor >> 8) & 255,
        b: valor & 255
    };
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b]
        .map(valor => Math.max(0, Math.min(255, Math.round(valor))).toString(16).padStart(2, '0'))
        .join('');
}

function mixHexColors(hexA, hexB, ratio) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    const t = Math.max(0, Math.min(1, ratio));
    return rgbToHex(
        a.r + (b.r - a.r) * t,
        a.g + (b.g - a.g) * t,
        a.b + (b.b - a.b) * t
    );
}

function corDoPreenchimentoPorConexao(totalConcorda, totalDiscorda) {
    const total = totalConcorda + totalDiscorda;
    if (total === 0) return corBaseIdeia;

    const saldo = (totalConcorda - totalDiscorda) / total;
    const maxIntensidade = 0.1;
    if (saldo >= 0) {
        return mixHexColors(corBaseIdeia, corConcorda, saldo * maxIntensidade);
    }

    return mixHexColors(corDiscorda, corBaseIdeia, (1 + saldo) * maxIntensidade);
}

// 1. Formatando Epistemólogos (Correção: circularImage e tipo adicionado)
epistemologos.forEach(e => {
    todosOsNos.push({
        id: e.id,
        label: e.label,
        shape: "circularImage",
        image: e.image,
        size: 40,
        borderWidth: 4,
        borderWidthSelected: 4,
        color: {
            border: "#444"
        },
        tipo: "epistemologo",
        ano: Number(e.data_nascimento.substring(0, 4)),
        categoria: e.escola,
        dados: e
    });
});

// 2. Formatando Ideias (Correção: circularImage e tipo adicionado)
ideias.forEach(i => {
    todosOsNos.push({
        id: i.id,
        label: i.label,
        shape: "dot",
        size: i.size,
        color: {
            background: corBaseIdeia,
            border: corPadraoBordaPorTopico[i.categoria] || '#9e9e9e',
            highlight: {
                background: corBaseIdeia,
                border: corPadraoBordaPorTopico[i.categoria] || '#757575'
            }
        },
        borderWidth: 3,
        borderWidthSelected: 3,
        font: {
            size: 18
        },
        tipo: "ideia",
        ano: i.ano,
        categoria: i.categoria,
        dados: i
    });
});

const nodesData = new vis.DataSet(todosOsNos);

todasAsArestas = []

conexoes_ideia_autor.forEach(c => {
    let cor = "#888";
    if(c.label === "Concorda")
        cor = "#2e7d32";
    if(c.label === "Discorda")
        cor = "#c62828";
    todasAsArestas.push({
        id: c.id,
        from: c.from,
        to: c.to,
        label: c.label,
        tipo: "autor-idea",
        color: {
            color: cor
        },
        original_color:cor,
        arrows: "to",
        book: c.book,
        writer: c.writer,
        sentence: c.sentence
    });
});

conexoes_ideia_ideia.forEach(c => {
    todasAsArestas.push({
        id: c.id,
        from: c.from,
        to: c.to,
        label: c.label,
        tipo: "ideia-idea",
        color: {
            color: "#1565c0"
        },
        original_color: "#1565c0",
        arrows: "to"
    });
});

const edgesData = new vis.DataSet(todasAsArestas);

// Recalcular cores das ideias com base nas conexões de concordância/discordância
const votosPorIdeia = {};
todasAsArestas.forEach(aresta => {
    if (aresta.tipo !== 'autor-idea') return;
    if (!votosPorIdeia[aresta.to]) {
        votosPorIdeia[aresta.to] = { concorda: 0, discorda: 0 };
    }

    if (aresta.label === 'Concorda') votosPorIdeia[aresta.to].concorda += 1;
    if (aresta.label === 'Discorda') votosPorIdeia[aresta.to].discorda += 1;
});

nodesData.get().forEach(no => {
    if (no.tipo === 'ideia') {
        const votos = votosPorIdeia[no.id] || { concorda: 0, discorda: 0 };
        const corPreenchimento = corDoPreenchimentoPorConexao(votos.concorda, votos.discorda);
        const corBorda = corPadraoBordaPorTopico[no.categoria] || '#9e9e9e';

        nodesData.update({
            id: no.id,
            color: {
                background: corPreenchimento,
                border: corBorda,
                highlight: {
                    background: corPreenchimento,
                    border: corBorda
                }
            }
        });
    }
});

// Calcular tamanho das ideias baseado em número de conexões
const contagemConexoes = {};
todasAsArestas.forEach(aresta => {
    contagemConexoes[aresta.from] = (contagemConexoes[aresta.from] || 0) + 1;
    contagemConexoes[aresta.to] = (contagemConexoes[aresta.to] || 0) + 1;
});

nodesData.get().forEach(no => {
    if (no.tipo === "ideia") {
        const numConexoes = contagemConexoes[no.id] || 0;
        const tamanhoBase = 25;
        const fatorEscala = 10; // Tamanho das ideias
        const tamanhoNovo = tamanhoBase + (numConexoes * fatorEscala);
        nodesData.update({ id: no.id, size: tamanhoNovo });
    }
});

const data = { nodes: nodesData, edges: edgesData };
const options = {
    nodes: {
        font: {
            size: 14,
            color: "#333",
            strokeWidth: 3,
            strokeColor: "#ffffff"
        },
        chosen: {
            label: false
        }
    },
    edges: {
        width: 3,
        length: 200,
        arrows: {
            to: {
                enabled: true,
                scaleFactor: 0.8
            }
        },
        smooth: {
            type: "dynamic"
        },
        font: {
            align: "top",
            size: 12,
            strokeWidth: 3,
            strokeColor: "#ffffff"
        },
        hoverWidth: 5
    },
    interaction: { hover: true }
};

const network = new vis.Network(container, data, options);

const timeline = document.getElementById('timeline');
const timelineToggle = document.getElementById('timeline-toggle');
const sidebarConteudo = document.getElementById('conteudo-sidebar');
const sidebar = document.getElementById('sidebar');

const slider = document.getElementById("timeline-slider");
const botaoPlay = document.getElementById("timeline-play");
const botaoIntervalo = document.getElementById("timeline-interval-toggle");
const sliderBegin = document.getElementById("timeline-slider-begin");
const sliderEnd = document.getElementById("timeline-slider-end");
const intervalWrap = document.getElementById("timeline-interval-wrap");

let timerTimeline = null;
let modoIntervalo = false;
let timelineVisivel = true;

function mostrarTimeline() {
    timeline.classList.remove('timeline-collapsed');
    timelineVisivel = true;
    timelineToggle.classList.add('timeline-open');
}

function ocultarTimeline() {
    timeline.classList.add('timeline-collapsed');
    timelineVisivel = false;
    timelineToggle.classList.remove('timeline-open');
}

function alternarTimeline() {
    if (timelineVisivel) {
        ocultarTimeline();
    } else {
        mostrarTimeline();
    }
}

timelineToggle.addEventListener('click', alternarTimeline);

function mostrarSidebar() {
    sidebar.classList.remove('sidebar-hidden');
}

function ocultarSidebar() {
    sidebar.classList.add('sidebar-hidden');
}

function atualizarUIControlesTimeline() {
    if (modoIntervalo) {
        slider.classList.add("timeline-hidden");
        intervalWrap.classList.remove("timeline-hidden");
        botaoIntervalo.textContent = "✓ Intervalo";
    } else {
        slider.classList.remove("timeline-hidden");
        intervalWrap.classList.add("timeline-hidden");
        botaoIntervalo.textContent = "⟷ Intervalo";
    }
}

function atualizarTextoBotaoPlay() {
    botaoPlay.textContent = timerTimeline ? "⏸ Pausar" : "▶ Iniciar";
}

function pararAnimacaoTimeline() {
    if (timerTimeline) {
        clearInterval(timerTimeline);
        timerTimeline = null;
        atualizarTextoBotaoPlay();
    }
}

function iniciarAnimacaoTimeline() {
    const sliderAtivo = modoIntervalo ? sliderEnd : slider;
    const anoMin = Number(sliderAtivo.min);
    const anoMax = Number(sliderAtivo.max);
    let anoAtual = Number(sliderAtivo.value);

    if (anoAtual >= anoMax) {
        anoAtual = anoMin;
        sliderAtivo.value = String(anoAtual);
        if (modoIntervalo) {
            sliderBegin.value = String(anoMin);
            atualizarTimelineIntervalo(anoMin, anoAtual);
        } else {
            atualizarTimeline(anoAtual);
        }
    }

    timerTimeline = setInterval(() => {
        const ano = Number(sliderAtivo.value);
        if (ano >= anoMax) {
            pararAnimacaoTimeline();
            return;
        }

        const proximoAno = ano + 1;
        sliderAtivo.value = String(proximoAno);
        if (modoIntervalo) {
            if (Number(sliderBegin.value) > proximoAno) {
                sliderBegin.value = String(proximoAno);
            }
            atualizarTimelineIntervalo(Number(sliderBegin.value), proximoAno);
        } else {
            atualizarTimeline(proximoAno);
        }
    }, 120);

    atualizarTextoBotaoPlay();
}

botaoPlay.addEventListener("click", () => {
    if (timerTimeline) {
        pararAnimacaoTimeline();
    } else {
        iniciarAnimacaoTimeline();
    }
});

slider.addEventListener("input", (e)=>{
    pararAnimacaoTimeline();
    atualizarTimeline(Number(e.target.value));
});

botaoIntervalo.addEventListener("click", () => {
    pararAnimacaoTimeline();
    modoIntervalo = !modoIntervalo;
    atualizarUIControlesTimeline();

    if (modoIntervalo) {
        sliderBegin.value = sliderBegin.value || slider.min;
        sliderEnd.value = slider.value;
        if (Number(sliderBegin.value) > Number(sliderEnd.value)) {
            sliderBegin.value = sliderEnd.value;
        }
        atualizarTimelineIntervalo(Number(sliderBegin.value), Number(sliderEnd.value));
    } else {
        atualizarTimeline(Number(slider.value));
    }
});

sliderBegin.addEventListener("input", (e) => {
    pararAnimacaoTimeline();
    let inicio = Number(e.target.value);
    let fim = Number(sliderEnd.value);
    if (inicio > fim) {
        fim = inicio;
        sliderEnd.value = String(fim);
    }
    atualizarTimelineIntervalo(inicio, fim);
});

sliderEnd.addEventListener("input", (e) => {
    pararAnimacaoTimeline();
    let fim = Number(e.target.value);
    let inicio = Number(sliderBegin.value);
    if (fim < inicio) {
        inicio = fim;
        sliderBegin.value = String(inicio);
    }
    atualizarTimelineIntervalo(inicio, fim);
});

function aplicarFiltro(noId) {
  const vizinhos = network.getConnectedNodes(noId);
  const destacados = new Set([noId, ...vizinhos]);

  const updates = nodesData.get().map(no => ({
    id: no.id,
    opacity: destacados.has(no.id) ? 1.0 : 0.15
  }));
  nodesData.update(updates);

  const arestas = network.getConnectedEdges(noId);
  const edgeUpdates = edgesData.get().map(e => ({
    id: e.id,
    color: arestas.includes(e.id)
      ? { color: '#4caf50', opacity: 1 }
      : { color: '#ccc', opacity: 0.1 }
  }));
  edgesData.update(edgeUpdates);
}

function resetarFiltro() {
  nodesData.update(nodesData.get().map(no => ({ id: no.id, opacity: 1.0 })));
  edgesData.update(edgesData.get().map(e => ({ id: e.id, color: { color: e.original_color, opacity: 1 } })));
}

// Versão genérica de aplicarFiltro: destaca um conjunto de nós e um conjunto de
// arestas específicas (em vez de somente os vizinhos diretos de um único nó).
// Usada pela ferramenta de interseção entre autores.
function aplicarFiltroConjunto(idsNosDestacados, idsArestasDestacadas) {
  const destacados = new Set(idsNosDestacados);
  const arestas = new Set(idsArestasDestacadas);

  const updates = nodesData.get().map(no => ({
    id: no.id,
    opacity: destacados.has(no.id) ? 1.0 : 0.15
  }));
  nodesData.update(updates);

  const edgeUpdates = edgesData.get().map(e => ({
    id: e.id,
    color: arestas.has(e.id)
      ? { color: '#4caf50', opacity: 1 }
      : { color: '#ccc', opacity: 0.1 }
  }));
  edgesData.update(edgeUpdates);
}

function atualizarTimeline(ano){
    document
        .getElementById("timeline-year")
        .textContent = ano;
    const atualizacoes = [];
    nodesData.forEach(node=>{
        atualizacoes.push({
            id:node.id,
            hidden:node.ano > ano
        });
    });
    nodesData.update(atualizacoes);
    atualizarArestas();
}

function atualizarTimelineIntervalo(inicio, fim) {
    document
        .getElementById("timeline-year")
        .textContent = `${inicio} - ${fim}`;

    const atualizacoes = [];
    nodesData.forEach(node => {
        let hidden = false;
        if (node.tipo === 'epistemologo') {
            hidden = node.ano < inicio || node.ano > fim;
        }
        atualizacoes.push({
            id: node.id,
            hidden
        });
    });
    nodesData.update(atualizacoes);
    atualizarArestas();
}

function atualizarArestas(){
    const allNodes = nodesData.get();
    const nodeById = new Map(allNodes.map(node => [node.id, node]));

    // 1) Descobrir ideias que têm pelo menos um autor visível conectado
    const ideiasComAutorVisivel = new Set();
    edgesData.forEach(edge => {
        if (edge.tipo !== 'autor-idea') return;

        const autor = nodeById.get(edge.from);
        const ideia = nodeById.get(edge.to);
        if (!autor || !ideia) return;

        if (!autor.hidden && !ideia.hidden) {
            ideiasComAutorVisivel.add(edge.to);
        }
    });

    // 2) Ocultar ideias sem autor visível
    const ideiaUpdates = [];
    allNodes.forEach(node => {
        if (node.tipo !== 'ideia') return;

        const hiddenPorContexto = !!node.hidden;
        const hiddenSemAutorVisivel = !ideiasComAutorVisivel.has(node.id);
        ideiaUpdates.push({
            id: node.id,
            hidden: hiddenPorContexto || hiddenSemAutorVisivel
        });
    });
    nodesData.update(ideiaUpdates);

    // 3) Recalcular visibilidade das arestas com estado final dos nós
    const updates = [];
    edgesData.forEach(edge => {
        const origem = nodesData.get(edge.from);
        const destino = nodesData.get(edge.to);

        updates.push({
            id: edge.id,
            hidden: origem.hidden || destino.hidden
        });
    });
    edgesData.update(updates);
}

function exibirEpistemologo(noId) {
    const noSelecionado = nodesData.get(noId);
    const dadosOriginais = noSelecionado.dados;

    aplicarFiltro(noId);
    mostrarSidebar();
    sidebarConteudo.innerHTML = `
            <h2>${dadosOriginais.nome}</h2>

            <span class="meta-info">
                ${dadosOriginais.escola}
            </span>

            <div style="margin:20px 0; text-align:center;">
                <img
                    src="${dadosOriginais.image}"
                    alt="${dadosOriginais.nome}"
                    style="
                        width:180px;
                        height:180px;
                        object-fit:cover;
                        border-radius:50%;
                    "
                >
            </div>

            <p>
                <strong>Nascimento:</strong>
                ${dadosOriginais.data_nascimento}
            </p>

            <p>
                <strong>Falecimento:</strong>
                ${dadosOriginais.data_morte}
            </p>

            <p>
                <strong>Escola Filosófica:</strong>
                ${dadosOriginais.escola}
            </p>

            <p>
                <strong>Obras principais:</strong>
                ${dadosOriginais.livros.join(", ")}
            </p>

            <hr>

            <h3>Resumo</h3>

            <p style="text-align:justify;">
                ${dadosOriginais.resumo}
            </p>
        `;
}

function exibirIdeia(noId) {
    const noSelecionado = nodesData.get(noId);
    const dadosOriginais = noSelecionado.dados;

    resetarFiltro();
    mostrarSidebar();
    sidebarConteudo.innerHTML = `
        <h2>${dadosOriginais.label}</h2>
        <span class="meta-info meta-ideia">ID do Vértice: #${noSelecionado.id}</span>
        <div style="margin: 15px 0; text-align:center;">
            <img src="${dadosOriginais.image}" alt="Ícone Ideia" style="width:80px; height:80px;">
        </div>
        <blockquote class="citacao-ideia">
            "${dadosOriginais.sentence}"
        </blockquote>
    `;
}

network.on("click", function (params) {
    if (params.nodes.length > 0) {
        const noId = params.nodes[0];
        const noSelecionado = nodesData.get(noId);

        if (noSelecionado.tipo === "epistemologo") {
            exibirEpistemologo(noId);
        } else if (noSelecionado.tipo === "ideia") {
            exibirIdeia(noId);
        } else {
            resetarFiltro();
            mostrarSidebar();
        }
    } 
    else if (params.edges.length > 0) {
        mostrarSidebar();
        const arestaId = params.edges[0];
        const arestaSelecionada = edgesData.get(arestaId);
        
        const noOrigem = nodesData.get(arestaSelecionada.from).label;
        const noDestino = nodesData.get(arestaSelecionada.to).label;

        sidebarConteudo.innerHTML = `
            <h2>Conexão: ${arestaSelecionada.label || 'Sem Nome'}</h2>
            <p style="margin-top: 15px;"><strong>Conecta:</strong> ${noOrigem} ➔ ${noDestino}</p>
            <p><strong>Livro de Referência:</strong> ${arestaSelecionada.book}</p>
            <p><strong>Autor da Citação:</strong> ${arestaSelecionada.writer}</p>
        `;
    }
    else {
        resetarFiltro();
        ocultarSidebar();
    }
});

// ==========================================================================
// Filtro por autor (canto superior esquerdo)
// ==========================================================================

const authorFilterPanel = document.getElementById('author-filter-panel');
const authorFilterSelect = document.getElementById('author-filter-select');

function popularFiltroAutores() {
    const autores = nodesData.get()
        .filter(no => no.tipo === 'epistemologo')
        .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));

    autores.forEach(autor => {
        const opcao = document.createElement('option');
        opcao.value = autor.id;
        opcao.textContent = autor.label;
        authorFilterSelect.appendChild(opcao);
    });
}

authorFilterSelect.addEventListener('change', (e) => {
    const autorId = e.target.value;

    if (!autorId) {
        resetarFiltro();
        ocultarSidebar();
        return;
    }

    network.selectNodes([autorId]);
    network.focus(autorId, { scale: 1, animation: { duration: 400 } });
    exibirEpistemologo(autorId);
});

// A barra de filtro acompanha o botão da timeline: quando a timeline está
// visível, ela desce para não ficar por baixo/colada na barra superior.
function sincronizarFiltroComTimeline() {
    authorFilterPanel.classList.toggle('timeline-open', timelineVisivel);
    sidebar.classList.toggle('timeline-open', timelineVisivel); // <-- ADICIONE ESTA LINHA
}

const mostrarTimelineOriginal = mostrarTimeline;
mostrarTimeline = function () {
    mostrarTimelineOriginal();
    sincronizarFiltroComTimeline();
};

const ocultarTimelineOriginal = ocultarTimeline;
ocultarTimeline = function () {
    ocultarTimelineOriginal();
    sincronizarFiltroComTimeline();
};

// ==========================================================================
// Interseção entre autores (canto inferior esquerdo)
// ==========================================================================

const authorIntersectionToggle = document.getElementById('author-intersection-toggle');
const authorIntersectionPanel = document.getElementById('author-intersection-panel');
const authorIntersectionList = document.getElementById('author-intersection-list');
const authorIntersectionApply = document.getElementById('author-intersection-apply');
const authorIntersectionClear = document.getElementById('author-intersection-clear');
const authorIntersectionClose = document.getElementById('author-intersection-close');
const authorIntersectionHint = document.getElementById('author-intersection-hint');

function popularListaInterseccao() {
    const autores = nodesData.get()
        .filter(no => no.tipo === 'epistemologo')
        .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));

    autores.forEach(autor => {
        const linha = document.createElement('label');
        linha.className = 'author-intersection-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = autor.id;

        linha.appendChild(checkbox);
        linha.appendChild(document.createTextNode(autor.label));
        authorIntersectionList.appendChild(linha);
    });
}

function alternarPainelInterseccao() {
    authorIntersectionPanel.classList.toggle('panel-hidden');
}

authorIntersectionToggle.addEventListener('click', alternarPainelInterseccao);
authorIntersectionClose.addEventListener('click', () => {
    authorIntersectionPanel.classList.add('panel-hidden');
});

// Descobre, para cada autor selecionado, o conjunto de ideias às quais ele
// está ligado (concordando ou discordando) e devolve apenas as ideias
// compartilhadas por TODOS os autores selecionados — como um caminho no
// grafo que os conecta.
function calcularInterseccaoDeIdeias(idsAutores) {
    const ideiasPorAutor = idsAutores.map(autorId => {
        const conjunto = new Set();
        edgesData.forEach(edge => {
            if (edge.tipo === 'autor-idea' && edge.from === autorId) {
                conjunto.add(edge.to);
            }
        });
        return conjunto;
    });

    const [primeiro, ...resto] = ideiasPorAutor;
    const ideiasComuns = new Set(
        [...primeiro].filter(ideiaId => resto.every(conjunto => conjunto.has(ideiaId)))
    );

    return ideiasComuns;
}

authorIntersectionApply.addEventListener('click', () => {
    const idsSelecionados = Array.from(
        authorIntersectionList.querySelectorAll('input[type="checkbox"]:checked')
    ).map(cb => cb.value);

    if (idsSelecionados.length < 2) {
        authorIntersectionHint.textContent = 'Selecione ao menos dois autores.';
        return;
    }

    const ideiasComuns = calcularInterseccaoDeIdeias(idsSelecionados);

    if (ideiasComuns.size === 0) {
        authorIntersectionHint.textContent = 'Esses autores não compartilham nenhuma ideia.';
    } else {
        authorIntersectionHint.textContent = `${ideiasComuns.size} ideia(s) em comum encontrada(s).`;
    }

    // Nós destacados: autores selecionados + ideias em comum
    const nosDestacados = new Set([...idsSelecionados, ...ideiasComuns]);

    // Arestas destacadas: todas as ligações autor-ideia entre os autores
    // selecionados e as ideias em comum, além de possíveis ligações
    // ideia-ideia entre essas próprias ideias em comum (formando o "caminho").
    const arestasDestacadas = new Set();
    edgesData.forEach(edge => {
        if (edge.tipo === 'autor-idea' && idsSelecionados.includes(edge.from) && ideiasComuns.has(edge.to)) {
            arestasDestacadas.add(edge.id);
        }
        if (edge.tipo === 'ideia-idea' && ideiasComuns.has(edge.from) && ideiasComuns.has(edge.to)) {
            arestasDestacadas.add(edge.id);
        }
    });

    aplicarFiltroConjunto(nosDestacados, arestasDestacadas);
    mostrarSidebar();

    const nomesAutores = idsSelecionados
        .map(id => nodesData.get(id).label)
        .join(', ');
    const listaIdeias = [...ideiasComuns]
        .map(id => `<li>${nodesData.get(id).label}</li>`)
        .join('');

    sidebarConteudo.innerHTML = `
        <h2>Interseção entre autores</h2>
        <span class="meta-info">${nomesAutores}</span>
        <p style="margin-top:15px;"><strong>Ideias em comum:</strong></p>
        <ul>${listaIdeias || '<li>Nenhuma ideia em comum</li>'}</ul>
    `;
});

authorIntersectionClear.addEventListener('click', () => {
    authorIntersectionList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    authorIntersectionHint.textContent = '';
    resetarFiltro();
    ocultarSidebar();
});

// ==========================================================================
// Modo escuro (engrenagem)
// ==========================================================================

const settingsToggle = document.getElementById('settings-toggle');
const settingsPanel = document.getElementById('settings-panel');
const darkModeToggle = document.getElementById('dark-mode-toggle');

settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.toggle('panel-hidden');
});

function aplicarModoEscuro(ativo) {
    document.body.classList.toggle('dark-mode', ativo);

    // 1. Aplica as cores globais (afeta os epistemólogos e as arestas)
    network.setOptions({
        nodes: {
            font: {
                color: ativo ? '#f2ece2' : '#333333',
                strokeColor: ativo ? '#1b1815' : '#ffffff'
            }
        },
        edges: {
            font: {
                color: ativo ? '#f2ece2' : '#343434',
                strokeColor: ativo ? '#1b1815' : '#ffffff'
            }
        }
    });

    // 2. Força os nós do tipo "ideia" a NÃO inverterem a cor do texto
    const updates = nodesData.get().map(no => {
        if (no.tipo === 'ideia') {
            return {
                id: no.id,
                font: {
                    color: '#ffffff', 
                    strokeColor: '#333333' 
                }
            };
        }
        return { id: no.id };
    });
    nodesData.update(updates);
}

darkModeToggle.addEventListener('change', (e) => {
    aplicarModoEscuro(e.target.checked);
});

// Fecha os painéis flutuantes ao clicar fora deles
document.addEventListener('click', (e) => {
    if (!authorIntersectionPanel.contains(e.target) && e.target !== authorIntersectionToggle && !authorIntersectionToggle.contains(e.target)) {
        authorIntersectionPanel.classList.add('panel-hidden');
    }
    if (!settingsPanel.contains(e.target) && e.target !== settingsToggle && !settingsToggle.contains(e.target)) {
        settingsPanel.classList.add('panel-hidden');
    }
});

popularFiltroAutores();
popularListaInterseccao();

atualizarTimeline(2025);
atualizarTextoBotaoPlay();
atualizarUIControlesTimeline();
ocultarTimeline();
ocultarSidebar();
sincronizarFiltroComTimeline();