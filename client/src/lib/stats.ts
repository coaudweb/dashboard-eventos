import { EventData } from '@/hooks/useGoogleSheets';

export function getYear(date: Date): number {
  return date.getFullYear();
}

export function getMonth(date: Date): number {
  return date.getMonth();
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isCurrentMonth(date: Date): boolean {
  const today = new Date();
  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isCurrentYear(date: Date): boolean {
  const today = new Date();
  return date.getFullYear() === today.getFullYear();
}

export function isCancelled(event: EventData): boolean {
  return event.indicacaoCancelamento !== null && event.indicacaoCancelamento !== '';
}

export function isFinished(event: EventData): boolean {
  return event.status === 'Finalizado';
}

export function isInProgress(event: EventData): boolean {
  return event.status === 'Em andamento';
}

export function isToStart(event: EventData): boolean {
  return event.status === 'A iniciar' || event.status === 'À iniciar';
}

export interface Stats {
  totalYear: number;
  cancelledYear: number;
  totalMonth: number;
  cancelledMonth: number;
  totalToday: number;
  cancelledToday: number;
  finishedToday: number;
  toStartToday: number;
  inProgressToday: number;
}

export function calculateStats(events: EventData[]): Stats {
  const stats: Stats = {
    totalYear: 0,
    cancelledYear: 0,
    totalMonth: 0,
    cancelledMonth: 0,
    totalToday: 0,
    cancelledToday: 0,
    finishedToday: 0,
    toStartToday: 0,
    inProgressToday: 0,
  };

  events.forEach((event) => {
    // Ano atual
    if (isCurrentYear(event.dataEvento)) {
      stats.totalYear++;
      if (isCancelled(event)) {
        stats.cancelledYear++;
      }
    }

    // Mês atual
    if (isCurrentMonth(event.dataEvento)) {
      stats.totalMonth++;
      if (isCancelled(event)) {
        stats.cancelledMonth++;
      }
    }

    // Dia atual
    if (isToday(event.dataEvento)) {
      stats.totalToday++;
      if (isCancelled(event)) {
        stats.cancelledToday++;
      }
      if (isFinished(event)) {
        stats.finishedToday++;
      }
      if (isToStart(event)) {
        stats.toStartToday++;
      }
      if (isInProgress(event)) {
        stats.inProgressToday++;
      }
    }
  });

  return stats;
}

export interface MonthlyData {
  month: string;
  total: number;
  cancelled: number;
}

export function calculateMonthlyData(events: EventData[]): MonthlyData[] {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const currentYear = new Date().getFullYear();
  
  const monthlyData: MonthlyData[] = months.map((month, index) => ({
    month,
    total: 0,
    cancelled: 0,
  }));

  events.forEach((event) => {
    if (getYear(event.dataEvento) === currentYear) {
      const monthIndex = getMonth(event.dataEvento);
      monthlyData[monthIndex].total++;
      if (isCancelled(event)) {
        monthlyData[monthIndex].cancelled++;
      }
    }
  });

  return monthlyData;
}

export interface LocationData {
  location: string;
  count: number;
}

export function calculateLocationStats(events: EventData[], period: 'month' | 'year'): LocationData[] {
  const locationMap = new Map<string, number>();

  events.forEach((event) => {
    const isInPeriod = period === 'month' 
      ? isCurrentMonth(event.dataEvento) 
      : isCurrentYear(event.dataEvento);

    if (isInPeriod && !isCancelled(event)) {
      const location = event.local || 'Não especificado';
      locationMap.set(location, (locationMap.get(location) || 0) + 1);
    }
  });

  return Array.from(locationMap.entries())
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count);
}
