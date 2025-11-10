import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LocationData {
  location: string;
  count: number;
}

interface LocationTableProps {
  title: string;
  data: LocationData[];
}

export default function LocationTable({ title, data }: LocationTableProps) {
  // Ordenar por quantidade (decrescente)
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                  Local
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                  Quantidade
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr
                  key={item.location}
                  className={`border-b border-border/30 hover:bg-accent/20 transition-colors ${
                    index % 2 === 0 ? 'bg-background/30' : 'bg-background/10'
                  }`}
                >
                  <td className="py-3 px-4 text-foreground">{item.location}</td>
                  <td className="py-3 px-4 text-right font-semibold text-primary">
                    {item.count}
                  </td>
                </tr>
              ))}
              {sortedData.length === 0 && (
                <tr>
                  <td colSpan={2} className="py-8 text-center text-muted-foreground">
                    Nenhum evento encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
