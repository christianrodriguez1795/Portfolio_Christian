import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Alert } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const Messages = ({ auth, messages }) => {
  const [messagesList, setMessagesList] = useState(messages);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 5 : 6);
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

  const paginatedMessages = messagesList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(messagesList.length / itemsPerPage);

  const handlePaginationClick = (page, event) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      // Aquí puedes reemplazar con la lógica real para eliminar el mensaje
      const updatedMessages = messagesList.filter(message => message.id !== id);
      setMessagesList(updatedMessages);

      setSnackbarMessage('Message deleted successfully.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      const newTotalPages = Math.ceil(updatedMessages.length / itemsPerPage);
      let newPage = currentPage;
      if (updatedMessages.length === 0) {
        newPage = 1;
      } else if (paginatedMessages.length === 1 && currentPage > 1) {
        newPage = currentPage - 1;
      } else if (currentPage > newTotalPages) {
        newPage = newTotalPages;
      }
      setCurrentPage(newPage);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="text-black dark:text-white font-semibold text-xl leading-tight">Mensajes</h2>}>
      <Head title="Mensajes" />

      <div className='max-w-6xl mx-auto'>
        
        <TableContainer component={Paper} sx={{ mt: 2 }} className='shadow-lg dark:bg-[#272727] dark:text-white'>
          <Table aria-label="simple table">
            <TableHead className='dark:text-white'>
              <TableRow >
                <TableCell align="left" style={{ width: '150px', fontWeight: 'bold' }}  className='dark:text-white'>Fecha</TableCell>
                <TableCell align="left" style={{ width: '150px', fontWeight: 'bold' }} className='dark:text-white'>Nombre</TableCell>
                <TableCell align="left" style={{ width: '200px', fontWeight: 'bold' }}className='dark:text-white'>Correo Electrónico</TableCell>
                <TableCell align="left" style={{ width: '200px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }} className='dark:text-white'>Asunto</TableCell>
                <TableCell align="left" style={{ width: '400px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '400px' }} className='dark:text-white'>Mensaje</TableCell>                
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMessages.length > 0 ? (
                paginatedMessages.map((message) => (
                  <TableRow key={message.id} >
                    <TableCell align="left" className='dark:text-white'>
                      {isToday(new Date(message.created_at)) ? 'Hoy' : new Date(message.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="left" className='dark:text-white'>{message.name}</TableCell>
                    <TableCell align="left" className='dark:text-white'>{message.email}</TableCell>
                    <TableCell align="left" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }} className='dark:text-white'>
                      {message.subject}
                    </TableCell>
                    <TableCell align="left" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '400px' }} className='dark:text-white'>
                      {message.message}
                    </TableCell>                    
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" className='dark:text-white'>No hay mensajes</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {totalPages > 1 && (
        <div className="pagination flex justify-center pt-8 space-x-2">
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

export default Messages;
