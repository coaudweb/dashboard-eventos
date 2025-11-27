import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description?: string;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, description, color, trend }: StatCardProps) {
  return (
    <Card 
      className="hover:opacity-90 transition-opacity border-0" 
      style={{ backgroundColor: color || 'var(--card)' }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium" style={{ color: 'white' }}>
          {title}
        </CardTitle>
        <Icon className="h-5 w-5" style={{ color: 'white' }} />
      </CardHeader>
      <CardContent>
        <div className="text-5xl font-bold" style={{ color: 'white' }}>{value}</div>
        {description && (
          <p className="text-xs mt-1" style={{ color: color ? 'rgba(255,255,255,0.8)' : 'var(--muted-foreground)' }}>{description}</p>
        )}
        {trend && (
          <div className={`text-xs mt-2 flex items-center gap-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
