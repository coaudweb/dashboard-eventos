import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface DonutChartProps {
  title: string;
  totalEvents: number;
  cancelledEvents: number;
  period: string;
}

export function DonutChart({ title, totalEvents, cancelledEvents, period }: DonutChartProps) {
  const realizedEvents = totalEvents - cancelledEvents;
  const realizedPercentage = totalEvents > 0 ? ((realizedEvents / totalEvents) * 100).toFixed(1) : 0;
  const cancelledPercentage = totalEvents > 0 ? ((cancelledEvents / totalEvents) * 100).toFixed(1) : 0;

  const data = [
    { name: 'Realizados', value: realizedEvents, percentage: realizedPercentage },
    { name: 'Cancelamento', value: cancelledEvents, percentage: cancelledPercentage },
  ];

  const COLORS = ['#2D6A5A', '#A8C97F'];

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">{title}</CardTitle>
        <p className="text-sm text-muted-foreground text-center">{period}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          {/* Números principais */}
          <div className="w-full space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total de Eventos no {title.includes('Mês') ? 'Mês' : 'Ano'}</p>
              <p className="text-4xl font-bold text-foreground">{totalEvents}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Eventos Cancelados no {title.includes('Mês') ? 'Mês' : 'Ano'}</p>
              <p className="text-4xl font-bold text-foreground">{cancelledEvents}</p>
            </div>
          </div>

          {/* Gráfico de Rosca */}
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legenda customizada */}
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[0] }}></div>
                <span className="text-sm text-muted-foreground">Realizados</span>
              </div>
              <span className="text-sm font-semibold">{realizedPercentage}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[1] }}></div>
                <span className="text-sm text-muted-foreground">Cancelamento</span>
              </div>
              <span className="text-sm font-semibold">{cancelledPercentage}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
