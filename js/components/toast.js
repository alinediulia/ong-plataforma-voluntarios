/* =========================================================
   COMPONENTE: TOAST
   O HTML do toast fica fixo no index.html; este módulo
   só troca o conteúdo e as classes.
   ========================================================= */

const toast = document.getElementById("toast");
const toastIcone = document.getElementById("toastIcone");
const toastTitulo = document.getElementById("toastTitulo");
const toastMensagem = document.getElementById("toastMensagem");
const fecharToast = document.getElementById("fecharToast");

let tempoToast;


/* Conteúdo padrão de cada variação do toast */

const tiposToast = {
    sucesso: { icone: "✓", titulo: "Sucesso!", mensagem: "Sua ação foi realizada com sucesso." },
    info: { icone: "i", titulo: "Informação", mensagem: "Há novidades nos projetos da ONG." },
    aviso: { icone: "!", titulo: "Atenção", mensagem: "Revise os dados antes de continuar." },
    erro: { icone: "×", titulo: "Erro!", mensagem: "Não foi possível concluir a ação." }
};


/* Mostra o toast. A mensagem é opcional. */

export function mostrarToast(tipo, mensagem) {

    const dados = tiposToast[tipo];

    toast.className = "toast toast-" + tipo;
    toastIcone.textContent = dados.icone;
    toastTitulo.textContent = dados.titulo;
    toastMensagem.textContent = mensagem || dados.mensagem;

    /* força o navegador a aplicar a nova classe antes da animação */
    void toast.offsetWidth;

    toast.classList.add("visivel");

    clearTimeout(tempoToast);

    tempoToast = setTimeout(esconderToast, 4000);

}


export function esconderToast() {

    toast.classList.remove("visivel");

    clearTimeout(tempoToast);

}


export function iniciarToast() {

    fecharToast.addEventListener("click", esconderToast);

    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape") {
            esconderToast();
        }

    });

}
