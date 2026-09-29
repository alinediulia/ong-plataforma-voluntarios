/* =========================================================
   DADOS: PROJETOS DA ONG
   Fonte de dados dos cartões. Para incluir um projeto novo,
   basta adicionar um objeto nesta lista — sem mexer no HTML.
   ========================================================= */

export const listaProjetos = [
    {
        titulo: "Projeto Educação",
        status: "ativo",
        categoria: "Educação",
        descricao: "Desenvolvemos ações educacionais para crianças, jovens e adultos, promovendo o acesso ao conhecimento e novas oportunidades.",
        imagem: "../img/projeto-educacao.jpg",
        textoAlternativo: "Voluntários realizando atividades educativas"
    },
    {
        titulo: "Projeto Solidariedade",
        status: "urgente",
        categoria: "Arrecadação",
        descricao: "Realizamos campanhas de arrecadação de alimentos, roupas e outros itens para auxiliar famílias em situação de vulnerabilidade.",
        imagem: "../img/projeto-solidariedade.jpeg",
        textoAlternativo: "Doações organizadas para distribuição às famílias"
    },
    {
        titulo: "Projeto Voluntariado",
        status: "andamento",
        categoria: "Eventos",
        descricao: "Incentivamos a participação de voluntários em nossas ações, possibilitando que cada pessoa contribua com seu tempo e suas habilidades.",
        imagem: "../img/projeto-voluntariado.jpg",
        textoAlternativo: "Grupo de voluntários participando de uma ação social"
    }
];
