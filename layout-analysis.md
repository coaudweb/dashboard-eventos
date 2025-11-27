# Análise do Novo Layout - Dashboard de Eventos

## Estrutura do Layout de Referência

### 1. Header
- Título: "Dashboard de Eventos"
- Subtítulo: "Acompanhamento em tempo real dos eventos"
- Última atualização no canto superior direito

### 2. Cards Horizontais (Estatísticas de Hoje)
**Ordem:** Total → A Iniciar → Em Andamento → Cancelados → Finalizados

**Cores dos Cards:**
- Total de Eventos Hoje: Verde escuro (#2D6A5A)
- Eventos a Iniciar: Verde médio (#5A9B8A)
- Eventos em Andamento: Verde claro (#7DBDAD)
- Eventos Cancelados Hoje: Verde amarelado (#A8C97F)
- Eventos Finalizados: Verde claro (#C5D9A4)

**Layout:** 5 cards em linha horizontal com números grandes centralizados

### 3. Seção Esquerda (33% da largura)

#### Estatísticas do Mês Atual
- Card branco com borda
- Total de Eventos no Mês: número grande
- Eventos Cancelados no Mês: número grande
- Gráfico de rosca (donut chart) mostrando:
  - Realizados: 80,2% (verde escuro)
  - Cancelamento: 19,5% (verde claro)

#### Estatísticas do Ano
- Card branco com borda
- Total de Eventos no Ano: número grande
- Eventos Cancelados no Ano: número grande
- Gráfico de rosca (donut chart) mostrando:
  - Realizados: 89,1% (verde escuro)
  - Cancelamento: 10,9% (verde claro)

### 4. Seção Direita (67% da largura)

#### Eventos Mês a Mês
- Gráfico de barras horizontais
- Meses de Janeiro a Dezembro
- Barras em gradiente de verde (claro a escuro)
- Valores exibidos no final de cada barra
- Escala de 0 a 1000

## Mudanças Necessárias

1. ✅ Remover tabelas de eventos por local
2. ✅ Manter cards de hoje no topo (já implementado)
3. ⬜ Criar componente de gráfico de rosca (donut chart)
4. ⬜ Reorganizar layout em 2 colunas (33% / 67%)
5. ⬜ Adicionar gráficos de rosca nas estatísticas mensais e anuais
6. ⬜ Converter tabela mensal em gráfico de barras horizontais
7. ⬜ Ajustar paleta de cores para tons de verde
8. ⬜ Atualizar cores dos cards de hoje
