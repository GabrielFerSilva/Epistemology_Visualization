
const container = document.getElementById('grafo');
const todosOsNos = [];

// 1. Formatando Epistemólogos (Correção: circularImage e tipo adicionado)
epistemologos.forEach(e => {
    todosOsNos.push({
        id: e.id,
        label: e.label,
        shape: 'circularImage', 
        image: e.image,
        tipo: "epistemologo",   
        dados: e 
    });
});

// 2. Formatando Ideias (Correção: circularImage e tipo adicionado)
ideias.forEach(i => {
    todosOsNos.push({
        id: i.id,
        label: i.label,
        shape: 'circularImage', 
        image: i.image,
        tipo: "ideia",          
        dados: i
    });
});

const nodesData = new vis.DataSet(todosOsNos);

todasAsArestas = []

conexoes_ideia_autor.forEach( c => {
    todasAsArestas.push({
        id: c.id,
        label: c.label,
        from: c.from,
        to: c.to,
        tipo: "autor-idea"
    });

})

conexoes_ideia_ideia.forEach( c => {
    todasAsArestas.push({
        id: c.id,
        label: c.label,
        from: c.from,
        to: c.to,
        tipo: "ideia-idea"
    });

})

const edgesData = new vis.DataSet(todasAsArestas);

const data = { nodes: nodesData, edges: edgesData };
const options = {
    nodes: { 
        size: 40, // Aumentado um pouco para destacar as fotos redondas
        borderWidth: 4, 
        color: { border: '#4caf50', background: '#fff' }, // Borda verde combinando
        font: { size: 14, color: '#333' }
    },
    edges: { 
        color: '#999',
        width: 3,        
        length: 200, 
        font: { align: 'top', size: 12 }, 
        hoverWidth: 3,
        arrows: 'to' 
    },
    interaction: { hover: true }
};
const network = new vis.Network(container, data, options);

const sidebarConteudo = document.getElementById('conteudo-sidebar');

network.on("click", function (params) {
    if (params.nodes.length > 0) {
        const noId = params.nodes[0];
        const noSelecionado = nodesData.get(noId); 
        const dadosOriginais = noSelecionado.dados;
        
        // Agora o 'tipo' existe e a renderização HTML vai acontecer perfeitamente
        if (noSelecionado.tipo === "epistemologo") {
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