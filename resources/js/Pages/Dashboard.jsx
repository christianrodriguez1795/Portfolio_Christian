import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Typography, Card, CardContent, Grid, Button, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const { visits } = usePage().props;
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const handleThemeChange = (event) => {
      const currentTheme = event.detail.theme; // Extraer el tema desde event.detail
      setDarkMode(currentTheme === 'dark');
    };

    // Escuchar el evento themeChange
    window.addEventListener('themeChange', handleThemeChange);

    // Limpiar el listener cuando se desmonte el componente
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  const pageTranslations = {
    '/': 'Portafolio',
    'dashboard': 'Panel de Control',
    'projects': 'Proyectos',
    'blog': 'Blog',
    'messages': 'Mensajes',
    'statistics': 'Estadísticas',
  };

  const data = visits.map(visit => ({ name: pageTranslations[visit.page] || visit.page, visitas: visit.visits }));

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Visitas');

    worksheet.columns = [
      { header: 'Página', key: 'page', width: 30 },
      { header: 'Visitas', key: 'visits', width: 15 },
    ];

    data.forEach((value) => {
      worksheet.addRow({ page: value.name, visits: value.visitas });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'visitas.xlsx');
  };

  // Función personalizada para el Tooltip
  const CustomTooltip = ({ payload, label, active }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: darkMode ? '#272727' : 'white', border: darkMode ? '1px solid white' : '1px solid black', borderRadius: '5px' }} >
          <p style={{ color: darkMode ? '#fff' : '#000' }} className='border-b border-black dark:border-white px-3 py-2 text-center'>{`${label}`}</p>
          <p style={{ color: darkMode ? '#fff' : '#000' }} className='px-3 py-2 text-center' >{`${payload[0].value} `} </p>
        </div>
      );
    }

    return null;
  };

  return (
    <AuthenticatedLayout header={<h2 className="text-[#757575] dark:text-white font-semibold text-xl leading-tight">Panel de control</h2>}>
      <Head title="Panel de control" />

      <div className='w-full grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 p-6'>
        <Grid className='flex-1'>
          <Card className='border border-[#757575] dark:border-[#2c2c2c] dark:bg-[#2c2c2c] shadow-lg'>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }} className='dark:text-white'>
                Visitas
              </Typography>
              <div style={{ height: 400, width: '100%' }}>
                <ResponsiveContainer>
                  {data.length > 0 ? (

                    <BarChart data={data}
                      margin={{ top: 0, right: 0, left: -30, bottom: 0 }}
                    >
                      {/* Eliminar la malla discontinua */}
                      <CartesianGrid stroke="none" />
                      <XAxis dataKey="name" tick={{ fill: darkMode ? 'white' : 'black' }} stroke={darkMode ? 'white' : 'black'} />
                      <YAxis tick={{ fill: darkMode ? 'white' : 'black' }} stroke={darkMode ? 'white' : 'black'} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="visitas" fill={darkMode ? 'white' : 'black'} activeBar={{ fill: darkMode ? '#7eb2ff' : '#7eb2ff' }} />
                    </BarChart>
                  ) : (
                    <div className='w-full h-full flex justify-center items-center'>
                      <div className='flex flex-col justify-center items-center gap-4'>

                        <span className='dark:text-white'>Esperando resultados </span>
                        <CircularProgress variant='indeterminate'
                          sx={{
                            color: darkMode ? 'white' : 'black',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid className='flex-2'>
          <Card className='border border-[#757575] dark:border-[#2c2c2c] dark:bg-[#2c2c2c] shadow-lg' sx={{ padding: '16px', '& .MuiCardContent-root': { padding: 0 } }}>
            <CardContent>
              <div className='w-full lg:inline-flex justify-between gap-6'>
                <div>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }} className='text-center lg:text-left dark:text-white'>
                    Resumen
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className='text-center lg:text-left dark:text-white'>
                    Total de Visitas: {data.reduce((sum, item) => sum + item.visitas, 0)}
                  </Typography>
                </div>
                <Button
                  className='w-full lg:w-fit py-6 lg:py-0 text-white dark:bg-white dark:text-[#272727] dark:hover:bg-[#cacaca]'
                  variant="contained"
                  sx={{
                    backgroundColor: darkMode ? 'white' : '#272727',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'gray',
                    },
                    mt: { xs: 2, md: 0, lg: 0, xl: 0 },
                    py: { xs: 2, md: 0, lg: 0 }
                  }}
                  onClick={handleExport}
                  startIcon={<FontAwesomeIcon icon={faFileExport} />}
                >
                  Exportar Datos
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </AuthenticatedLayout>
  );
};

export default Dashboard;




