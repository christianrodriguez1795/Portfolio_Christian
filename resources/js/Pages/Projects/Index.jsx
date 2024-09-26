import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Alert } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Projects = ({ auth, projects }) => {
  const [projectsList, setProjectsList] = useState(projects);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 5 : 6); // Inicializar basado en el tamaño de pantalla
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const updateItemsPerPage = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      setItemsPerPage(5);
    } else {
      setIsMobile(false);
      setItemsPerPage(6);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateItemsPerPage);
    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  // Calcula la lista paginada de proyectos usando projectsList
  const paginatedProjects = projectsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(projectsList.length / itemsPerPage);

  const handlePaginationClick = (page, event) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      axios.delete(route('projects.destroy', id))
        .then(response => {
          const successMessage = response.data.success || 'Project deleted successfully.';
          setSnackbarMessage(successMessage);
          setSnackbarSeverity('success');
          setOpenSnackbar(true);

          setProjectsList(prevProjects => {
            const updatedProjects = prevProjects.filter(project => project.id !== id);
            const newTotalPages = Math.ceil(updatedProjects.length / itemsPerPage);

            // Calcular la nueva página actual
            let newPage = currentPage;

            // Si la lista se vacía, redirigir a la primera página
            if (updatedProjects.length === 0) {
              newPage = 1;
            } else if (paginatedProjects.length === 1 && currentPage > 1) {
              // Si solo había un proyecto en la página actual y no es la primera página
              newPage = currentPage - 1;
            } else if (currentPage > newTotalPages) {
              // Si la página actual es mayor que el total de páginas, ir a la última página
              newPage = newTotalPages;
            }

            // Actualiza la página y la lista de proyectos
            setCurrentPage(newPage);
            return updatedProjects;
          });
        })
        .catch(error => {
          let errorMessage = 'Failed to delete project. Please try again.';
          if (error.response) {
            const { data } = error.response;
            if (data.error) {
              errorMessage = data.error;
            }
          }
          setSnackbarMessage(errorMessage);
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="text-black dark:text-white font-semibold text-xl leading-tight">Proyectos</h2>}>
      <Head title="Projects" />

      <div className='max-w-6xl mx-auto'>
        <div>
          <div className='w-full flex justify-end'>
            <Link
              href={route('projects.create')} // Usa la función route() para obtener la URL correcta
              className="px-4 py-[6px] bg-black text-white dark:bg-white dark:text-black hover:bg-[#A9A9A9] 
              dark:hover:bg-gray-300 flex items-center mt-4 rounded-[4px] uppercase text-[14px] no-underline"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Nuevo
            </Link>
          </div>
          <TableContainer component={Paper} sx={{ mt: 2 }} className='shadow-lg dark:bg-[#272727]'>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" className='dark:text-white' style={{ fontWeight: 'bold' }}>Imagen</TableCell>
                  <TableCell align="left" className='dark:text-white' style={{ fontWeight: 'bold' }}>Titulo</TableCell>
                  <TableCell align="left" className='dark:text-white' sx={{ fontWeight: 'bold', display: { xs: 'none', md: 'table-cell', } }}>Descripcion</TableCell>
                  <TableCell align="left" className='dark:text-white' sx={{ fontWeight: 'bold', display: { xs: 'none', md: 'table-cell', } }}>URL</TableCell>
                  <TableCell align="left" className='dark:text-white' style={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProjects.length > 0 ? (
                  paginatedProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell align="left">{project.image && <img src={`${project.image}`} alt={project.title} style={{ width: 50, height: 50 }} className='rounded-md' />}</TableCell>
                      <TableCell align="left" className='dark:text-white'>{project.title}</TableCell>
                      <TableCell align="left" className='dark:text-white' sx={{ display: { xs: 'none', md: 'table-cell', } }}>{project.description}</TableCell>
                      <TableCell align="left" className='dark:text-white' sx={{ display: { xs: 'none', md: 'table-cell', } }}>{project.url && <a href={project.url} target="_blank">Visit</a>}</TableCell>
                      <TableCell align="left">
                        <IconButton component={Link} href={route('projects.edit', project.id)} color="primary" sx={{ mr: 2 }}>
                          <FontAwesomeIcon icon={faEdit} />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(project.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No hay proyectos</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {totalPages > 1 && (
            <div className="pagination flex justify-center pt-8 space-x-2 ">
              <a
                href="#"
                onClick={(e) => handlePaginationClick(Math.max(1, currentPage - 1), e)}
                className={`px-4 py-2 rounded-md mx-1 bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white 
                        dark:hover:text-black transition-colors duration-300 flex items-center justify-center`}
              >
                <FontAwesomeIcon icon={faAngleLeft} className='w-full h-5' />
              </a>
              {itemsPerPage > 1 && !isMobile && Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <a
                  key={page}
                  href="#"
                  onClick={(e) => handlePaginationClick(page, e)}
                  className={`px-4 py-2 rounded-md mx-1 ${currentPage === page ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-transparent text-black dark:text-white'} hover:bg-black hover:text-white dark:hover:bg-white 
                        dark:hover:text-black font-bold transition-colors duration-300 flex items-center justify-center`}
                >
                  {page}
                </a>
              ))}
              {isMobile && (
                <span className="px-4 py-2 rounded-md mx-1 bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 flex items-center justify-center">
                  {currentPage}
                </span>
              )}
              <a
                href="#"
                onClick={(e) => handlePaginationClick(Math.min(totalPages, currentPage + 1), e)}
                className={`px-4 py-2 rounded-md mx-1 bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white 
                        dark:hover:text-black transition-colors duration-300 flex items-center justify-center`}
              >
                <FontAwesomeIcon icon={faAngleRight} className='w-full h-5' />
              </a>
            </div>
          )}
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AuthenticatedLayout>
  );
};

export default Projects;
