/* =========================================================
   COMPONENTE: GRÁFICO DE VOLUNTÁRIOS POR ÁREA
   Biblioteca externa: Chart.js (https://www.chartjs.org)

   A biblioteca é carregada por CDN como módulo ES, com
   import() dinâmico: ela só é baixada quando o gráfico é
   usado pela primeira vez e não cria variáveis globais.
   ========================================================= */

/* versão fixa: uma atualização da biblioteca não quebra o site */
const URL_CHARTJS = "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/auto/+esm";

const nomesAreas = {
    educacao: "Educação",
    arrecadacao: "Arrecadação",
    eventos: "Eventos",
    comunicacao: "Comunicação",
    outros: "Outros"
};

/* guardados entre renderizações */
let Chart = null;
let grafico = null;


/* Baixa a biblioteca uma única vez */

async function carregarChartJS() {

    if (!Chart) {
        const modulo = await import(URL_CHARTJS);
        Chart = modulo.default;
    }

    return Chart;

}


/* Conta quantos voluntários há em cada área */

function contarPorArea(voluntarios) {

    const contagem = {};

    Object.keys(nomesAreas).forEach(function (area) {
        contagem[area] = 0;
    });

    voluntarios.forEach(function (voluntario) {
        const area = nomesAreas[voluntario.area] ? voluntario.area : "outros";
        contagem[area]++;
    });

    return contagem;

}


/* Lê uma cor da paleta definida no :root do CSS */

function corDoTema(variavel) {

    return getComputedStyle(document.documentElement).getPropertyValue(variavel).trim();

}


/* Cores do gráfico lidas do tema atual */

function coresDoGrafico() {

    return {
        barra: corDoTema("--cor-primaria"),
        barraHover: corDoTema("--cor-primaria-hover"),
        texto: corDoTema("--cor-texto-secundario"),
        grade: corDoTema("--cor-borda")
    };

}


function opcoesDeCor(cores) {

    return {
        x: { ticks: { color: cores.texto }, grid: { color: cores.grade } },
        y: { beginAtZero: true, ticks: { precision: 0, color: cores.texto }, grid: { color: cores.grade } }
    };

}


/* Quando o tema muda, o gráfico troca as cores sem ser recriado */

window.addEventListener("temaalterado", function () {

    if (!grafico) {
        return;
    }

    const cores = coresDoGrafico();

    grafico.data.datasets[0].backgroundColor = cores.barra;
    grafico.data.datasets[0].hoverBackgroundColor = cores.barraHover;
    grafico.options.scales = opcoesDeCor(cores);
    grafico.update();

});


/* Desenha (ou redesenha) o gráfico dentro do elemento indicado */

export async function renderizarGrafico(container, voluntarios) {

    /* o gráfico anterior precisa ser destruído antes de criar outro */
    if (grafico) {
        grafico.destroy();
        grafico = null;
    }

    if (voluntarios.length === 0) {
        container.innerHTML = "";
        return;
    }

    const contagem = contarPorArea(voluntarios);
    const areas = Object.keys(contagem);
    const resumo = areas
        .map(function (area) { return nomesAreas[area] + ": " + contagem[area]; })
        .join(", ");

    container.innerHTML = `
        <div class="grafico">
            <canvas role="img" aria-label="Voluntários por área. ${resumo}"></canvas>
        </div>
    `;

    const canvas = container.querySelector("canvas");

    try {

        const ChartJS = await carregarChartJS();

        /* o usuário pode ter trocado de página durante o download */
        if (!document.contains(canvas)) {
            return;
        }

        const cores = coresDoGrafico();

        grafico = new ChartJS(canvas, {
            type: "bar",
            data: {
                labels: areas.map(function (area) { return nomesAreas[area]; }),
                datasets: [{
                    label: "Voluntários",
                    data: areas.map(function (area) { return contagem[area]; }),
                    backgroundColor: cores.barra,
                    hoverBackgroundColor: cores.barraHover,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: opcoesDeCor(cores)
            }
        });

    } catch (erro) {

        /* sem internet ou CDN fora do ar: o resto da página continua funcionando */
        container.innerHTML = `
            <div class="alert alert-aviso" role="status">
                <span class="alert-icone" aria-hidden="true">!</span>
                <p class="alert-texto">
                    <strong>Gráfico indisponível.</strong>
                    Não foi possível carregar a biblioteca. Resumo: ${resumo}.
                </p>
            </div>
        `;

    }

}
