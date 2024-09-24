import React, { useState, useCallback, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Typography, Button, Box, Snackbar, Alert } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CustomSelectMultiple from '@/Components/CustomSelectMultiple';
import axios from 'axios';

const CreateProject = ({ auth, skills }) => {
  const [data, setData] = useState({
    title: '',
    description: '',
    url: '',
    image: null,
    skill_id: [], // Ajustado para habilidades múltiples
  });
  const [preview, setPreview] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('url', data.url);
    if (data.image) {
      formData.append('image', data.image);
    }
    formData.append('skill_id', JSON.stringify(data.skill_id));

    axios.post(route('projects.store'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        const successMessage = response.data.success || 'Project created successfully.';
        setSnackbarMessage(successMessage);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setData({
          title: '',
          description: '',
          url: '',
          image: null,
          skill_id: [],
        });
        setPreview(null);
      })
      .catch(error => {
        let errorMessage = 'Failed to create project. Please try again.';
        if (error.response) {
          const { data } = error.response;
          if (data.errors) {
            errorMessage = Object.values(data.errors).flat().join(', ');
          } else if (data.error) {
            errorMessage = data.error;
          }
        }
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setData(prevData => ({ ...prevData, image: file }));
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [preview]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="text-black dark:text-white font-semibold text-xl leading-tight">Añadir proyecto</h2>}>
      <Head title="Añadir proyecto" />

      <div data-aos="fade-up" className="max-w-3xl mx-auto p-0 overflow-x-hidden">
        <div className='bg-white bg-opacity-0 p-5 rounded-lg relative'>
          <form onSubmit={handleSubmit} noValidate className="w-full">
            <Box data-aos="fade-left" {...getRootProps()} sx={{
              border: '2px dashed #cccccc',
              padding: '16px',
              borderRadius: '4px',
              textAlign: 'center',
              cursor: 'pointer',
              mb: 2,
              backgroundColor: preview ? 'transparent' : 'rgba(0,0,0,0.1)',
              height: {
                xs: '150px',
                md: '336px'
              },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}>
              <input {...getInputProps()} />
              {preview ? (
                <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="mb-2 text-black dark:text-white" size="3x" />
                  <Typography className='text-black dark:text-white'>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una</Typography>
                </Box>
              )}
            </Box>
            {errors.image && <Typography color="error">{errors.image}</Typography>}

            <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-4 md:gap-6">
              <div className="flex-grow relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  required
                  className="peer pl-0 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 border-black bg-transparent
                            focus:outline-none focus:ring-0 focus:border-[#A9A9A9] dark:focus:border-[#A9A9A9] dark:border-white dark:bg-transparent dark:text-white 
                            placeholder-transparent"
                  placeholder=" "
                />
                <label
                  htmlFor="title"
                  className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                            transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Titulo
                </label>
              </div>

              <CustomSelectMultiple
                options={skills.map(skill => ({ label: skill.name, value: skill.id }))}
                value={data.skill_id}
                onChange={(value) => setData(prevData => ({ ...prevData, skill_id: value }))}
                label="Habilidades"
                error={errors.skill_id}

              />
            </div>

            <div data-aos="fade-left" className="relative mb-4">
              <textarea
                id="description"
                name="description"
                rows="4"
                value={data.description}
                onChange={handleChange}
                required
                className="peer pl-0 p-3 mt-5 pt-0 w-full border-b-2 border-t-0 border-l-0 border-r-0 border-black bg-transparent
                          focus:outline-none focus:ring-0 focus:border-[#A9A9A9] dark:focus:border-[#A9A9A9] dark:border-white dark:bg-transparent dark:text-white 
                          placeholder-transparent resize-none scrollbarGenerico scrollbarGenerico-light"
                placeholder=" "
              />
              <label
                htmlFor="description"
                className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                          transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                          peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Descripcion
              </label>
            </div>

            <div data-aos="fade-right" className="relative mb-4">
              <input
                type="text"
                id="url"
                name="url"
                value={data.url}
                onChange={handleChange}
                required
                className="peer pl-0 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 border-black bg-transparent
                          focus:outline-none focus:ring-0 focus:border-[#A9A9A9] dark:focus:border-[#A9A9A9] dark:border-white dark:bg-transparent dark:text-white 
                          placeholder-transparent"
                placeholder=" "
              />
              <label
                htmlFor="url"
                className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                          transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                          peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                URL
              </label>
            </div>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link
                href={route('projects.index')} // Usa la función route() para obtener la URL correcta
                className="px-4 py-[6px] bg-black text-white dark:bg-white dark:text-black hover:bg-[#A9A9A9] 
              dark:hover:bg-gray-300 flex items-center mt-4 rounded-[4px] uppercase text-[14px] no-underline"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Volver
              </Link>
              <button
                type="submit"
                className="px-4 py-[6px] bg-black text-white dark:bg-white dark:text-black hover:bg-[#A9A9A9] 
                dark:hover:bg-gray-300 flex items-center mt-4 rounded-[4px] uppercase text-[14px] "
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Guardar
              </button>
            </Box>
          </form>

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

export default CreateProject;
