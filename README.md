# Epistemology Visualization

Visualização interativa das relações entre epistemólogos e ideias desenvolvida como projeto final da disciplina **HU31 – Epistemologia da Ciência** do **IMPA Tech**, ministrada pelo professor Rafael Beraldo.

A aplicação permite explorar como diferentes autores se relacionam com conceitos centrais da epistemologia, mostrando concordâncias, críticas e conexões entre ideias ao longo do tempo por meio de um grafo interativo.

## Demonstração

Acesse a versão hospedada no GitHub Pages:

**https://gabrielfersilva.github.io/Epistemology_Visualization/**

## Integrantes

* Arthur Farias Zaneti
* Bruno Pereira de Paula
* Gabriel Ferreira Silva
* Igor Augusto Zwirtes
* Pedro Pereira Carvalho

## Objetivo

O projeto busca facilitar a exploração da evolução histórica da epistemologia por meio de uma visualização em grafo.

Diferentemente de representações centradas apenas nos filósofos, o foco da visualização está nas **ideias**. Autores e conceitos são representados como vértices do grafo, enquanto as relações entre eles indicam apoio, crítica, autoria ou outras conexões relevantes.

Essa abordagem permite analisar tanto a trajetória de um autor quanto o desenvolvimento histórico de uma determinada ideia.

## Funcionalidades

* Visualização interativa em grafo utilizando Vis.js.
* Filtro por autor.
* Filtro por ideia.
* Linha do tempo para visualizar a evolução histórica dos conceitos.
* Modo de intervalo temporal para comparar períodos específicos.
* Reprodução automática da linha do tempo.
* Destaque das ideias compartilhadas entre múltiplos autores (interseção).
* Painel lateral com informações sobre autores, ideias e relações.
* Exibição de citações e referências bibliográficas associadas às conexões.
* Modo escuro.
* Opções de personalização da visualização (ocultar rótulos das arestas e detalhes do fundo).

## Como interpretar o grafo

* **Autores** são representados por nós com fotografia.
* **Ideias** são representadas por nós coloridos.
* As **arestas direcionadas** indicam relações entre autores e ideias ou entre ideias.
* A **cor das ideias** varia conforme o balanço entre concordâncias e críticas recebidas.
* O **tamanho das ideias** aumenta conforme sua relevância na rede, medida pelo número de conexões visíveis.
* A barra temporal permite observar como autores e ideias surgem ao longo da história.

## Estrutura do projeto

```text
.
├── assets/                 # Ícones e imagens
├── dataset/                # Dados dos autores, ideias e conexões
├── index.html              # Estrutura da aplicação
├── style.css               # Estilos da interface
├── script.js               # Lógica da visualização
└── README.md
```

Os dados são armazenados em arquivos JavaScript estruturados como coleções de objetos, contendo informações sobre autores, ideias e relações entre eles.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript (ES6)
* Vis.js (vis-network)
* GitHub Pages

## Execução

Para acessar o projeto localmente, basta clonar o repositório e abrir o arquivo `index.html` em um navegador moderno.

Também é possível utilizar qualquer servidor HTTP local, por exemplo:

```bash
python -m http.server
```

e acessar:

```text
http://localhost:8000
```

## Referências

A visualização foi inspirada em:

* Deniz Cem Önduygu — *History of Philosophy*
  https://www.denizcemonduygu.com/philo/

* BACON, Francis. Novum Organum ou Verdadeiras Indicações Acerca da Interpretação da Natureza. Tradução de José Aluysio Reis de Andrade. São Paulo: Nova Cultural, 1999.

* CHALMERS, Alan. O que é ciência afinal?, Tradução: Raul Filker. Editora Brasiliense, 1993

* DUHEM, Pierre. O Objetivo e a Estrutura da Teoria Física. Tradução de Afonso Neves. Rio de Janeiro: Contraponto, 2011.

* FEYERABEND, Paul. Contra o método. Tradução de Octanny S. da Mota e Leonidas Hegenberg. Rio de Janeiro, F. Alves, 1977.

* KUHN, Thomas S. A Estrutura das Revoluções Científicas. Tradução de Beatriz Vianna Boeira e Nelson Boeira. São Paulo: Editora Perspectiva, [1962].

* LAKATOS, Imre; MUSGRAVE, Alan (Org.). A Crítica e o Desenvolvimento do Conhecimento. Tradução de Octavio Mendes Cajado. São Paulo: Cultrix; Ed. da Universidade de São Paulo, 1979.

* POPPER, Karl R. A Lógica da Pesquisa Científica. Tradução de Leônidas Hegenberg e Octanny Silveira da Mota. São Paulo: Cultrix, 2001.

* QUINE, Willard Van Orman. Dois Dogmas do Empirismo. In: De um Ponto de Vista Lógico. Tradução de Giselda Shaw. São Paulo: UNESP, 2011.

## Licença

Este projeto está licenciado sob a licença **MIT**.