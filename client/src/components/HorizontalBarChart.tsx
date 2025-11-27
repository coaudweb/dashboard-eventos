import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

interface MonthData {
  month: string;
  total: number;
  cancelled: number;
  cancellationRate?: number;
}

interface HorizontalBarChartProps {
  data: MonthData[];
}

export function HorizontalBarChart({ data }: HorizontalBarChartProps) {
  // Cores em gradiente de verde (claro a escuro)
  const getBarColor = (index: number) => {
    const colors = [
      '#C5D9A4', // Janeiro - verde muito claro
      '#B8D18F', // Fevereiro
      '#A8C97F', // Março
      '#98C170', // Abril
      '#88B961', // Maio
      '#78B152', // Junho
      '#68A943', // Julho
      '#5A9B8A', // Agosto - verde médio
      '#4D8D7C', // Setembro
      '#407F6E', // Outubro
      '#337160', // Novembro
      '#2D6A5A', // Dezembro - verde escuro
    ];
    return colors[index] || '#5A9B8A';
  };

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Eventos Mês a Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
            <XAxis type="number" domain={[0, 1000]} stroke="#888" />
            <YAxis dataKey="month" type="category" stroke="#888" width={80} />
            <Bar dataKey="total" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#fff', fontSize: 12 }}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
