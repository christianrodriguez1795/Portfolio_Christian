import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Modal, Box, Typography } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faEdit, faTrash, faPlus, faEye, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Button } from '@headlessui/react';

const Projects = ({ auth, projects }) => {

  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [projectsList, setProjectsList] = useState(projects);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 5 : 6); // Inicializar basado en el tamaño de pantalla
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [inputValue, setInputValue] = useState('');

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

  // Calcula la lista paginada de proyectos usando projectsList
  const paginatedProjects = projectsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(projectsList.length / itemsPerPage);

  const handlePaginationClick = (page, event) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  const handleDelete = () => {
    if (projectToDelete && inputValue === projectToDelete.title) {
      axios.delete(route('projects.destroy', projectToDelete.id))
        .then(response => {
          const successMessage = response.data.success || 'Project deleted successfully.';
          setSnackbarMessage(successMessage);
          setSnackbarSeverity('success');
          setOpenSnackbar(true);

          setProjectsList(prevProjects => prevProjects.filter(project => project.id !== projectToDelete.id));
          setOpenModal(false);
        })
        .catch(error => {
          let errorMessage = 'Failed to delete project. Please try again.';
          if (error.response?.data?.error) {
            errorMessage = error.response.data.error;
          }
          setSnackbarMessage(errorMessage);
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        });
    }
  };

  const handleOpenModal = (project) => {
    setProjectToDelete(project);
    setInputValue('');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setProjectToDelete(null);
    setInputValue('');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    bgcolor: darkMode ? '#2c2c2c' : 'white',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };


  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="text-[#757575] dark:text-white font-semibold text-xl leading-tight">Proyectos</h2>}>
      <Head title="Projects" />

      <div className='max-w-6xl mx-auto p-6'>
        <div className='flex flex-col gap-4 p-5'>
          <div className='w-full flex justify-end'>
            <Link
              href={route('projects.create')}
              className=" flex  flex-grow md:flex-grow-0 justify-center items-center gap-2 bg-[#757575] dark:bg-[#ffffff63] text-white dark:text-black 
                          font-bold px-4 py-4 md:py-[6px] rounded-lg transition-all duration-500 ease-in-out hover:bg-[#b6b6b6c2] hover:text-black dark:hover:bg-white "
            >
              <FontAwesomeIcon icon={faPlus} className="" />
              Nuevo
            </Link>
          </div>

          <TableContainer className={`border border-[#757575] dark:border-white rounded-lg shadow-2xl scrollbarGenerico ${darkMode ? 'scrollbarGenerico-dark' : 'scrollbarGenerico-light'}  `}>
            <Table aria-label="simple table" sx={{ border: 'none' }} className=' bg-white dark:bg-[#272727]'>
              <TableHead sx={{ border: 'none' }}>
                <TableRow className='border-b border-[#757575] dark:border-white'>
                  <TableCell align="left" className='dark:text-white' sx={{ border: 'none', fontWeight: 'bold', display: { xs: 'table-cell' }, '@media (max-width: 600px)': { display: 'none' } }}>Imagen</TableCell>
                  <TableCell align="left" className='dark:text-white' sx={{ border: 'none', fontWeight: 'bold' }}>Titulo</TableCell>
                  <TableCell align="left" className='dark:text-white' sx={{ border: 'none', fontWeight: 'bold', display: { xs: 'none', md: 'table-cell', } }}>Descripcion</TableCell>
                  <TableCell align="left" className='dark:text-white' sx={{ border: 'none', fontWeight: 'bold', display: { xs: 'none', md: 'table-cell', } }}>URL</TableCell>
                  <TableCell align="left" className='dark:text-white' sx={{ border: 'none', fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ border: 'none' }} className='border-[#757575] dark:border-white'>
                {paginatedProjects.length > 0 ? (
                  paginatedProjects.map((project, index) => (
                    <TableRow key={project.id} className={`${index === paginatedProjects.length - 1 ? 'border-none' : 'border-b border-[#757575] dark:border-white'}`}>
                      <TableCell align="left" sx={{ border: 'none', display: { xs: 'table-cell' }, '@media (max-width: 600px)': { display: 'none' } }}>{project.image && <img src={`${project.image}`} alt={project.title} style={{ width: 50, height: 50 }} className='rounded-md' />}</TableCell>
                      <TableCell align="left" className='dark:text-white' sx={{ border: 'none' }} >{project.title}</TableCell>
                      <TableCell align="left" className='dark:text-white' sx={{ border: 'none', display: { xs: 'none', md: 'table-cell', } }}>{project.description}</TableCell>
                      <TableCell align="left" className='dark:text-white' sx={{ border: 'none', display: { xs: 'none', md: 'table-cell', } }}>
                        <div className='flex gap-2'>
                          {project.urlGitHub && <a href={project.urlGitHub} target="_blank" className='flex justify-center text-[#757575] hover:text-[#b6b6b6c2] 
                        dark:hover:text-white transition-all duration-300'>
                            <FontAwesomeIcon icon={faGithub} size='2x' />
                          </a>
                          }
                          {project.urlSitio && <a href={project.urlSitio} target="_blank" className='flex justify-center text-[#757575] hover:text-[#b6b6b6c2] 
                        dark:hover:text-white transition-all duration-300'>
                            <FontAwesomeIcon icon={faEye} size='2x' />
                          </a>
                          }
                        </div>
                      </TableCell>
                      <TableCell align="left" sx={{ border: 'none' }}>
                        <div className='flex gap-1 md:gap-2'>
                          <IconButton component={Link} href={route('projects.edit', project.id)}
                            sx={{
                              color: '#757575',
                              transition: 'color 0.3s ease',
                              '&:hover': {
                                color: darkMode ? 'white' : '#b6b6b6c2',
                              },
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </IconButton>
                          <IconButton
                            onClick={() => handleOpenModal(project)}
                            className='bg-white'
                            sx={{
                              color: '#757575',
                              transition: 'color 0.3s ease',
                              '&:hover': {
                                color: 'red',
                              },
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </IconButton>
                        </div>
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

      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*---------------------------------------------------------Modal de confirmación----------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle} className='flex flex-col gap-5'>
          <Typography variant="h6" textAlign='center' color={darkMode ? 'white' : 'black'}>
            Confirmar Eliminación
          </Typography>
          <div
            className={`flex flex-col gap-5 overflow-y-auto scrollbarModal ${darkMode ? 'scrollbarModal-dark' : 'scrollbarModal-light'}`}
            style={{ minHeight: 'auto', maxHeight: 'auto', overflowY: 'auto' }}
          >
            <div className='flex flex-col gap-3'>


              <Typography variant="body2" color={darkMode ? 'white' : 'black'}>
                ¿Estas seguro de que desea eliminar este proyecto?.
              </Typography>
              <Typography variant="body2" color={darkMode ? 'white' : 'black'}>
                Escribe el nombre del proyecto <strong className='text-red-600'>{projectToDelete?.title}</strong> para confirmar la eliminación.
              </Typography>
            </div>

            <div className="flex-grow relative">
              <input
                type="text"
                id="deleteProject"
                name="deleteProject"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                className="peer px-[14px] py-[16.5px] w-full border border-[#757575] bg-transparent rounded-lg focus:outline-none 
                focus:ring-0 focus:border-[#2c2c2c] dark:focus:border-[#A9A9A9] dark:border-white dark:bg-transparent dark:text-white
                placeholder-white"
                placeholder="Nombre del proyecto"
              />
            </div>
          </div>
          <div className='flex justify-between items-center gap-4'>

            <button
              onClick={handleCloseModal}
              className="flex md:flex-grow-0 justify-center items-center gap-2 bg-[#757575] dark:bg-[#ffffff63] text-white 
              dark:text-black font-bold px-4 py-[6px] rounded-lg transition-all duration-500 ease-in-out hover:bg-[#b6b6b6c2] 
              hover:text-black dark:hover:bg-white"
            >
              Cancelar
            </button>

            <button
              disabled={inputValue !== projectToDelete?.title}
              onClick={handleDelete}
              className={`${inputValue !== projectToDelete?.title ? 'text-black bg-[#757575] dark:bg-[#ffffff63] cursor-no-drop' : ' bg-red-600 text-white hover:bg-red-800'} 
              hidden md:flex md:flex-grow-0 justify-center items-center gap-2 font-bold px-4 py-[6px] rounded-lg transition-all duration-500 ease-in-out `}
            >
              <FontAwesomeIcon icon={faTrash} />
              Eliminar
            </button>
          </div>
        </Box>
      </Modal>

      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*-----------------------------------------------------------------Snackbar---------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}

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
