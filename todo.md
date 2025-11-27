# Dashboard de Eventos - TODO

## Funcionalidades Principais

- [x] Integração com Google Sheets API para buscar dados da planilha
- [x] Estrutura de dados para processar eventos da planilha
- [x] Card: Quantidade de eventos por ano
- [x] Card: Quantidade de eventos cancelados por ano
- [x] Card: Quantidade de eventos no mês atual
- [x] Card: Quantidade de eventos cancelados no mês atual
- [x] Card: Quantidade de eventos no dia atual
- [x] Card: Quantidade de eventos cancelados no dia atual
- [x] Card: Quantidade de eventos finalizados no dia atual
- [x] Card: Quantidade de eventos a iniciar no dia atual
- [x] Card: Quantidade de eventos em andamento no dia atual
- [x] Tabela mensal mostrando eventos de janeiro a dezembro (total e cancelados)
- [x] Gráfico de quantidade de eventos por local no mês atual
- [x] Gráfico de quantidade de eventos por local no ano atual
- [x] Atualização automática dos dados a cada 10 minutos
- [x] Design responsivo e moderno do dashboard

## Correções Necessárias

- [x] Corrigir lógica de cálculo de eventos "a iniciar" e "em andamento" no dia atual

## Deploy e Hospedagem

- [x] Configurar vite.config.ts para GitHub Pages
- [x] Criar workflow do GitHub Actions para deploy automático
- [x] Atualizar README.md com instruções de deploy no GitHub Pages

## Correção GitHub Pages

- [x] Corrigir configuração do base path no vite.config.github.ts
- [x] Atualizar workflow do GitHub Actions
- [ ] Testar deploy no GitHub Pages

## Correção de Roteamento

- [x] Ajustar App.tsx para usar hash routing no GitHub Pages
- [ ] Testar acesso direto ao dashboard

## Melhorias de Visualização

- [x] Criar componente LocationTable para substituir gráficos de barras
- [x] Substituir LocationChart por LocationTable na página Home
- [x] Testar visualização das tabelas de eventos por local

## Ajustes de Layout

- [x] Reordenar estatísticas do dia: Total > A Iniciar > Em Andamento > Cancelados > Finalizados

- [x] Reordenar seções: Estatísticas de Hoje > Estatísticas Mensais > Estatísticas do Ano

## Ajustes de Estilo

- [x] Remover barra de rolagem lateral direita

## Ajustes de Design e Layout

- [x] Mudar background para tema claro (branco/cinza claro)
- [x] Ajustar cores de texto para tema claro
- [x] Redimensionar componentes para resolução 1920x1080
- [x] Implementar graduação dinâmica de cores nas barras (menor valor = mais claro, maior valor = mais escuro)

## Configuração de Atualização

- [x] Alterar tempo de atualização automática de 10 minutos para 2 minutos

## Reorganização de Layout

- [x] Colocar Estatísticas do Mês, Estatísticas do Ano e Eventos Mês a Mês na mesma linha horizontal

## Ajustes de Largura

- [x] Ajustar largura dos cards de Estatísticas do Mês e Ano para corresponder aos cards de eventos de hoje

## Ajustes Finais

- [x] Reordenar seções: Estatísticas do Mês → Eventos Mês a Mês → Estatísticas do Ano
- [x] Aumentar fonte dos números das estatísticas de hoje
