# Plataforma ONG — Voluntariado e Projetos

Aplicação web do tipo **Single Page Application (SPA)** para uma organização não governamental divulgar seus projetos, receber cadastros de voluntários e acompanhar o interesse por área de atuação.

Foi desenvolvida com **HTML5, CSS3 e JavaScript puro (ES6 Modules)**, sem frameworks, como projeto prático de desenvolvimento front-end.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Execução em desenvolvimento](#execução-em-desenvolvimento)
- [Build de produção](#build-de-produção)
- [Testes](#testes)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Arquitetura](#arquitetura)
- [Dados salvos no navegador](#dados-salvos-no-navegador)
- [Acessibilidade](#acessibilidade)
- [Temas de cor](#temas-de-cor)
- [Fluxo de trabalho](#fluxo-de-trabalho)
- [Autoria](#autoria)

## Funcionalidades

- **Navegação SPA** por hash (`#/projetos`), sem recarregar a página, com suporte aos botões Voltar e Avançar
- **Templates em JavaScript** alimentados por dados: os cartões de projetos são gerados a partir de uma lista
- **Formulário de cadastro** com validação em tempo real, máscaras (CPF, telefone e CEP) e regras de consistência (dígitos verificadores do CPF, idade mínima e formato de e-mail)
- **Persistência no `localStorage`**: lista de voluntários e rascunho automático do formulário
- **Gráfico de voluntários por área**, feito com Chart.js e carregado só quando necessário
- **Componentes de feedback**: badges, alertas, toast e modal
- **Layout responsivo**, com menu recolhível no celular
- **Temas claro, escuro e alto contraste**, com opção de seguir o sistema

## Tecnologias

| Tecnologia | Uso no projeto |
|---|---|
| HTML5 | Estrutura semântica da página única e atributos ARIA |
| CSS3 | Variáveis de design, Flexbox, Grid, media queries e animações com `transition` |
| JavaScript ES6+ | Módulos (`import`/`export`), template literals, eventos, `localStorage` |
| [Chart.js 4.4.1](https://www.chartjs.org/) | Gráfico de barras, carregado via CDN [jsDelivr](https://www.jsdelivr.com/) com `import()` dinâmico |
| [esbuild](https://esbuild.github.io/) | Build de produção: une e minifica o JavaScript e o CSS |
| [html-minifier-terser](https://github.com/terser/html-minifier-terser) | Build de produção: minifica o HTML |
| Node.js (`node --test`) | Execução dos testes automatizados, sem bibliotecas extras |
| Git e GitHub | Versionamento com GitFlow e Conventional Commits |

## Pré-requisitos

- Um **navegador moderno** (Chrome, Edge, Firefox ou Safari atualizados)
- **[Node.js](https://nodejs.org/) 18 ou superior**, necessário apenas para a build e os testes
- **Python 3** ou a extensão **Live Server** do VS Code, para rodar um servidor local

> Os módulos JavaScript (`type="module"`) **não funcionam abrindo o arquivo com duplo clique** (`file://`). O navegador bloqueia o carregamento, e por isso é preciso um servidor local.

## Instalação

```bash
git clone <url-do-repositorio>
cd <pasta-do-projeto>
npm install
```

O `npm install` instala apenas as ferramentas da build (**esbuild** e **html-minifier-terser**). A aplicação em si não tem dependências para instalar.

## Execução em desenvolvimento

```bash
npm start
```

Depois, acesse **http://localhost:8000/html/index.html**.

Pelo VS Code, uma alternativa é clicar com o botão direito em `html/index.html` e escolher **Open with Live Server**.

## Build de produção

```bash
npm run build     # gera a pasta dist/
npm run preview   # serve a pasta dist/ em http://localhost:8000/html/index.html
```

A build:

1. apaga a pasta `dist/` anterior;
2. une todos os módulos JavaScript a partir de `js/main.js` em um único arquivo minificado (esbuild);
3. minifica os arquivos CSS (esbuild);
4. minifica o HTML, inclusive o script do `<head>` (html-minifier-terser);
5. copia as imagens;
6. mostra um relatório de redução de tamanho.

Resultado atual:

| Tipo | Código-fonte | Produção | Redução |
|---|---|---|---|
| JavaScript | 50,9 KB | 26,4 KB | −48% |
| CSS | 27,9 KB | 16,3 KB | −42% |
| HTML | 4,8 KB | 2,7 KB | −43% |

A pasta `dist/` é gerada automaticamente e, por isso, não é versionada (está no `.gitignore`).

## Testes

```bash
npm test
```

Os testes usam o executor nativo do Node.js e ficam na pasta `tests/`. Eles cobrem as partes da aplicação que não dependem da tela:

| Arquivo | O que é testado |
|---|---|
| `mascaras.test.js` | Formatação de CPF, telefone e CEP |
| `validacao.test.js` | Dígitos verificadores do CPF e cálculo de idade |
| `escaparHTML.test.js` | Proteção contra injeção de HTML (XSS) e o componente de cartão |
| `storage.test.js` | Gravação e leitura no `localStorage` (simulado em memória), incluindo dados corrompidos |

## Estrutura de pastas

```
├── html/
│   └── index.html            # página única: cabeçalho, <main id="app">, rodapé, toast e modal
├── css/
│   ├── style.css             # variáveis de design, layout e componentes
│   ├── cadastros.css         # botões, formulário e estados de validação
│   └── temas.css             # cores dos temas escuro e alto contraste
├── img/                      # imagens dos projetos e logotipo
├── js/
│   ├── main.js               # ponto de entrada
│   ├── router.js             # roteamento da SPA
│   ├── validacao.js          # regras de validação do formulário
│   ├── storage.js            # leitura e gravação no localStorage
│   ├── dados/                # dados dos projetos
│   ├── templates/            # uma tela por arquivo
│   ├── components/           # toast, modal, menu, cartões, lista e gráfico
│   └── utils/                # funções puras (máscaras e escape de HTML)
├── tests/                    # testes automatizados
├── scripts/
│   └── build.mjs             # script da build de produção
├── CHANGELOG.md              # histórico de versões
└── package.json              # scripts npm e dependência de build
```

## Arquitetura

O código segue o princípio da **responsabilidade única**, com **dependências em uma só direção**:

```
main.js → router.js → templates → components / validacao.js / storage.js → utils
```

Módulos de baixo nunca importam os de cima. Cada template exporta o mesmo contrato:

```js
export const exemplo = {
    titulo: "Título da aba",
    html() { return `...`; },      // HTML da tela
    iniciar() { /* eventos */ }    // opcional; roda depois que o HTML entra no DOM
};
```

**Para criar uma nova página:** crie o arquivo em `js/templates/` e registre a rota no objeto `rotas` em `js/router.js`.

## Dados salvos no navegador

| Chave | Conteúdo |
|---|---|
| `ong:voluntarios` | Array de voluntários cadastrados |
| `ong:rascunhoCadastro` | Rascunho do formulário em preenchimento |
| `ong:tema` | Tema escolhido (`auto`, `claro`, `escuro` ou `alto-contraste`) |

Por ser um dado sensível, o **CPF não é armazenado**.

## Acessibilidade

O projeto segue as diretrizes da **WCAG 2.1, nível AA**. A auditoria automática com [axe-core](https://github.com/dequelabs/axe-core) não aponta violações em nenhuma tela, nem com o modal aberto.

| Recurso | Critério WCAG |
|---|---|
| Landmarks `header`, `nav` (com `aria-label`), `main` e `footer`; `section`, `article`, `fieldset` e `legend` | 1.3.1 Informações e relações |
| Link "Pular para o conteúdo", visível ao receber foco | 2.4.1 Ignorar blocos |
| Título da aba atualizado a cada tela | 2.4.2 Página com título |
| Foco levado ao `<h1>` da nova tela e anúncio da página por `aria-live` | 2.4.3 Ordem do foco / 4.1.3 Mensagens de status |
| Contraste de texto de no mínimo 4,5:1 em todos os componentes | 1.4.3 Contraste (mínimo) |
| Contorno de foco e bordas de campos com no mínimo 3:1 | 1.4.11 Contraste não textual |
| Contorno de foco visível em todos os elementos interativos | 2.4.7 Foco visível |
| `autocomplete` nos campos pessoais (`name`, `email`, `bday`, `postal-code`...) | 1.3.5 Identificar o propósito da entrada |
| Rótulos em todos os campos e instrução "Todos os campos são obrigatórios" | 3.3.2 Rótulos ou instruções |
| Erro descrito em texto abaixo do campo, com `aria-invalid` e `aria-describedby` | 3.3.1 Identificação do erro / 3.3.3 Sugestão de erro |
| Modal com `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`, foco preso e fundo `inert` | 2.1.2 Sem bloqueio do teclado / 2.4.3 Ordem do foco |
| Menu com `aria-expanded` e `aria-controls`; link ativo com `aria-current="page"` | 4.1.2 Nome, função, valor |
| Toast com `role="status"` e `aria-live="polite"` | 4.1.3 Mensagens de status |
| Tecla **ESC** fecha modal, toast e menu | 2.1.1 Teclado |
| Status dos projetos indicado por texto, não só por cor | 1.4.1 Uso de cor |
| Textos alternativos nas imagens; ícones decorativos com `aria-hidden` | 1.1.1 Conteúdo não textual |
| Animações desativadas com `prefers-reduced-motion` | 2.3.3 Animação por interações |

## Temas de cor

O seletor **Tema**, no cabeçalho, oferece quatro opções:

| Opção | Comportamento |
|---|---|
| Automático | Segue o sistema operacional (`prefers-color-scheme` e `prefers-contrast`) e muda sozinho se o sistema mudar |
| Claro | Tema padrão |
| Escuro | Fundos quase pretos e cores da marca em tons claros |
| Alto contraste | Preto e branco com destaques em amarelo, ciano, verde e salmão; links sublinhados e bordas mais grossas |

**Como funciona:** todas as cores são variáveis CSS (`--cor-...`). O arquivo `css/temas.css` redefine só essas variáveis para `[data-tema="escuro"]` e `[data-tema="alto-contraste"]`, sem repetir nenhuma regra. O JavaScript coloca o atributo `data-tema` no `<html>`, e um script curto no `<head>` aplica o tema salvo antes de a página aparecer, evitando que o tema claro "pisque".

| Tema | Menor contraste de texto |
|---|---|
| Claro | 4,56:1 (AA exige 4,5:1) |
| Escuro | 7,13:1 |
| Alto contraste | 9,20:1 (acima do AAA, que exige 7:1) |

O modo de cores forçadas do Windows (`forced-colors`) também é respeitado.

## Fluxo de trabalho

**Branches (GitFlow):**

| Branch | Uso |
|---|---|
| `main` | Somente versões lançadas; cada merge recebe uma tag (ex.: `v1.0.0`) |
| `develop` | Integração contínua do desenvolvimento |
| `feature/*` | Uma branch por funcionalidade, criada a partir de `develop` |
| `release/*` | Preparação de uma versão (changelog e ajustes finais) |
| `hotfix/*` | Correção urgente, criada a partir de `main` |

**Commits:** seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/), com os tipos `feat`, `fix`, `docs`, `test`, `build`, `chore`, `style` e `refactor`.

**Versões:** seguem o [Versionamento Semântico](https://semver.org/lang/pt-BR/) (MAJOR.MINOR.PATCH) e são registradas no [CHANGELOG.md](CHANGELOG.md).

## Autoria

Projeto desenvolvido por **[seu nome]** como atividade prática do curso.
