const epistemologos = [{
    id: "000001",
    nome: "Francis Bacon",
    data_nascimento : "1561-01-22",
    data_morte: "1626-04-09",
    livros: ["Novum Organum"],
    image: "assets/francisBacon.jpg"
},{
    id: "000002",
    nome: "Karl Popper",
    data_nascimento: "1902-07-28",
    data_morte: "1994-09-17",
    livros: ["The Logic of Scientific Discovery"],
    image: "assets/karlPopper.jpg"
},{
    id: "000003",
    nome: "Thomas Kuhn",
    data_nascimento: "1922-07-18",
    data_morte: "1996-06-17",
    livros: ["The Structure of Scientific Revolutions"],
    image: "assets/thomasKuhn.jpg"
}];

const ideas = [{
    id: "000000001",
    setence: "Não pode haver um conjunto de regras adequadas de escolha que se possam impor ao desejado comportamento individual nos casos concretos que os cientistas encontrarão no decorrer de suas carreiras",
    book: "Criticism and the Growth of Knowledge",
    writer: "Thomas Kuhn"
},{
    id: "000000002",
    setence: "O conhecimento não pode ser gerado de modo puramente intelectual, ele deve ser baseado na observação, experimento e indução",
    book: "Novum Organum",
    writer: "Francis Bacon"},
{
    id: "000000003",
    setence: "Métodos dedutivos so conseguem revelar conclusões que estavam escondidas nas premissas, não podem gerar conhecimentos novos por si próprios.",
    book: "Novum Organum",
    writer: "Francis Bacon"},
{
    id: "000000004",
    setence: "Indução: Podemos inferir leis gerais da natureza a partir da observação controlada, repetida e sistemática de fenômenos particulares",
    book: "Novum Organum",
    writer: "Francis Bacon"},
{
     id: "000000005",
    setence: "Os \"Ídolos\" de Bacon são tendências naturais do pensamento humano que distorcem nossa compreensão da realidade e dificultam a investigação científica objetiva.",
    book: "Novum Organum",
    writer: "Francis Bacon"
},
{
    id: "000000006",
    setence: "Ídolos da Tribo: Erros da natureza humana, enxergar padrões e confirmações onde elas não existem por exemplo.",
    book: "Novum Organum",
    writer: "Francis Bacon"
},
{
    id: "000000007",
    setence: "Ídolos da Caverna: Erros causados pelos vieses pessoais do observador, da sua \"caverna\" mental",
    book: "Novum Organum",
    writer: "Francis Bacon"
},
{
    id: "000000008",
    setence: "Ídolos do Mercado: Erros gerados pela linguagem imprecisa e pelo uso confuso das palavras.",
    book: "Novum Organum",
    writer: "Francis Bacon"
},
{
    id: "000000009",
    setence: "Ídolos do Teatro: Aceitação de sistemas intelectuais sem verificação. Confundir o teatro pela realidade. ",
    book: "Novum Organum",
    writer: "Francis Bacon"
},
{
    id: "0000000010",
    setence: "Popper respeitava muito a Teoria da Relatividade de Einstein pois ela faz previsões arriscadas que podem ser falseadas",
    book: "The Logic of Scientific Discovery",
    writer: "Karl Popper"
},
{
    id: "0000000011",
    setence: "A ciência avança por conjecturas ousadas e refutações, não pela verificação.",
    book: "The Logic of Scientific Discovery",
    writer: "Karl Popper"
},
{
    id: "0000000012",
    setence: "Uma teoria é científica se, e somente se, é falseável.",
    book: "The Logic of Scientific Discovery",
    writer: "Karl Popper"
},
{
    id: "0000000013",
    setence: "Nenhuma teoria científica é provada definitivamente verdadeira. Se a teoria sobreviveu a repetidos e variados testes de falsificação ela ganha reputação, mas nunca pode ser provada definitivamente verdadeira.",
    book: "The Logic of Scientific Discovery",
    writer: "Karl Popper"
},
{
    id: "0000000014",
    setence: "Observação e experimentos são importantes como métodos pelos quais se tenta falsear uma teoria",
    book: "The Logic of Scientific Discovery",
    writer: "Karl Popper"
},
,
{
    id: "0000000015",
    setence: "Problema de Duhem-Quine: Verificar falseabilidade de um teoria de modo não ambíguo é impossível. Uma teoria nunca é testada isoladamente. Podemos sempre atribuir a falha de predição da teoria a um erro do experimento em si ou das hipóteses",
    book: "The Aim and Structure of Physical Theory / Two Dogmas of Empiricism",
    writer: "Pierre Duhem e Willard Van Orman Quine"
}];

function renderizarCirculos() {
    const container = document.getElementById("container-circulos");

    epistemologos.forEach(filosofo => {
        // 1. Cria a div do círculo principal
        const divCirculo = document.createElement("div");
        divCirculo.classList.add("circulo-filosofo");
        
        // Coloca a foto do filósofo como plano de fundo do círculo
        divCirculo.style.backgroundImage = `url('${filosofo.image}')`;

        // 2. Cria a camada interna do texto (nome)
        const divTexto = document.createElement("div");
        divTexto.classList.add("texto-filosofo");
        divTexto.innerText = filosofo.nome;

        // 3. Coloca o texto dentro do círculo, e o círculo no container da página
        divCirculo.appendChild(divTexto);
        container.appendChild(divCirculo);
    });
}

// Executa a função assim que a página estiver carregada
window.onload = renderizarCirculos;