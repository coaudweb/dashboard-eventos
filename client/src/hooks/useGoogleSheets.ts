import { useState, useEffect } from 'react';

export interface EventData {
  idAgenda: string;
  dataEvento: Date;
  local: string;
  horaPrevista: Date | null;
  indicacaoCancelamento: string | null;
  horaInicioEvento: Date | null;
  horaTerminoEvento: Date | null;
  hablitHoraEvento: boolean | null;
  check: string | null;
  ficha: string | null;
  status: string | null;
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1sE7us-6nCUcajYKhY_lBbMghy8xe2tUfi5kOYd45npc/gviz/tq?tqx=out:json&gid=0';

function parseGoogleDate(dateValue: any): Date {
  if (!dateValue || !dateValue.v) return new Date();
  
  // Google Sheets retorna datas no formato Date(ano, mês-1, dia)
  const match = dateValue.v.match(/Date\((\d+),(\d+),(\d+)(?:,(\d+),(\d+),(\d+))?\)/);
  if (match) {
    const year = parseInt(match[1]);
    const month = parseInt(match[2]);
    const day = parseInt(match[3]);
    const hour = match[4] ? parseInt(match[4]) : 0;
    const minute = match[5] ? parseInt(match[5]) : 0;
    const second = match[6] ? parseInt(match[6]) : 0;
    
    return new Date(year, month, day, hour, minute, second);
  }
  
  return new Date();
}

export function useGoogleSheets() {
  const [data, setData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SHEET_URL);
      const text = await response.text();
      
      // Remove o prefixo do JSONP
      const jsonText = text.substring(text.indexOf('(') + 1, text.lastIndexOf(')'));
      const jsonData = JSON.parse(jsonText);
      
      const rows = jsonData.table.rows;
      const events: EventData[] = rows.map((row: any) => {
        const cells = row.c;
        return {
          idAgenda: cells[0]?.v || '',
          dataEvento: parseGoogleDate(cells[1]),
          local: cells[2]?.v || '',
          horaPrevista: cells[3] ? parseGoogleDate(cells[3]) : null,
          indicacaoCancelamento: cells[4]?.v || null,
          horaInicioEvento: cells[5] ? parseGoogleDate(cells[5]) : null,
          horaTerminoEvento: cells[6] ? parseGoogleDate(cells[6]) : null,
          hablitHoraEvento: cells[7]?.v || null,
          check: cells[8]?.v || null,
          ficha: cells[9]?.v || null,
          status: cells[10]?.v || null,
        };
      });
      
      setData(events);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados da planilha');
      console.error('Erro ao buscar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Atualizar a cada 10 minutos (600000 ms)
    const interval = setInterval(fetchData, 600000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, lastUpdate, refetch: fetchData };
}
