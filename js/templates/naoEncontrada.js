/* =========================================================
   TEMPLATE: PÁGINA NÃO ENCONTRADA
   Usado quando o endereço não corresponde a nenhuma rota.
   ========================================================= */

export const naoEncontrada = {

    titulo: "Página não encontrada",

    html() {
        return `
            <section class="pagina">
                <div class="alert alert-aviso" role="alert">
                    <span class="alert-icone" aria-hidden="true">!</span>
                    <p class="alert-texto"><strong>Página não encontrada.</strong> O endereço acessado não existe.</p>
                </div>
                <p><a href="#/" data-link class="botao">Voltar para o início</a></p>
            </section>
        `;
    }

};
