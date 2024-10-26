import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Padding } from '@mui/icons-material';

const Statistics = () => {
  const { visits } = usePage().props;

  // Mapea los nombres de las páginas a sus traducciones en español
  const pageTranslations = {
    '/': 'Portafolio',
    'dashboard': 'Panel de Control',
    'projects': 'Proyectos',
    'blog': 'Blog',
    'messages': 'Mensajes',
    'statistics': 'Estadísticas',
  };

  const data = visits.map(visit => visit.visits);
  const labels = visits.map(visit => pageTranslations[visit.page] || visit.page);

  console.log(data, labels); // Verifica los datos en la consola

  if (!data.length) {
    return (
      <AuthenticatedLayout
        header={<h2 className="text-[#757575] dark:text-white font-semibold text-xl leading-tight">Analíticas de Visitas</h2>}
      >
        <Head title="Analytics" />
        <Typography variant="h5" component="div">
          No hay datos disponibles para mostrar.
        </Typography>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout
      header={<h2 className="text-[#757575] dark:text-white font-semibold text-xl leading-tight">Analíticas de Visitas</h2>}
    >
      <Head title="Analytics" />

      <Grid  >
        <Grid  >
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Estadísticas de Visitas
              </Typography>
              <div style={{ height: 400, width: '100%' }}>
                <BarChart
                  series={[{ data }]}
                  height={400}
                  xAxis={[{ data: labels, scaleType: 'band' }]}
                  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Resumen
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total de Visitas: {data.reduce((sum, item) => sum + item, 0)}
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }}>Exportar Datos</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AuthenticatedLayout>
  );
};

export default Statistics;
