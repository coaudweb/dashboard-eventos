import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MonthlyData } from '@/lib/stats';

interface MonthlyTableProps {
  data: MonthlyData[];
}

export function MonthlyTable({ data }: MonthlyTableProps) {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Eventos por Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-muted/50">
                <TableHead className="text-muted-foreground font-semibold">Mês</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">Total de Eventos</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">Eventos Cancelados</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">Taxa de Cancelamento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => {
                const cancellationRate = row.total > 0 
                  ? ((row.cancelled / row.total) * 100).toFixed(1) 
                  : '0.0';
                
                return (
                  <TableRow key={row.month} className="border-border/50 hover:bg-muted/30">
                    <TableCell className="font-medium text-foreground">{row.month}</TableCell>
                    <TableCell className="text-right text-foreground">{row.total}</TableCell>
                    <TableCell className="text-right">
                      <span className={row.cancelled > 0 ? 'text-destructive' : 'text-muted-foreground'}>
                        {row.cancelled}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={parseFloat(cancellationRate) > 10 ? 'text-destructive' : 'text-muted-foreground'}>
                        {cancellationRate}%
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
