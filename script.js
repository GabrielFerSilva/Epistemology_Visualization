/*
const ideas = [{
    id: "I000000001",
    setence: "Não pode haver um conjunto de regras adequadas de escolha que se possam impor ao desejado comportamento individual nos casos concretos que os cientistas encontrarão no decorrer de suas carreiras",
    book: "Criticism and the Growth of Knowledge",
    writer: "Thomas Kuhn"
},{
    id: "I000000002",
    setence: "O conhecimento não pode ser gerado de modo puramente intelectual, ele deve ser baseado na observação, experimento e indução",
    book: "Novum Organum",
    writer: "Francis Bacon"},
{
    id: "I000000003",
    setence: "Métodos dedutivos so conseguem revelar conclusões que estavam escondidas nas premissas, não podem gerar conhecimentos novos por si próprios.",
    book: "Novum Organum",
    writer: "Francis Bacon"},
{
    id: "I000000004",
    setence: "Indução: Podemos inferir leis gerais da natureza a partir da observação controlada, repetida e sistemática de fenômenos particulares",
    book: "Novum Organum",
    writer: "Francis Bacon"},
{
     id: "I000000005",
    setence: "Os \"Ídolos\" de Bacon são tendências naturais do pensamento humano que distorcem nossa compreensão da realidade e dificultam a investigação científica objetiva.",
    book: "Novum Organum",
    writer: "Francis Bacon"
},
{
    id: "I000000006",
    setence: "Ídolos da Tribo: Erros da natureza humana, enxergar padrões e confirmações onde elas não existem por exemplo.",
    book: "Novum Organum",
    writer: "Francis Bacon"
},
{
    id: "I000000007",
    setence: "Ídolos da Caverna: Erros causados pelos vieses pessoais do observador, da sua \"caverna\" mental",
    book: "Novum Organum",
    writer: "Francis Bacon"
},
{
    id: "I000000008",
    setence: "Ídolos do Mercado: Erros gerados pela linguagem imprecisa e pelo uso confuso das palavras.",
    book: "Novum Organum",
    writer: "Francis Bacon"
},
{
    id: "I000000009",
    setence: "Ídolos do Teatro: Aceitação de sistemas intelectuais sem verificação. Confundir o teatro pela realidade. ",
    book: "Novum Organum",
    writer: "Francis Bacon"
},
{
    id: "I0000000010",
    setence: "Popper respeitava muito a Teoria da Relatividade de Einstein pois ela faz previsões arriscadas que podem ser falseadas",
    book: "The Logic of Scientific Discovery",
    writer: "Karl Popper"
},
{
    id: "I0000000011",
    setence: "A ciência avança por conjecturas ousadas e refutações, não pela verificação.",
    book: "The Logic of Scientific Discovery",
    writer: "Karl Popper"
},
{
    id: "I0000000012",
    setence: "Uma teoria é científica se, e somente se, é falseável.",
    book: "The Logic of Scientific Discovery",
    writer: "Karl Popper"
},
{
    id: "I0000000013",
    setence: "Nenhuma teoria científica é provada definitivamente verdadeira. Se a teoria sobreviveu a repetidos e variados testes de falsificação ela ganha reputação, mas nunca pode ser provada definitivamente verdadeira.",
    book: "The Logic of Scientific Discovery",
    writer: "Karl Popper"
},
{
    id: "I0000000014",
    setence: "Observação e experimentos são importantes como métodos pelos quais se tenta falsear uma teoria",
    book: "The Logic of Scientific Discovery",
    writer: "Karl Popper"
},
,
{
    id: "I0000000015",
    setence: "Problema de Duhem-Quine: Verificar falseabilidade de um teoria de modo não ambíguo é impossível. Uma teoria nunca é testada isoladamente. Podemos sempre atribuir a falha de predição da teoria a um erro do experimento em si ou das hipóteses",
    book: "The Aim and Structure of Physical Theory / Two Dogmas of Empiricism",
    writer: "Pierre Duhem e Willard Van Orman Quine"
}];
*/


const epistemologos = [{
    id: "E000001",
    nome: "Francis Bacon",
    data_nascimento : "1561-01-22",
    data_morte: "1626-04-09",
    livros: ["Novum Organum"],
    image: "assets/francisBacon.jpg",
    label: "Francis Bacon" // Alterado para o nome real para fazer sentido na aresta
},{
    id: "E000002",
    nome: "Karl Popper",
    data_nascimento: "1902-07-28",
    data_morte: "1994-09-17",
    livros: ["The Logic of Scientific Discovery"],
    image: "assets/karlPopper.jpg",
    label: "Karl Popper"
},{
    id: "E000003",
    nome: "Thomas Kuhn",
    data_nascimento: "1922-07-18",
    data_morte: "1996-06-17",
    livros: ["The Structure of Scientific Revolutions"],
    image: "assets/thomasKuhn.jpg",
    label: "Thomas Kuhn"
}, {
    id: "E000004",
    nome: "Paul Feyerabend",
    data_nascimento: "1924-01-13",
    data_morte: "1994-02-11",
    livros: ["Against Method"],
    image: "assets/paulFeyerabend.jpg",
    label: "Paul Feyerabend"
}];

const ideias = [{
    id: "I000000001",
    label: "Ideia 1", 
    setence: "Não pode haver um conjunto de regras adequadas de escolha que se possam impor ao desejado comportamento individual nos casos concretos que os cientistas encontrarão no decorrer de suas careers",
    image: "assets/lampada.png"
}, {
    id: "I000000002",
    label: "Ideia 2", 
    setence: "Incomensurabilidade",
    image: "assets/lampada.png"
},{
    id: "I000000003",
    label: "Ideia 3", 
    setence: "Incomensurabilidade Total",
    image: "assets/lampada.png"
},{
    id: "I000000004",
    label: "Ideia 4", 
    setence: "Incomensurabilidade Parcial",
    image: "assets/lampada.png"
}];

const conexoes_ideia_autor = [{
    id: "CC00000001", 
    from: "E000003", 
    to: "I000000001", 
    label: "Concorda", 
    setence: "Não pode haver um conjunto de regras adequadas...",
    book: "Criticism and the Growth of Knowledge",
    writer: "Thomas Kuhn"
},{
    id: "CIA00000002", 
    from: "E000003", 
    to: "I000000004", 
    label: "Concorda", 
    setence: "Sem sentença",
    book: "...",
    writer: "Sem autor"
},{
    id: "CIA00000003", 
    from: "E000002", 
    to: "I000000002", 
    label: "Discorda", 
    setence: "Sem sentença",
    book: "...",
    writer: "Sem autor"
}, {
    id: "CIA00000004", 
    from: "E000004", 
    to: "I000000003", 
    label: "Concorda", 
    setence: "Sem sentença",
    book: "...",
    writer: "Sem autor"
}];

const conexoes_ideia_ideia = [{
    id: "CII00000001",
    from: "I000000002", 
    to: "I000000003",
    label: "Contém"
}, {
    id: "CII00000001",
    from: "I000000002", 
    to: "I000000003",
    label: "Contém"
}];


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
        shape: 'circularImage', // CORREÇÃO 1: Permite que a imagem da lâmpada apareça
        image: i.image,
        tipo: "ideia",          // CORREÇÃO 2: Agora o 'tipo' existe para o clique funcionar
        dados: i
    });
});

const nodesData = new vis.DataSet(todosOsNos);
const edgesData = new vis.DataSet(conexoes_ideia_autor);

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