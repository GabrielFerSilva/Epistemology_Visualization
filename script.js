
const container = document.getElementById('grafo');
const todosOsNos = [];

// 1. Formatando Epistemólogos (Correção: circularImage e tipo adicionado)
epistemologos.forEach(e => {
    todosOsNos.push({
        id: e.id,
        label: e.label,
        shape: "circularImage",
        image: e.image,
        size: 40,
        borderWidth: 4,
        color: {
            border: "#444"
        },
        tipo: "epistemologo",
        ano: e.ano,
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
        size: 25,
        color: "#f4d35e",
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
        arrows: "to",
        book: c.book,
        writer: c.writer,
        setence: c.setence
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
        arrows: "to"
    });
});

const edgesData = new vis.DataSet(todasAsArestas);

const data = { nodes: nodesData, edges: edgesData };
const options = {
    nodes: {
        font: {
            size: 14,
            color: "#333"
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
            size: 12
        },
        hoverWidth: 5
    },
    interaction: { hover: true }
};

const network = new vis.Network(container, data, options);

const sidebarConteudo = document.getElementById('conteudo-sidebar');

const slider = document.getElementById("timeline-slider");

slider.addEventListener("input", (e)=>{
    atualizarTimeline(Number(e.target.value));
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
  edgesData.update(edgesData.get().map(e => ({ id: e.id, color: { color: '#999', opacity: 1 } })));
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

function atualizarArestas(){
    const updates = [];
    edgesData.forEach(edge=>{
        const origem = nodesData.get(edge.from);
        const destino = nodesData.get(edge.to);
        updates.push({
            id:edge.id,
            hidden:
                origem.hidden ||
                destino.hidden
        });
    });
    edgesData.update(updates);
}

network.on("click", function (params) {
    if (params.nodes.length > 0) {
        const noId = params.nodes[0];
        const noSelecionado = nodesData.get(noId); 
        const dadosOriginais = noSelecionado.dados;
        
        // Agora o 'tipo' existe e a renderização HTML vai acontecer perfeitamente
        if (noSelecionado.tipo === "epistemologo") {
            aplicarFiltro(noId);
            sidebarConteudo.innerHTML = `
                <h2>${dadosOriginais.nome}</h2>
                <span class="meta-info">ID do Vértice: #${noSelecionado.id}</span>
                <div style="margin: 15px 0;">
                    <img src="${dadosOriginais.image}" alt="${dadosOriginais.nome}" style="max-width:100%; border-radius:50%; max-height:180px; object-fit: cover;">
                </div>
                <p><strong>Nascimento:</strong> ${dadosOriginais.data_nascimento}</p>
                <p><strong>Morte:</strong> ${dadosOriginais.data_morte}</p>
                <p><strong>Obras principais:</strong> ${dadosOriginais.livros.join(', ')}</p>
            `;
        } else if (noSelecionado.tipo === "ideia") {
            sidebarConteudo.innerHTML = `
                <h2>Conceito Científico</h2>
                <span class="meta-info" style="background:#e8f5e9; color:#2e7d32;">ID do Vértice: #${noSelecionado.id}</span>
                <div style="margin: 15px 0; text-align:center;">
                    <img src="${dadosOriginais.image}" alt="Ícone Ideia" style="width:80px; height:80px;">
                </div>
                <blockquote style="font-style: italic; background: #f5f5f5; padding: 10px; border-left: 4px solid #4caf50; margin: 15px 0;">
                    "${dadosOriginais.setence}"
                </blockquote>
            `;
        }else{
            resetarFiltro();
        }
    } 
    else if (params.edges.length > 0) {
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
        sidebarConteudo.innerHTML = `
            <h2>Selecione algo</h2>
            <p>Clique em um nó (foto) ou em uma linha (aresta) para ver os detalhes aqui.</p>
        `;
    }
});

atualizarTimeline(2025);