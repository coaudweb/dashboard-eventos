import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import { calculateStats, calculateMonthlyData, calculateLocationStats } from '@/lib/stats';
import { StatCard } from '@/components/StatCard';
import { MonthlyTable } from '@/components/MonthlyTable';
import LocationTable from '@/components/LocationTable';
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
  const locationStatsMonth = calculateLocationStats(data, 'month');
  const locationStatsYear = calculateLocationStats(data, 'year');

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
            />
            <StatCard
              title="Eventos a Iniciar"
              value={stats.toStartToday}
              icon={PlayCircle}
            />
            <StatCard
              title="Eventos em Andamento"
              value={stats.inProgressToday}
              icon={Loader2}
            />
            <StatCard
              title="Eventos Cancelados Hoje"
              value={stats.cancelledToday}
              icon={XCircle}
            />
            <StatCard
              title="Eventos Finalizados"
              value={stats.finishedToday}
              icon={CheckCircle2}
            />
          </div>
        </section>

        {/* Estatísticas do Mês */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Estatísticas do Mês Atual</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard
              title="Total de Eventos no Mês"
              value={stats.totalMonth}
              icon={CalendarCheck}
              description={new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            />
            <StatCard
              title="Eventos Cancelados no Mês"
              value={stats.cancelledMonth}
              icon={CalendarX}
              description={`${stats.totalMonth > 0 ? ((stats.cancelledMonth / stats.totalMonth) * 100).toFixed(1) : 0}% de cancelamento`}
            />
          </div>
        </section>

        {/* Estatísticas do Ano */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Estatísticas do Ano</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard
              title="Total de Eventos no Ano"
              value={stats.totalYear}
              icon={Calendar}
              description={`Ano ${new Date().getFullYear()}`}
            />
            <StatCard
              title="Eventos Cancelados no Ano"
              value={stats.cancelledYear}
              icon={CalendarX}
              description={`${stats.totalYear > 0 ? ((stats.cancelledYear / stats.totalYear) * 100).toFixed(1) : 0}% de cancelamento`}
            />
          </div>
        </section>

        {/* Tabela Mensal */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Eventos Mês a Mês</h2>
          <MonthlyTable data={monthlyData} />
        </section>

        {/* Tabelas de Eventos por Local */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Eventos por Local</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LocationTable 
              data={locationStatsMonth} 
              title="Eventos por Local no Mês Atual" 
            />
            <LocationTable 
              data={locationStatsYear} 
              title="Eventos por Local no Ano" 
            />
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
