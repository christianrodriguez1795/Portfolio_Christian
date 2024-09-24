// import React, { useState, useEffect } from 'react';
// import { Head, usePage } from '@inertiajs/react';
// import { Typography, Card, CardContent, Grid, Button } from '@mui/material';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { useTheme } from '@mui/material/styles';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileExport } from '@fortawesome/free-solid-svg-icons';

// const Dashboard = () => {
//   const { visits } = usePage().props;

//   const theme = useTheme();

//   const lightColors = ['#1976d2', '#42a5f5', '#64b5f6']; // Colores para tema claro
//   const darkColors = ['#90caf9', '#2196f3', '#1e88e5']; // Colores para tema oscuro

//   const getPreferredTheme = () => {
//     const localTheme = localStorage.getItem('theme');
//     if (localTheme) {
//       return localTheme === 'dark';
//     } else {
//       return window.matchMedia('(prefers-color-scheme: dark)').matches;
//     }
//   };

//   const [darkMode, setDarkMode] = useState(getPreferredTheme);

//   useEffect(() => {
//     const matchDark = window.matchMedia('(prefers-color-scheme: dark)');
//     const handleChange = (e) => {
//       if (!localStorage.getItem('theme')) {
//         setDarkMode(e.matches);
//       }
//     };
//     matchDark.addEventListener('change', handleChange);

//     return () => matchDark.removeEventListener('change', handleChange);
//   }, []);

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', darkMode);
//   }, [darkMode]);


//   // Mapea los nombres de las páginas a sus traducciones en español
//   const pageTranslations = {
//     '/': 'Portafolio',
//     'dashboard': 'Panel de Control',
//     'projects': 'Proyectos',
//     'blog': 'Blog',
//     'messages': 'Mensajes',
//     'statistics': 'Estadísticas',
//   };

//   const data = visits.map(visit => visit.visits);
//   const labels = visits.map(visit => pageTranslations[visit.page] || visit.page);

//   // console.log(data, labels); // Verifica los datos en la consola

//   const handleExport = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Visitas');

//     worksheet.columns = [
//       { header: 'Página', key: 'page', width: 30 },
//       { header: 'Visitas', key: 'visits', width: 15 },
//     ];

//     data.forEach((value, index) => {
//       worksheet.addRow({ page: labels[index], visits: value });
//     });

//     const buffer = await workbook.xlsx.writeBuffer();
//     saveAs(new Blob([buffer]), 'visitas.xlsx');
//   };

//   if (!data.length) {
//     return (
//       <AuthenticatedLayout header={<h2 className="text-[#757575] dark:text-white font-semibold text-xl leading-tight">Panel de control</h2>}>
//         <Head title="Analytics" />
//         <Typography variant="h5" component="div">
//           No hay datos disponibles para mostrar.
//         </Typography>
//       </AuthenticatedLayout>
//     );
//   }

//   return (
//     <AuthenticatedLayout header={<h2 className="text-[#757575] dark:text-white font-semibold text-xl leading-tight">Panel de control</h2>}>
//       <Head title="Panel de control" />

//       <div className='w-full grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6' >
//         <Grid className='flex-1'>
//           <Card className='dark:bg-[#272727]'>
//             <CardContent>
//               <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }} className='dark:text-white'>
//                 Visitas
//               </Typography>
//               <div style={{ height: 400, width: '100%' }}>
//                 {/* <BarChart
//                   series={[{ data, color: 'white' }]}
//                   height={400}
//                   xAxis={[{ data: labels, scaleType: 'band' }]}
//                   margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
//                 // Seguir por aqui con el tema oscuro pero en la grafica
//                 /> */}

//                 <BarChart
//                   series={[{ data, color: 'white' }]}
//                   xAxis={[{ data: labels, scaleType: 'band' }]}
//                   height={400}
//                   margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
//                   colors={() => (theme.palette.mode === 'dark' ? darkColors : lightColors)}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid className='flex-2'>
//           <Card className='dark:bg-[#272727]'>
//             <CardContent>
//               <div className='w-full lg:inline-flex justify-between gap-6'>
//                 <div>
//                   <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }} className='text-center lg:text-left dark:text-white'>
//                     Resumen
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" className='text-center lg:text-left dark:text-white'>
//                     Total de Visitas: {data.reduce((sum, item) => sum + item, 0)}
//                   </Typography>
//                 </div>
//                 <Button
//                   className='w-full lg:w-fit py-6 lg:py-0 text-white  dark:bg-white dark:text-[#272727] dark:hover:bg-[#cacaca]'
//                   variant="contained"
//                   sx={{
//                     backgroundColor: darkMode ? 'white' : '#272727',
//                     color: 'white',
//                     '&:hover': {
//                       backgroundColor: 'gray',
//                     },
//                     mt: { xs: 2, md: 0, lg: 0, xl: 0 },
//                     py: { xs: 2, md: 0, lg: 0 }
//                   }}
//                   onClick={handleExport}
//                   startIcon={<FontAwesomeIcon icon={faFileExport} />}

//                 >
//                   Exportar Datos
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </Grid>
//       </div>
//     </AuthenticatedLayout>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const { visits } = usePage().props;

  // Función para obtener el tema preferido
  const getPreferredTheme = () => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      return localTheme === 'dark';
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  };

  const [darkMode, setDarkMode] = useState(getPreferredTheme);
  const [chartKey, setChartKey] = useState(Date.now()); // Estado para forzar la actualización

  useEffect(() => {
    const matchDark = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
        setChartKey(prevKey => prevKey + 1); // Incrementar clave para forzar renderizado
      }
    };
    matchDark.addEventListener('change', handleChange);

    return () => matchDark.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

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
        <div style={{ backgroundColor: darkMode ? '#272727' : 'white', border: darkMode ? '1px solid white' : '1px solid black' , borderRadius: '5px' }} >
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

      <div className='w-full grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6'>
        <Grid className='flex-1'>
          <Card className='dark:bg-[#272727]'>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }} className='dark:text-white'>
                Visitas
              </Typography>
              <div style={{ height: 400, width: '100%' }}>
                <ResponsiveContainer key={chartKey}>
                  <BarChart data={data}>
                    {/* Eliminar la malla discontinua */}
                    <CartesianGrid stroke="none" />
                    <XAxis dataKey="name" tick={{ fill: darkMode ? 'white' : 'black' }} stroke={darkMode ? 'white' : 'black'} />
                    <YAxis tick={{ fill: darkMode ? 'white' : 'black' }} stroke={darkMode ? 'white' : 'black'} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="visitas" fill={darkMode ? 'white' : 'black'} activeBar={{ fill: darkMode ? '#7eb2ff' : '#7eb2ff' }}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid className='flex-2'>
          <Card className='dark:bg-[#272727]'>
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




