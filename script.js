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