/* =========================================================
   ARMAZENAMENTO LOCAL (localStorage)
   O localStorage só guarda texto. Por isso:
   - para gravar: objeto/array → JSON.stringify → texto
   - para ler:    texto → JSON.parse → objeto/array
   ========================================================= */

/* Nomes das "gavetas" usadas no localStorage */

const CHAVES = {
    voluntarios: "ong:voluntarios",
    rascunho: "ong:rascunhoCadastro"
};


/* ---------------------------------------------------------
   FUNÇÕES GENÉRICAS
   --------------------------------------------------------- */

/* Lê uma chave e converte de volta. Se não existir ou estiver
   corrompida, devolve o valor padrão em vez de quebrar a página. */

function ler(chave, valorPadrao) {

    try {
        const texto = localStorage.getItem(chave);
        return texto === null ? valorPadrao : JSON.parse(texto);
    } catch (erro) {
        return valorPadrao;
    }

}


/* Converte para texto e grava. Devolve false se não conseguir
   (navegação privada, armazenamento cheio...). */

function gravar(chave, valor) {

    try {
        localStorage.setItem(chave, JSON.stringify(valor));
        return true;
    } catch (erro) {
        return false;
    }

}


function remover(chave) {

    try {
        localStorage.removeItem(chave);
    } catch (erro) {
        /* sem acesso ao armazenamento: não há o que remover */
    }

}


/* ---------------------------------------------------------
   VOLUNTÁRIOS CADASTRADOS (array de objetos)
   --------------------------------------------------------- */

export function listarVoluntarios() {

    const lista = ler(CHAVES.voluntarios, []);

    /* garante que sempre devolve um array */
    return Array.isArray(lista) ? lista : [];

}


export function salvarVoluntario(dados) {

    const lista = listarVoluntarios();

    const voluntario = {
        ...dados,
        id: Date.now(),
        dataCadastro: new Date().toISOString()
    };

    lista.push(voluntario);

    return gravar(CHAVES.voluntarios, lista);

}


export function removerVoluntario(id) {

    const lista = listarVoluntarios().filter(function (voluntario) {
        return voluntario.id !== id;
    });

    gravar(CHAVES.voluntarios, lista);

}


/* ---------------------------------------------------------
   RASCUNHO DO FORMULÁRIO (objeto)
   --------------------------------------------------------- */

export function lerRascunho() {

    return ler(CHAVES.rascunho, null);

}


export function salvarRascunho(dados) {

    gravar(CHAVES.rascunho, dados);

}


export function limparRascunho() {

    remover(CHAVES.rascunho);

}
