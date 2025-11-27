import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import { calculateStats, calculateMonthlyData } from '@/lib/stats';
import { StatCard } from '@/components/StatCard';
import { DonutChart } from '@/components/DonutChart';
import { HorizontalBarChart } from '@/components/HorizontalBarChart';
import { 
  Calendar, 
  CalendarX, 
  CalendarCheck, 
  CalendarClock, 
  PlayCircle, 
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { data, loading, error, lastUpdate, refetch } = useGoogleSheets();

  if (loading && data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error && data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <XCircle className="h-12 w-12 text-destructive" />
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={refetch} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  const stats = calculateStats(data);
  const monthlyData = calculateMonthlyData(data);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard de Eventos</h1>
              <p className="text-muted-foreground mt-1">
                Acompanhamento em tempo real dos eventos
              </p>
            </div>
            <div className="flex items-center gap-4">
              {lastUpdate && (
                <div className="text-sm text-muted-foreground">
                  Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
                </div>
              )}
              <Button 
                onClick={refetch} 
                variant="outline" 
                size="sm"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Estatísticas do Dia */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Estatísticas de Hoje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <StatCard
              title="Total de Eventos Hoje"
              value={stats.totalToday}
              icon={CalendarClock}
              description={new Date().toLocaleDateString('pt-BR')}
              color="#2D6A5A"
            />
            <StatCard
              title="Eventos a Iniciar"
              value={stats.toStartToday}
              icon={PlayCircle}
              color="#5A9B8A"
            />
            <StatCard
              title="Eventos em Andamento"
              value={stats.inProgressToday}
              icon={Loader2}
              color="#7DBDAD"
            />
            <StatCard
              title="Eventos Cancelados Hoje"
              value={stats.cancelledToday}
              icon={XCircle}
              color="#A8C97F"
            />
            <StatCard
              title="Eventos Finalizados"
              value={stats.finishedToday}
              icon={CheckCircle2}
              color="#C5D9A4"
            />
          </div>
        </section>

        {/* Layout: Estatísticas do Mês (2 colunas), Eventos Mês a Mês (6 colunas) e Estatísticas do Ano (2 colunas) */}
        <section className="mb-8">
          <div className="grid grid-cols-1 xl:grid-cols-10 gap-6">
            {/* Estatísticas do Mês - 2 colunas (mesma largura de 2 cards de hoje) */}
            <div className="xl:col-span-2">
              <DonutChart
                title="Estatísticas do Mês Atual"
                totalEvents={stats.totalMonth}
                cancelledEvents={stats.cancelledMonth}
                period={new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              />
            </div>

            {/* Eventos Mês a Mês - 6 colunas (meio) */}
            <div className="xl:col-span-6">
              <HorizontalBarChart data={monthlyData} />
            </div>
            
            {/* Estatísticas do Ano - 2 colunas (direita) */}
            <div className="xl:col-span-2">
              <DonutChart
                title="Estatísticas do Ano"
                totalEvents={stats.totalYear}
                cancelledEvents={stats.cancelledYear}
                period={`Ano ${new Date().getFullYear()}`}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 mt-12">
        <div className="container py-6">
          <p className="text-center text-sm text-muted-foreground">
            Dashboard atualizado automaticamente a cada 10 minutos
          </p>
        </div>
      </footer>
    </div>
  );
}
