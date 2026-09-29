/* =========================================================
   COMPONENTES DE FEEDBACK
   ========================================================= */


/* =========================================================
   1. TOAST
   ========================================================= */

   const btnToast = document.getElementById("btnToast");
   const toast = document.getElementById("toast");
   const fecharToast = document.getElementById("fecharToast");
   
   let tempoToast;
   
   
   const btnToastErro = document.getElementById("btnToastErro");
   const toastIcone = document.getElementById("toastIcone");
   const toastTitulo = document.getElementById("toastTitulo");
   const toastMensagem = document.getElementById("toastMensagem");
   
   
   /* Conteúdo de cada variação do toast */
   
   const tiposToast = {
       sucesso: { icone: "✓", titulo: "Sucesso!", mensagem: "Sua ação foi realizada com sucesso." },
       info: { icone: "i", titulo: "Informação", mensagem: "Há novidades nos projetos da ONG." },
       aviso: { icone: "!", titulo: "Atenção", mensagem: "Revise os dados antes de continuar." },
       erro: { icone: "×", titulo: "Erro!", mensagem: "Não foi possível concluir a ação." }
   };
   
   
   /* Abrir Toast */
   
   function mostrarToast(tipo) {
   
       const dados = tiposToast[tipo];
   
       toast.className = "toast toast-" + tipo;
       toastIcone.textContent = dados.icone;
       toastTitulo.textContent = dados.titulo;
       toastMensagem.textContent = dados.mensagem;
   
       /* força o navegador a aplicar a nova classe antes da animação */
       void toast.offsetWidth;
   
       toast.classList.add("visivel");
   
       clearTimeout(tempoToast);
   
       tempoToast = setTimeout(function () {
   
           toast.classList.remove("visivel");
   
       }, 4000);
   
   }
   
   btnToast.addEventListener("click", function () {
   
       mostrarToast("sucesso");
   
   });
   
   btnToastErro.addEventListener("click", function () {
   
       mostrarToast("erro");
   
   });
   
   
   /* Fechar Toast manualmente */
   
   fecharToast.addEventListener("click", function () {
   
       toast.classList.remove("visivel");
   
       clearTimeout(tempoToast);
   
   });
   
   
   /* =========================================================
      2. MODAL
      ========================================================= */
   
   const btnModal = document.getElementById("btnModal");
   const modal = document.getElementById("modal");
   const fecharModal = document.getElementById("fecharModal");
   const confirmarModal = document.getElementById("confirmarModal");
   
   
   /* Abrir Modal */
   
   btnModal.addEventListener("click", function () {
   
       modal.classList.add("aberto");
   
       modal.setAttribute("aria-hidden", "false");
   
       /* leva o foco para dentro do modal (acessibilidade) */
       confirmarModal.focus();
   
   });
   
   
   /* Fechar pelo X */
   
   fecharModal.addEventListener("click", function () {
   
       fecharModalFuncao();
   
   });
   
   
   /* Fechar pelo botão "Entendi" */
   
   confirmarModal.addEventListener("click", function () {
   
       fecharModalFuncao();
   
   });
   
   
   /* Fechar clicando fora do conteúdo */
   
   modal.addEventListener("click", function (evento) {
   
       if (evento.target === modal) {
   
           fecharModalFuncao();
   
       }
   
   });
   
   
   /* Função para fechar o Modal */
   
   function fecharModalFuncao() {
   
       modal.classList.remove("aberto");
   
       modal.setAttribute("aria-hidden", "true");
   
       /* devolve o foco para o botão que abriu o modal */
       if (modal.contains(document.activeElement)) {
           btnModal.focus();
       }
   
   }
   
   
   /* =========================================================
      3. FECHAR COM A TECLA ESC
      ========================================================= */
   
   document.addEventListener("keydown", function (evento) {
   
       if (evento.key === "Escape") {
   
           fecharModalFuncao();
   
           toast.classList.remove("visivel");
   
       }
   
   });