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
  // Encontrar valores mínimo e máximo para normalização
  const values = data.map(d => d.total);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  
  // Graduação dinâmica: menor valor = mais claro, maior valor = mais escuro
  const getBarColor = (value: number) => {
    // Normalizar valor entre 0 e 1
    const normalized = maxValue === minValue ? 0.5 : (value - minValue) / (maxValue - minValue);
    
    // Interpolar entre verde claro (#C5D9A4) e verde escuro (#2D6A5A)
    // Usando interpolação RGB
    const lightColor = { r: 197, g: 217, b: 164 }; // #C5D9A4
    const darkColor = { r: 45, g: 106, b: 90 };    // #2D6A5A
    
    const r = Math.round(lightColor.r + (darkColor.r - lightColor.r) * normalized);
    const g = Math.round(lightColor.g + (darkColor.g - lightColor.g) * normalized);
    const b = Math.round(lightColor.b + (darkColor.b - lightColor.b) * normalized);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Eventos Mês a Mês</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
            <XAxis type="number" domain={[0, 1000]} stroke="#888" />
            <YAxis dataKey="month" type="category" stroke="#888" width={80} />
            <Bar dataKey="total" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#333', fontSize: 12 }}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.total)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
