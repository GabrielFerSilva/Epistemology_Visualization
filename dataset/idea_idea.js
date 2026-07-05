const conexoes_ideia_ideia = [
    // Relações de Contenção (Hierarquia / Subdivisão)
    { id: "CII00000001", from: "I000000002", to: "I000000003", label: "Contém" }, // Incomensurabilidade -> Tout-Court
    { id: "CII00000002", from: "I000000002", to: "I000000004", label: "Contém" }, // Incomensurabilidade -> Parcial
    { id: "CII00000004", from: "I000000017", to: "I000000018", label: "Contém" }, // Teoria dos Ídolos -> Tribo
    { id: "CII00000005", from: "I000000017", to: "I000000019", label: "Contém" }, // Teoria dos Ídolos -> Caverna
    { id: "CII00000006", from: "I000000017", to: "I000000020", label: "Contém" }, // Teoria dos Ídolos -> Mercado
    { id: "CII00000007", from: "I000000017", to: "I000000021", label: "Contém" }, // Teoria dos Ídolos -> Teatro
    { id: "CII00000008", from: "I000000023", to: "I000000024", label: "Contém" }, // Conjecturas e Refutações -> Falseabilidade

    // Relações de Subordinação (Dependência / Derivação Causais)
    { id: "CII00000003", from: "I000000001", to: "I000000012", label: "Subordinada" }, // Ciência Normal -> Pesquisa Normal
    { id: "CII00000011", from: "I000000006", to: "I000000007", label: "Subordinada" }, // Anomalia -> Crise
    { id: "CII00000012", from: "I000000007", to: "I000000008", label: "Subordinada" }, // Crise -> Revolução Científica
    { id: "CII00000013", from: "I000000006", to: "I000000010", label: "Subordinada" }, // Anomalia -> Insuficiência da Refutação Isolada

    // Relações Complementares (Suporte ou Equivalência Temática)
    { id: "CII00000009", from: "I000000001", to: "I000000011", label: "Complementar" }, // Ciência Normal <-> Existência da Ciência Normal
    { id: "CII00000010", from: "I000000005", to: "I000000001", label: "Complementar" }, // Paradigma <-> Ciência Normal
    { id: "CII00000014", from: "I000000014", to: "I000000016", label: "Complementar" }, // Base Empírica <-> Método Indutivo
    { id: "CII00000015", from: "I000000022", to: "I000000024", label: "Complementar" }, // Previsões Arriscadas <-> Falseabilidade
    { id: "CII00000016", from: "I000000024", to: "I000000026", label: "Complementar" }, // Falseabilidade <-> Papel dos Testes
    { id: "CII00000017", from: "I000000024", to: "I000000025", label: "Complementar" }, // Falseabilidade <-> Incompletude da Prova
    { id: "CII00000018", from: "I000000028", to: "I000000029", label: "Complementar" }, // Tudo Vale <-> Proliferação de Teorias
    { id: "CII00000019", from: "I000000010", to: "I000000027", label: "Complementar" }, // Insuficiência da Refutação Isolada (Kuhn) <-> Tese Duhem-Quine

    // Relações de Oposição (Conflitos Epistemológicos)
    { id: "CII00000020", from: "I000000015", to: "I000000016", label: "Oposição" }, // Limitação da Dedução vs Método Indutivo
    { id: "CII00000021", from: "I000000016", to: "I000000024", label: "Oposição" }, // Método Indutivo (Bacon) vs Falseabilidade (Popper)
    { id: "CII00000022", from: "I000000024", to: "I000000027", label: "Oposição" }, // Falseabilidade (Popper) vs Tese Duhem-Quine
    { id: "CII00000023", from: "I000000028", to: "I000000001", label: "Oposição" }, // Tudo Vale (Feyerabend) vs Ciência Normal dogmática (Kuhn)
    { id: "CII00000024", from: "I000000028", to: "I000000030", label: "Oposição" }, // Tudo Vale (Feyerabend) vs Perigo do Relativismo (Chalmers)
    { id: "CII00000025", from: "I000000005", to: "I000000029", label: "Oposição" }, // Paradigma único (Kuhn) vs Proliferação de Teorias (Feyerabend)
    { id: "CII00000026", from: "I000000025", to: "I000000014", label: "Oposição" }  // Incompletude da Prova (Popper) vs Base Empírica firme (Bacon)
];