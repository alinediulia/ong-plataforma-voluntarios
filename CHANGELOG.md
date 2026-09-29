# Changelog

Todas as mudanças relevantes do projeto são registradas aqui.
O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto usa [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.1] - 2026-09-29

### Corrigido
- O foco não entrava no modal ao abri-lo: o `visibility` animado do modal e o `transition: all` do `.botao` deixavam o botão invisível no instante do `focus()`

## [1.0.0] - 2026-09-29

### Adicionado
- Single Page Application com roteamento por hash
- Templates de telas: início, projetos, cadastro, contato e página não encontrada
- Cartões de projetos gerados a partir de dados
- Validação do formulário em tempo real, com máscaras e regras de consistência
- Persistência de voluntários e rascunho no `localStorage`
- Gráfico de voluntários por área com Chart.js
- Componentes de feedback: badges, alertas, toast e modal
- Menu recolhível para celular
- README com instruções e arquitetura

### Removido
- Páginas HTML e script antigos, substituídos pela SPA
