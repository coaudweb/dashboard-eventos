import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LocationData } from '@/lib/stats';

interface LocationChartProps {
  data: LocationData[];
  title: string;
}

const COLORS = [
  'oklch(0.65 0.25 265)',
  'oklch(0.55 0.28 290)',
  'oklch(0.60 0.22 240)',
  'oklch(0.70 0.20 200)',
  'oklch(0.65 0.18 320)',
  'oklch(0.60 0.25 180)',
  'oklch(0.70 0.22 150)',
  'oklch(0.65 0.20 300)',
];

export function LocationChart({ data, title }: LocationChartProps) {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.04 265)" opacity={0.3} />
              <XAxis
                dataKey="location"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fill: 'oklch(0.70 0.02 265)', fontSize: 12 }}
                stroke="oklch(0.25 0.04 265)"
              />
              <YAxis
                tick={{ fill: 'oklch(0.70 0.02 265)', fontSize: 12 }}
                stroke="oklch(0.25 0.04 265)"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(0.18 0.03 265)',
                  border: '1px solid oklch(0.25 0.04 265)',
                  borderRadius: '8px',
                  color: 'oklch(0.95 0.01 265)',
                }}
                labelStyle={{ color: 'oklch(0.95 0.01 265)' }}
                cursor={{ fill: 'oklch(0.25 0.04 265)', opacity: 0.3 }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
