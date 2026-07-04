const container = document.getElementById('grafo');
const todosOsNos = [];
const corBaseIdeia = '#f4d35e';
const corConcorda = '#409144';
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
    const maxIntensidade = 0.8;
    if (saldo >= 0) {
        return mixHexColors(corBaseIdeia, corConcorda, saldo * maxIntensidade);
    }

    return mixHexColors(corBaseIdeia, corDiscorda, (1 + saldo) * maxIntensidade);
}

// 1. Formatando Epistemólogos
epistemologos.forEach(e => {
    todosOsNos.push({
        id: e.id,
        label: e.label,
        shape: "circularImage",
        image: e.image,
        size: 60,
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

// 2. Formatando Ideias
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
const todasAsArestas = [];

conexoes_ideia_autor.forEach(c => {
    let cor = "#888";
    if(c.label === "Concorda") cor = "#2e7d32";
    if(c.label === "Discorda") cor = "#c62828";
    if(c.label === "Criador") cor = '#c1d2dd';
    if(c.label === "Neutro") cor = '#898989';
    todasAsArestas.push({
        id: c.id,
        from: c.from,
        to: c.to,
        label: c.label,
        tipo: "autor-idea",
        color: { color: cor },
        original_color: cor,
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
        color: { color: "#1565c0" },
        original_color: "#1565c0",
        arrows: "to"
    });
});

const edgesData = new vis.DataSet(todasAsArestas);

// Recalcular cores das ideias com base nas conexões
const votosPorIdeia = {};
todasAsArestas.forEach(aresta => {
    if (aresta.tipo !== 'autor-idea') return;
    if (!votosPorIdeia[aresta.to]) {
        votosPorIdeia[aresta.to] = { concorda: 0, discorda: 0 };
    }
    if (aresta.label === 'Concorda' || aresta.label === 'Criador') votosPorIdeia[aresta.to].concorda += 1;
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

// Calcular tamanho das ideias
const contagemConexoes = {};
todasAsArestas.forEach(aresta => {
    contagemConexoes[aresta.from] = (contagemConexoes[aresta.from] || 0) + 1;
    contagemConexoes[aresta.to] = (contagemConexoes[aresta.to] || 0) + 1;
});

nodesData.get().forEach(no => {
    if (no.tipo === "ideia") {
        const numConexoes = contagemConexoes[no.id] || 0;
        const tamanhoBase = 15;
        const fatorEscala = 10;
        const logValue = Math.max(1, numConexoes * fatorEscala);
        const tamanhoNovo = tamanhoBase + 10 * Math.log(logValue);
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
        chosen: { label: false }
    },
    edges: {
        width: 3,
        length: 250,
        arrows: { to: { enabled: true, scaleFactor: 0.8 } },
        smooth: { type: "dynamic" },
        font: {
            align: "top",
            size: 12,
            strokeWidth: 3,
            strokeColor: "#ffffff"
        },
        hoverWidth: 5
    },
    interaction: { hover: true },
    physics: {
        enabled: true,
        barnesHut: {
            gravitationalConstant: -2500,
            centralGravity: 0.15,
            springLength: 250,
            springConstant: 0.02,
            damping: 0.09,
            avoidOverlap: 1.2
        },
        stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 25,
            onlyDynamicEdges: false,
            fit: true
        }
    }
};

// Define posições iniciais mais espaçadas para os nós,
// antes da física estabilizar o layout.
(function definirPosicoesIniciais() {
    const allNodes = nodesData.get();
    if (allNodes.length === 0) return;

    const containerWidth = container.clientWidth || 1000;
    const containerHeight = container.clientHeight || 700;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    const layoutRadius = Math.min(containerWidth, containerHeight) * 0.45;

    allNodes.forEach((no, index) => {
        const angle = (2 * Math.PI * index) / allNodes.length;
        const radius = layoutRadius * (0.6 + 0.4 * Math.random());
        nodesData.update({
            id: no.id,
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius
        });
    });
})();

const network = new vis.Network(container, data, options);

// ==========================================================================
// Fundo Interativo e Sem Flicker (Renderizado no Canvas)
// ==========================================================================
const limiteZoomParaOcultarPadrao = 0.35;
const gridToggle = document.getElementById('grid-toggle');

network.on('beforeDrawing', function (ctx) {
    if (gridToggle && gridToggle.checked) return;
    if (container && container.classList.contains('sem-grid')) return;

    const escala = network.getScale();
    if (escala <= limiteZoomParaOcultarPadrao) return;

    const topoEsq = network.DOMtoCanvas({ x: 0, y: 0 });
    const infDir = network.DOMtoCanvas({ x: container.clientWidth, y: container.clientHeight });

    const espacamento = 40;
    const inicioX = Math.floor(topoEsq.x / espacamento) * espacamento;
    const fimX = Math.ceil(infDir.x / espacamento) * espacamento;
    const inicioY = Math.floor(topoEsq.y / espacamento) * espacamento;
    const fimY = Math.ceil(infDir.y / espacamento) * espacamento;

    ctx.save();
    const modoEscuro = document.body.classList.contains('dark-mode');
    ctx.fillStyle = modoEscuro ? '#2f2a24' : '#d8d8d8';

    for (let x = inicioX; x <= fimX; x += espacamento) {
        for (let y = inicioY; y <= fimY; y += espacamento) {
            ctx.fillRect(x - 3, y - 0.5, 6, 1);
            ctx.fillRect(x - 0.5, y - 3, 1, 6);
        }
    }
    ctx.restore();
});

// ==========================================================================
// Timeline e Controles
// ==========================================================================

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
    sincronizarFiltroComTimeline();
}

function ocultarTimeline() {
    timeline.classList.add('timeline-collapsed');
    timelineVisivel = false;
    timelineToggle.classList.remove('timeline-open');
    sincronizarFiltroComTimeline();
}

function alternarTimeline() {
    if (timelineVisivel) ocultarTimeline();
    else mostrarTimeline();
}

timelineToggle.addEventListener('click', alternarTimeline);

function mostrarSidebar() {
    sidebar.classList.remove('sidebar-hidden');
    sidebar.style.transform = 'translateX(0)';
    sidebar.style.opacity = '1';
    sidebar.style.pointerEvents = 'auto';
}

function ocultarSidebar() {
    sidebar.classList.add('sidebar-hidden');
    sidebar.style.transform = 'translateX(100%)';
    sidebar.style.opacity = '0';
    sidebar.style.pointerEvents = 'none';
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
    if (timerTimeline) pararAnimacaoTimeline();
    else iniciarAnimacaoTimeline();
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
    document.getElementById("timeline-year").textContent = ano;
    const atualizacoes = [];
    nodesData.forEach(node=>{
        atualizacoes.push({ id:node.id, hidden:node.ano > ano });
    });
    nodesData.update(atualizacoes);
    atualizarArestas();
}

function atualizarTimelineIntervalo(inicio, fim) {
    document.getElementById("timeline-year").textContent = `${inicio} - ${fim}`;
    const atualizacoes = [];
    nodesData.forEach(node => {
        let hidden = false;
        if (node.tipo === 'epistemologo') {
            hidden = node.ano < inicio || node.ano > fim;
        }
        atualizacoes.push({ id: node.id, hidden });
    });
    nodesData.update(atualizacoes);
    atualizarArestas();
}

function atualizarArestas(){
    const allNodes = nodesData.get();
    const nodeById = new Map(allNodes.map(node => [node.id, node]));

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

    // Converte o array de livros em uma lista HTML (<li>Livro A</li><li>Livro B</li>...)
    const listaLivrosHTML = dadosOriginais.livros
        .map(livro => `<li>${livro}</li>`)
        .join("");

    aplicarFiltro(noId);
    mostrarSidebar();
    sidebarConteudo.innerHTML = `
            <h2>${dadosOriginais.nome}</h2>
            <span class="meta-info">${dadosOriginais.escola}</span>
            <div style="margin:20px 0; text-align:center;">
                <img src="${dadosOriginais.image}" alt="${dadosOriginais.nome}" style="width:180px; height:180px; object-fit:cover; border-radius:50%;">
            </div>
            <p><strong>Nascimento:</strong> ${dadosOriginais.data_nascimento}</p>
            <p><strong>Falecimento:</strong> ${dadosOriginais.data_morte}</p>
            <p><strong>Escola Filosófica:</strong> ${dadosOriginais.escola}</p>
            
            <p style="margin-bottom: 4px;"><strong>Obras principais:</strong></p>
            <ul style="margin-top: 0; padding-left: 20px;">
                ${listaLivrosHTML}
            </ul>
            
            <hr>
            <h3>Resumo</h3>
            <p style="text-align:justify;">${dadosOriginais.resumo}</p>
        `;
}

function exibirIdeia(noId) {
    const noSelecionado = nodesData.get(noId);
    const dadosOriginais = noSelecionado.dados;

    // Busca a cor no dicionário pelo nome do tópico. 
    // Se não encontrar no dicionário, usa a cor padrão verde (#4caf50)
    const corTopico = corPadraoBordaPorTopico[dadosOriginais.categoria] || '#4caf50';

    resetarFiltro();
    mostrarSidebar();
    
    // Aplicamos a corTopico no style da meta-info (fundo) e da citação (borda esquerda)
    sidebarConteudo.innerHTML = `
        <h2>${dadosOriginais.label}</h2>
        <span class="meta-info meta-ideia" style="background-color: ${corTopico}; color: #ffffff;">
            Tópico: ${dadosOriginais.categoria}
        </span>
        <div style="margin: 15px 0; text-align:center;">
            <img src="${dadosOriginais.image}" alt="Ícone Ideia" style="width:80px; height:80px;">
        </div>
        <blockquote class="citacao-ideia" style="border-left-color: ${corTopico};">
            "${dadosOriginais.sentence}"
        </blockquote>
    `;
}

// ==========================================================================
// Utilitário para recolher textos longos (Expandir / Recolher)
// ==========================================================================
function formatarTextoExpansivel(texto, limite = 150) {
    if (!texto) return '<span>Sem citação disponível.</span>';
    
    if (texto.length <= limite) {
        return `<span>"${texto}"</span>`;
    }

    const parteCurta = texto.substring(0, limite) + '...';
    
    return `
        <div class="citacao-container">
            <span class="citacao-curta">"${parteCurta}"</span>
            <span class="citacao-longa" style="display: none;">"${texto}"</span>
            <div style="margin-top: 8px; text-align: right;">
                <button type="button" class="btn-expandir-citacao" onclick="alternarCitacao(this)">
                    Ler citação completa ▾
                </button>
            </div>
        </div>
    `;
}

// Função global para o botão alternar a visibilidade
window.alternarCitacao = function(botao) {
    const container = botao.closest('.citacao-container');
    if (!container) return;
    const curta = container.querySelector('.citacao-curta');
    const longa = container.querySelector('.citacao-longa');

    if (curta && curta.style.display !== 'none') {
        curta.style.display = 'none';
        if (longa) longa.style.display = 'inline';
        botao.innerHTML = 'Recolher citação ▴';
    } else {
        if (curta) curta.style.display = 'inline';
        if (longa) longa.style.display = 'none';
        botao.innerHTML = 'Ler citação completa ▾';
    }
};

// ==========================================================================
// Interseção entre autores (Seleção Direta no Grafo via Cliques)
// ==========================================================================

let modoInterseccao = false;
let autoresInterseccao = new Set();

const authorIntersectionToggle = document.getElementById('author-intersection-toggle');
const authorIntersectionPanel = document.getElementById('author-intersection-panel');
const authorIntersectionList = document.getElementById('author-intersection-list');
const authorIntersectionClose = document.getElementById('author-intersection-close');
const authorIntersectionHint = document.getElementById('author-intersection-hint');

// Função vazia apenas para não quebrar inicializações
function popularListaInterseccao() {}

function limparTudoEFechar(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault(); 
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation(); 

    modoInterseccao = false;
    autoresInterseccao.clear();
    
    if (authorIntersectionHint) authorIntersectionHint.textContent = '';
    if (authorIntersectionList) authorIntersectionList.innerHTML = '<p style="padding:5px; font-style:italic; color:#888;">Nenhum autor selecionado no grafo ainda.</p>';
    
    resetarFiltro();
    ocultarSidebar();
    
    // Atraso de 10ms previne o bug do background preso no Vis.js
    setTimeout(() => {
        network.unselectNodes();
    }, 10);
    
    if (authorIntersectionPanel) authorIntersectionPanel.classList.add('panel-hidden');
}

// Lógica de "interruptor": um clique abre, outro clique fecha!
function alternarPainelInterseccao(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();

    if (modoInterseccao) {
        limparTudoEFechar();
    } else {
        modoInterseccao = true;
        autoresInterseccao.clear();
        if (authorIntersectionPanel) authorIntersectionPanel.classList.remove('panel-hidden');
        if (authorIntersectionHint) {
            authorIntersectionHint.textContent = 'Modo Interseção Ativo: Clique nos autores no grafo com o botão ESQUERDO. Botão DIREITO em qualquer lugar limpa e sai.';
        }
        if (authorIntersectionList) {
            authorIntersectionList.innerHTML = '<p style="padding:5px; font-style:italic; color:#888;">Nenhum autor selecionado no grafo ainda.</p>';
        }
    }
}

authorIntersectionToggle.addEventListener('click', alternarPainelInterseccao);
if (authorIntersectionClose) {
    authorIntersectionClose.addEventListener('click', limparTudoEFechar);
}

function atualizarInterseccaoDoGrafo() {
    const selecionados = Array.from(autoresInterseccao);

    if (selecionados.length === 0) {
        authorIntersectionList.innerHTML = '<p style="padding:5px; font-style:italic; color:#888;">Nenhum autor selecionado no grafo ainda.</p>';
        resetarFiltro();
        ocultarSidebar();
        setTimeout(() => network.unselectNodes(), 10);
        return;
    }

    const nomesLista = selecionados.map(id => `<li>• <strong>${nodesData.get(id).label}</strong></li>`).join('');
    authorIntersectionList.innerHTML = `<ul style="list-style:none; padding:5px; margin:0;">${nomesLista}</ul>`;

    if (selecionados.length < 2) {
        resetarFiltro();
        ocultarSidebar();
        setTimeout(() => network.selectNodes(selecionados), 10); 
        return;
    }

    const ideiasComuns = calcularInterseccaoDeIdeias(selecionados);

    const nosDestacados = new Set([...selecionados, ...ideiasComuns]);
    const arestasDestacadas = new Set();
    edgesData.forEach(edge => {
        if (edge.tipo === 'autor-idea' && selecionados.includes(edge.from) && ideiasComuns.has(edge.to)) {
            arestasDestacadas.add(edge.id);
        }
        if (edge.tipo === 'ideia-idea' && ideiasComuns.has(edge.from) && ideiasComuns.has(edge.to)) {
            arestasDestacadas.add(edge.id);
        }
    });

    aplicarFiltroConjunto(nosDestacados, arestasDestacadas);
    setTimeout(() => network.selectNodes(selecionados), 10); 
    mostrarSidebar();

    const nomesAutores = selecionados.map(id => nodesData.get(id).label).join(', ');
    const listaIdeias = [...ideiasComuns].map(id => `<li>${nodesData.get(id).label}</li>`).join('');

    sidebarConteudo.innerHTML = `
        <h2>Interseção entre autores</h2>
        <span class="meta-info">${nomesAutores}</span>
        <p style="margin-top:15px;"><strong>Ideias em comum:</strong></p>
        <ul>${listaIdeias || '<li>Nenhuma ideia em comum</li>'}</ul>
    `;
}

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


// ==========================================================================
// Ações de Eventos do Grafo (Cliques)
// ==========================================================================

network.on("click", function (params) {
    // Usamos um pequeno timeout para evitar que as manipulações de dados corrompam o estado do ponteiro do mouse no Vis.js
    setTimeout(() => {
        if (params.nodes.length > 0) {
            const noId = params.nodes[0];
            const noSelecionado = nodesData.get(noId);

            if (modoInterseccao) {
                if (noSelecionado.tipo === "epistemologo") {
                    if (autoresInterseccao.has(noId)) autoresInterseccao.delete(noId);
                    else autoresInterseccao.add(noId);
                    atualizarInterseccaoDoGrafo();
                }
                return;
            }

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
            if (modoInterseccao) return;
            
            mostrarSidebar();
            const arestaId = params.edges[0];
            const arestaSelecionada = edgesData.get(arestaId);
            const noOrigem = nodesData.get(arestaSelecionada.from).label;
            const noDestino = nodesData.get(arestaSelecionada.to).label;

            // Formata a citação (se existir) com limite de 150 caracteres
            const citacaoFormatada = formatarTextoExpansivel(arestaSelecionada.sentence, 150);

            sidebarConteudo.innerHTML = `
                <h2>Conexão: ${arestaSelecionada.label || 'Sem Nome'}</h2>
                <p style="margin-top: 15px;"><strong>Conecta:</strong> ${noOrigem} ➔ ${noDestino}</p>
                <p><strong>Livro de Referência:</strong> ${arestaSelecionada.book || 'N/A'}</p>
                <p><strong>Autor da Citação:</strong> ${arestaSelecionada.writer || 'N/A'}</p>
                ${arestaSelecionada.sentence ? `
                <div style="margin-top: 15px;">
                    <strong>Citação:</strong>
                    <blockquote class="citacao-ideia" style="margin-top: 5px;">
                        ${citacaoFormatada}
                    </blockquote>
                </div>` : ''}
            `;
        }
        else {
            // Se clicar no VAZIO do grafo, fechar o painel se estiver aberto
            if (modoInterseccao) {
                limparTudoEFechar();
                return;
            }
            resetarFiltro();
            ocultarSidebar();
        }
    }, 10);
});

// Captura o clique com o botão DIREITO no grafo para fechar
network.on("context", function (params) {
    if (params.event) params.event.preventDefault();
    setTimeout(() => {
        limparTudoEFechar();
    }, 10);
});


// ==========================================================================
// Filtro por autor e ideia (canto superior esquerdo)
// ==========================================================================

// Filtro por autor
const authorFilterPanel = document.getElementById('author-filter-panel');
const authorFilterSelect = document.getElementById('author-filter-select');

// Filtro por ideia
const ideaFilterPanel = document.getElementById('idea-filter-panel');
const ideaFilterSelect = document.getElementById('idea-filter-select');

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

function popularFiltroIdeias() {
    const ideiasList = nodesData.get()
        .filter(no => no.tipo === 'ideia')
        .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));

    ideiasList.forEach(ideia => {
        const opcao = document.createElement('option');
        opcao.value = ideia.id;
        opcao.textContent = ideia.label;
        ideaFilterSelect.appendChild(opcao);
    });
}

authorFilterSelect.addEventListener('change', (e) => {
    const autorId = e.target.value;

    if (!autorId) {
        resetarFiltro();
        ocultarSidebar();
        return;
    }

    setTimeout(() => {
        network.selectNodes([autorId]);
        network.focus(autorId, { scale: 1, animation: { duration: 400 } });
    }, 10);
    
    exibirEpistemologo(autorId);
});

ideaFilterSelect.addEventListener('change', (e) => {
    const ideiaId = e.target.value;

    if (!ideiaId) {
        resetarFiltro();
        ocultarSidebar();
        return;
    }

    network.selectNodes([ideiaId]);
    network.focus(ideiaId, { scale: 1, animation: { duration: 400 } });
    exibirIdeia(ideiaId);
});

function sincronizarFiltroComTimeline() {
    if (authorFilterPanel) authorFilterPanel.classList.toggle('timeline-open', timelineVisivel);
    if (ideaFilterPanel) ideaFilterPanel.classList.toggle('timeline-open', timelineVisivel);
    if (sidebar) sidebar.classList.toggle('timeline-open', timelineVisivel);
}

// Painel de 'Como usar' (help)
const helpToggle = document.getElementById('help-toggle');
const helpPanel = document.getElementById('help-panel');
const helpClose = document.getElementById('help-close');

if (helpToggle && helpPanel) {
    helpToggle.addEventListener('click', (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        helpPanel.classList.toggle('panel-hidden');
    });
}

if (helpClose && helpPanel) {
    helpClose.addEventListener('click', (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        helpPanel.classList.add('panel-hidden');
    });
}

// Mostrar o painel de ajuda ao iniciar (script é executado após o DOM)
if (helpPanel) {
    helpPanel.classList.remove('panel-hidden');
}


// ==========================================================================
// Configuração: Ocultar/Mostrar Textos das Flechas
// ==========================================================================

// Referência ao botão no HTML (coloque junto com os outros getElementById no topo ou final do arquivo)
const edgeLabelsToggle = document.getElementById('edge-labels-toggle');

// Função global para ocultar ou mostrar os textos das flechas
function atualizarVisibilidadeTextosFlechas() {
    if (!edgeLabelsToggle || !network) return;

    const esconder = edgeLabelsToggle.checked;
    const modoEscuroAtivo = document.body.classList.contains('dark-mode');

    if (esconder) {
        // Se for para esconder, reduzimos a fonte para 0 e deixamos transparente
        network.setOptions({
            edges: {
                font: {
                    size: 0,
                    color: 'transparent',
                    background: 'transparent',
                    strokeWidth: 0
                }
            }
        });
    } else {
        // Se for para mostrar, restauramos o tamanho e as cores originais
        network.setOptions({
            edges: {
                font: {
                    size: 11, // Tamanho padrão da fonte das flechas
                    color: modoEscuroAtivo ? '#f2ece2' : '#343434',
                    background: modoEscuroAtivo ? 'rgba(33, 29, 24, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    strokeWidth: 0
                }
            }
        });
    }
}

// Adiciona o ouvinte de clique no checkbox
if (edgeLabelsToggle) {
    edgeLabelsToggle.addEventListener('change', atualizarVisibilidadeTextosFlechas);
}

// ==========================================================================
// Configuração: Ocultar/Mostrar Detalhes do Fundo (Grid)
// ==========================================================================

if (gridToggle) {
    gridToggle.addEventListener('change', (e) => {
        if (container) container.classList.toggle('sem-grid', e.target.checked);
        network.redraw(); // Atualiza o canvas instantaneamente
    });
}

// ==========================================================================
// Modo escuro (engrenagem)
// ==========================================================================

const settingsToggle = document.getElementById('settings-toggle');
const settingsPanel = document.getElementById('settings-panel');
const darkModeToggle = document.getElementById('dark-mode-toggle');

settingsToggle.addEventListener('click', () => {
    if (settingsPanel) settingsPanel.classList.toggle('panel-hidden');
});

function aplicarModoEscuro(ativo) {
    document.body.classList.toggle('dark-mode', ativo);

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

    const updates = nodesData.get().map(no => {
        if (no.tipo === 'ideia') {
            return {
                id: no.id,
                font: {
                    color: ativo ? '#f2ece2' : '#333333',
                    strokeColor: ativo ? '#1b1815' : '#ffffff'
                }
            };
        }
        return { id: no.id };
    });
    nodesData.update(updates);
}

darkModeToggle.addEventListener('change', (e) => {
    aplicarModoEscuro(e.target.checked);
    atualizarVisibilidadeTextosFlechas();
});

// Fechar painéis flutuantes ao clicar fora
document.addEventListener('click', (e) => {
    if (authorIntersectionPanel && authorIntersectionToggle) {
        if (!authorIntersectionPanel.contains(e.target) && !authorIntersectionToggle.contains(e.target)) {
            if (!modoInterseccao) authorIntersectionPanel.classList.add('panel-hidden');
        }
    }
    if (settingsPanel && settingsToggle) {
        if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
            settingsPanel.classList.add('panel-hidden');
        }
    }
}, true);

// Configuração: Ocultar/Mostrar Detalhes do Fundo
if (gridToggle) {
    gridToggle.addEventListener('change', (e) => {
        if (container) container.classList.toggle('sem-grid', e.target.checked);
        network.redraw();
    });
}

// ==========================================================================
// Inicialização do Sistema
// ==========================================================================

atualizarVisibilidadeTextosFlechas(); // pra não ficar pulando na tela na 1a vez que carrega
popularFiltroAutores();
popularFiltroIdeias();
atualizarTimeline(2025);
atualizarTextoBotaoPlay();
atualizarUIControlesTimeline();
ocultarTimeline();
ocultarSidebar();
sincronizarFiltroComTimeline();