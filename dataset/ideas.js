const ideias = [{
    id: "I000000001",
    label: "Ciência Normal", 
    ano: 1962,
    categoria: "Categorização",
    color: "#f4d35e",
    size: 25,
    image: "assets/ideas/lampada.png",
    sentence: "Pesquisa científica baseada em conquistas passadas reconhecidas por uma comunidade como fundamento de sua prática, cujo objetivo é resolver quebra-cabeças dentro de um quadro teórico já aceito, não testar esse quadro."
}, {
    id: "I000000002",
    label: "Incomensurabilidade", 
    ano: 1962,
    categoria: "Incomensurabilidade",
    color: "#f4d35e",
    size: 25,
    image: "assets/ideas/lampada.png",
    sentence: "É a condição em que duas teorias científicas não compartilham uma linguagem ou um padrão de avaliação neutro que permita julgar objetivamente qual delas é superior.",
},{
    id: "I000000003",
    label: "Incomensurabilidade Tout-Court", 
    ano: 1962,
    categoria: "Incomensurabilidade",
    color: "#f4d35e",
    size: 25,
    image: "assets/ideas/lampada.png",
    sentence: "É a incompatibilidade absoluta e sem concessões entre dois sistemas de pensamento.",
},{
    id: "I000000004",
    label: "Incomensurabilidade Parcial", 
    ano: 1962,
    categoria: "Incomensurabilidade",
    color: "#f4d35e",
    size: 25,
    image: "assets/ideas/lampada.png",
    sentence: "É a situação em que a transição entre duas visões de mundo gera descompassos de significado localizados, restritos a um grupo específico de conceitos centrais.",
},{
    id: "I000000005",
    label: "Paradigma", 
    ano: 1962,
    categoria: "Categorização",
    color: "#f4d35e",
    size: 25,
    image: "assets/ideas/lampada.png",
    sentence: "Conjunto de exemplares, técnicas, valores e generalizações compartilhadas por uma comunidade de pesquisa, que determina quais problemas são legítimos e quais soluções são aceitáveis."
},{
    id: "I000000006",
    label: "Anomalia", 
    ano: 1962,
    categoria: "Categorização",
    color: "#f4d35e",
    size: 25,
    image: "assets/ideas/lampada.png",
    sentence: "Observação ou resultado que resiste à assimilação pelas categorias de um quadro teórico vigente, sem que isso implique seu abandono imediato."
},{
    id: "I000000007",
    label: "Crise", 
    ano: 1962,
    categoria: "Categorização",
    color: "#f4d35e",
    size: 25,
    image: "assets/ideas/lampada.png",
    sentence: "Período de insegurança em uma comunidade científica, gerado pelo acúmulo de anomalias não resolvidas, no qual as regras vigentes se tornam confusas e concorrentes."
},{
    id: "I000000008",
    label: "Revolução Científica", 
    ano: 1962,
    categoria: "Categorização",
    color: "#f4d35e",
    size: 25,
    image: "assets/ideas/lampada.png",
    sentence: "Substituição não cumulativa de um paradigma por outro incompatível, episódio análogo a uma mudança de gestalt, não redutível à lógica de confirmação/refutação."
},{
    id: "I000000009",
    label: "Tensão Essencial", 
    ano: 1962,
    categoria: "Argumentação",
    color: "#f4d35e",
    size: 25,
    image: "assets/ideas/lampada.png",
    sentence: "A criatividade científica depende de um equilíbrio entre rigidez tradicional (apego a um quadro teórico) e flexibilidade para rompê-lo; convergência e divergência são igualmente necessárias ao progresso do conhecimento."
},{
    id: "I000000010",
    label: "Insuficiência da Refutação Isolada", 
    ano: 1962,
    categoria: "Argumentação",
    color: "#f4d35e",
    size: 25,
    image: "assets/ideas/lampada.png",
    sentence: "Uma anomalia ou resultado negativo isolado não é, por si só, suficiente para justificar o abandono de uma teoria ou quadro teórico; testes negativos costumam ser tolerados ou atribuídos a erro experimental."
}, {
    id: "I000000011",
    label: "Existência da Ciência Normal", 
    ano: 1962,
    categoria: "Argumentação",
    color: "#f4d35e",
    size: 25,
    image: "assets/ideas/lampada.png",
    sentence: "Argumento que sustenta ou defende a existência ou a relevância da ciência normal para o progresso científico."
}, {
    id: "I000000012",
    label: "Pesquisa Normal", 
    ano: 1962,
    categoria: "Categorização",
    color: "#f4d35e",
    size: 25,
    image: "assets/ideas/lampada.png",
    sentence: "A pesquisa normal é o trabalho rotineiro e de aperfeiçoamento levado a cabo pelos cientistas. Eles não tentam testar ou deitar abaixo as teorias basilares da sua área, mas sim aplicá-las rigorosamente para resolver pequenos enigmas específicos definidos pelo paradigma em vigor."
}];

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