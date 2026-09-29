/* =========================================================
   UTILITÁRIO: MÁSCARAS DE CAMPO
   Formatam o valor enquanto o usuário digita.
   Todas seguem os mesmos passos:
   1. remover tudo que não for número
   2. limitar a quantidade de dígitos
   3. inserir pontos, traços e parênteses
   ========================================================= */

function somenteNumeros(valor) {
    return valor.replace(/\D/g, "");
}


/* 12345678900 → 123.456.789-00 */

export function mascaraCPF(valor) {

    return somenteNumeros(valor)
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

}


/* 34999999999 → (34) 99999-9999 | 3433334444 → (34) 3333-4444 */

export function mascaraTelefone(valor) {

    const numeros = somenteNumeros(valor).slice(0, 11);

    if (numeros.length <= 2) {
        return numeros.replace(/^(\d{1,2})/, "($1");
    }

    /* celular tem 9 dígitos depois do DDD; fixo tem 8 */
    const tamanhoInicio = numeros.length === 11 ? 5 : 4;

    return numeros
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(new RegExp("(\\d{" + tamanhoInicio + "})(\\d{1,4})$"), "$1-$2");

}


/* 38400000 → 38400-000 */

export function mascaraCEP(valor) {

    return somenteNumeros(valor)
        .slice(0, 8)
        .replace(/(\d{5})(\d{1,3})$/, "$1-$2");

}
