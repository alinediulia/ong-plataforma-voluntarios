/* =========================================================
   UTILITÁRIO: ESCAPAR HTML
   Troca caracteres especiais por entidades antes de inserir
   um dado no HTML. Assim, um texto como "<script>" aparece
   como texto na tela, em vez de ser executado como código.
   ========================================================= */

const entidades = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
};

export function escaparHTML(texto) {

    return String(texto).replace(/[&<>"']/g, function (caractere) {
        return entidades[caractere];
    });

}
