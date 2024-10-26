import React, { useState, useCallback, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Typography, Box, Snackbar, Alert, Modal, IconButton, useMediaQuery } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faSave, faArrowLeft, faTrash, faPlus, faXmark, faListAlt } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CustomSelectMultiple from '@/Components/Inputs/CustomSelectMultiple';
import axios from 'axios';
import { detailsOptions } from '@/Hooks/datosPorfolio';
import TextInput from '@/Components/Inputs/TextInput';
import AddDetailsModal from '@/Components/Modales/AddDetailsModal';

const EditProject = ({ auth, project, skills }) => {
  const getPreferredTheme = () => localStorage.getItem('theme') === 'dark';

  const [darkMode, setDarkMode] = useState(getPreferredTheme());
  const [preview, setPreview] = useState(project.image);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [errors, setErrors] = useState({});
  const [details, setDetails] = useState(project.details.length > 0 ? JSON.parse(project.details[0].details) : [{ category: '', type: '', descriptions: [''] }]);
  const [data, setData] = useState({
    title: project.title,
    description: project.description,
    urlGitHub: project.urlGitHub,
    urlSitio: project.urlSitio,
    image: null,
    skill_id: project.skills.map(skill => skill.id),
  });

  useEffect(() => {
    const updateTheme = () => setDarkMode(getPreferredTheme());
    window.addEventListener('themeChange', updateTheme);
    updateTheme();
    return () => window.removeEventListener('themeChange', updateTheme);
  }, []);

  const isMobile = useMediaQuery('(max-width:764px)');

  const handleAddDetail = () => {
    setDetails(prevDetails => [...prevDetails, { category: '', type: '', descriptions: [''] }]);
  };

  const handleRemoveDetail = (index) => {
    setDetails(prevDetails => prevDetails.filter((_, i) => i !== index));

  };

  const handleDetailChange = (index, field, value, detail) => {

    const label = typeof value === 'number'
      ? detailsOptions.find(option => option.id === value)?.name || ''
      : detail.category;

    setDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      const isType2 = typeof value === 'number' ? value === 2 : detail.type === 2;

      updatedDetails[index]['category'] = label;
      updatedDetails[index][field] = value;

      if (isType2) {
        delete updatedDetails[index]['descriptions'];
        updatedDetails[index]['description'] = '';
        updatedDetails[index]['advantages'] = [];
      } else {
        updatedDetails[index]['descriptions'] = [''];
      }

      return updatedDetails;
    });

  };

  const handleAddDescription = (index) => {
    setDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].descriptions.push('');
      return updatedDetails;
    });
  };


  const handleRemoveDescription = (index, descriptionIndex) => {
    setDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      if (descriptionIndex >= 0 && descriptionIndex < updatedDetails[index].descriptions.length) {
        updatedDetails[index].descriptions.splice(descriptionIndex, 1);
      }
      return updatedDetails;
    });
  };

  const handleDescriptionChange = (detailIndex, descIndex, value) => {
    setDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      if (descIndex == null) {
        updatedDetails[detailIndex].description = value;
      } else {
        updatedDetails[detailIndex].descriptions[descIndex] = value;
      }
      return updatedDetails;
    });
  };

  const handleAddAdvantage = (index) => {
    setDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].advantages.push('');
      return updatedDetails;
    });
  };

  const handleRemoveAdvantage = (index, advantageIndex) => {
    setDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      if (advantageIndex >= 0 && advantageIndex < updatedDetails[index].advantages.length) {
        updatedDetails[index].advantages.splice(advantageIndex, 1);
      }
      return updatedDetails;
    });
  };

  const handleAdvantageChange = (detailIndex, advantageIndex, value) => {
    setDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[detailIndex].advantages[advantageIndex] = value;
      return updatedDetails;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    data.urlGitHub ? formData.append('urlGitHub', data.urlGitHub) : '';
    data.urlSitio ? formData.append('urlSitio', data.urlSitio) : '';
    if (data.image) formData.append('image', data.image);
    formData.append('skill_id', JSON.stringify(data.skill_id));

    if (details) {
      formData.append('details', JSON.stringify(details));
    }

    try {
      const response = await axios.post(route('projects.update', { project: project.id }), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const successMessage = response.data.success || 'Project created successfully.';
      setSnackbarMessage(successMessage);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      // setPreview(null);
    } catch (error) {
      let errorMessage = 'Failed to create project. Please try again.';
      if (error.response) {
        const { data } = error.response;
        errorMessage = data.errors ? Object.values(data.errors).flat().join(', ') : data.error || errorMessage;
      }
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setData(prevData => ({ ...prevData, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
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

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleOpenDetails = (e) => {
    e.preventDefault();
    setOpenDetails(true);
  };

  const handleCloseDetails = () => setOpenDetails(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    maxHeight: '100%',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="text-[#757575] dark:text-white font-semibold text-xl leading-tight">Añadir proyecto</h2>}>
      <Head title="Editar proyecto" />
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*------------------------------------------------------Formulario de edicion-------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      <div className="max-w-3xl mx-auto p-6">
        <div className='bg-white bg-opacity-0 rounded-lg relative'>
          <form data-aos="fade-down" onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-4">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <div data-aos="fade-down">

                <Link
                  href={route('projects.index')}
                  className="flex md:flex-grow-0 justify-center items-center gap-2 bg-[#757575] dark:bg-[#ffffff63] text-white dark:text-black
                          font-bold px-4 py-[6px] rounded-lg transition-all duration-500 ease-in-out hover:bg-[#b6b6b6c2] hover:text-black dark:hover:bg-white "
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Volver
                </Link>
              </div>

              <div data-aos="fade-down">
                <button
                  type="submit"
                  className="flex md:flex-grow-0 justify-center items-center gap-2 bg-[#757575] dark:bg-[#ffffff63] text-white dark:text-black
                font-bold px-4 py-[6px] rounded-lg transition-all duration-500 ease-in-out hover:bg-[#b6b6b6c2] hover:text-black dark:hover:bg-white "
                >
                  <FontAwesomeIcon icon={faSave} />
                  Guardar
                </button>
              </div>
            </Box>

            <div data-aos="fade-left">
              <Box data-aos="fade-left" {...getRootProps()} sx={{
                border: '2px dashed #cccccc',
                padding: '16px',
                borderRadius: '4px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: preview ? 'transparent' : 'rgba(0,0,0,0.1)',
                height: {
                  xs: '150px',
                  md: '336px',
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
                <input {...getInputProps()} />
                {preview ? (
                  <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />
                ) : (
                  <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <FontAwesomeIcon icon={faCloudUploadAlt} className="mb-2 text-black dark:text-white" size="3x" />
                      <Typography className='text-black dark:text-white'>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una</Typography>
                    </Box>
                    {errors.image && <Typography color="error">{errors.image}</Typography>}
                  </>
                )}
              </Box>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div data-aos="fade-right" data-aos-duration='1400' className="flex-grow relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  required
                  className="peer pl-0 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 border-[#757575] bg-transparent
                            focus:outline-none focus:ring-0 focus:border-[#2c2c2c] dark:focus:border-[#A9A9A9] dark:border-white dark:bg-transparent dark:text-white
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
              <div data-aos="fade-left" data-aos-duration='1400' className='flex items-center z-10'>
                <CustomSelectMultiple
                  options={skills.map(skill => ({ label: skill.name, value: skill.id }))}
                  value={data.skill_id}
                  onChange={(value) => setData(prevData => ({ ...prevData, skill_id: value }))}
                  label="Habilidades"
                  error={errors.skill_id}
                  multiple
                />
              </div>
            </div>

            <div data-aos="fade-right" data-aos-duration='1600' className="relative">
              <textarea
                id="description"
                name="description"
                rows="4"
                value={data.description}
                onChange={handleChange}
                required
                className="peer pl-0 p-3 mt-5 pt-0 w-full border-b-2 border-t-0 border-l-0 border-r-0 border-[#757575] bg-transparent
                          focus:outline-none focus:ring-0 focus:border-[#2c2c2c] dark:focus:border-[#A9A9A9] dark:border-white dark:bg-transparent dark:text-white
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

            <div className='flex gap-4 md:gap-6'>
              <div data-aos="fade-right" data-aos-duration='2000' className="relative flex-grow">
                <input
                  type="text"
                  id="urlGitHub"
                  name="urlGitHub"
                  value={data.urlGitHub || ''}
                  onChange={handleChange}
                  required
                  className="peer pl-0 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 border-[#757575] bg-transparent
                  focus:outline-none focus:ring-0 focus:border-[#2c2c2c] dark:focus:border-[#A9A9A9] dark:border-white dark:bg-transparent dark:text-white
                  placeholder-transparent focus:placeholder-gray-500 peer-focus:placeholder-gray-500 transition-colors duration-300 ease-in-out"
                  placeholder="http://"
                />
                <label
                  htmlFor="urlGitHub"
                  className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200
                  transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  URL GitHub
                </label>
              </div>

              <div data-aos="fade-left" data-aos-duration='2000' className="relative flex-grow" >
                <input
                  type="text"
                  id="urlSitio"
                  name="urlSitio"
                  value={data.urlSitio || ''}
                  onChange={handleChange}
                  required
                  className="peer pl-0 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 border-[#757575] bg-transparent
                  focus:outline-none focus:ring-0 focus:border-[#2c2c2c] dark:focus:border-[#A9A9A9] dark:border-white dark:bg-transparent dark:text-white
                  placeholder-transparent focus:placeholder-gray-500 peer-focus:placeholder-gray-500 transition-colors duration-300 ease-in-out"
                  placeholder="http://"
                />
                <label
                  htmlFor="urlSitio"
                  className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200
                          transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                          peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  URL Sitio
                </label>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-duration='2300'>
              <button
                onClick={handleOpenDetails}
                className="w-full flex flex-grow md:flex-grow-0 justify-center items-center gap-2 bg-[#757575] dark:bg-[#ffffff63] text-white dark:text-black
                          font-bold px-4 py-4 rounded-lg transition-all duration-500 ease-in-out hover:bg-[#b6b6b6c2] hover:text-black dark:hover:bg-white text-xl"
              >
                Detalles
              </button>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <TextInput
                id="title"
                name="title"
                value={data.title}
                onChange={handleChange}
                required
                label='Titulo'
                placeholder=""
                darkMode={darkMode}
                aos='fade-right'
                aosDuration='1400'
              />

              <div data-aos="fade-left" data-aos-duration='1400' className='flex items-center z-10'>

                <CustomSelectMultiple
                  options={skills.map(skill => ({ label: skill.name, value: skill.id }))}
                  value={data.skill_id}
                  onChange={(value) => setData(prevData => ({ ...prevData, skill_id: value }))}
                  label="Habilidades"
                  error={errors.skill_id}
                  multiple
                />

                <button
                  onClick={(e) => handleOpenAddSkillModal(e)}
                  className="md:hidden absolute right-8 top-5 w-fit h-fit flex flex-grow md:flex-grow-0 justify-center items-center gap-2 bg-white dark:bg-transparent text-white 
                  dark:text-[#ffffff63] dark:hover:text-white font-bold px-1 py-1 rounded-full transition-all duration-500 ease-in-out hover:bg-[#b6b6b6c2] hover:text-black 
                   text-xl"
                >
                  <FontAwesomeIcon icon={faPlus} className='text-sm' />
                </button>
              </div>
            </div>

            <TextInput
              id="description"
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              label='Descripcion'
              placeholder=""
              textarea
              darkMode={darkMode}
              aos="fade-right"
              aosDuration='1600'
            />

            <div className='flex gap-4 md:gap-6'>

              <TextInput
                id="urlGitHub"
                name="urlGitHub"
                value={data.urlGitHub}
                onChange={handleChange}
                required
                label='URL GitHub'
                placeholder="http://"
                darkMode={darkMode}
                aos="fade-right"
                aosDuration='2000'
              />

              <TextInput
                id="urlSitio"
                name="urlSitio"
                value={data.urlSitio}
                onChange={handleChange}
                required
                label='URL Sitio'
                placeholder="http://"
                darkMode={darkMode}
                aos="fade-left"
                aosDuration='2000'
              />
            </div>

            <div data-aos="fade-up" data-aos-duration='2300'>
              <button
                onClick={handleOpenDetails}
                className="w-full flex flex-grow md:flex-grow-0 justify-center items-center gap-2 bg-[#757575] dark:bg-[#ffffff63] text-white dark:text-black
                          font-bold px-4 py-4 rounded-lg transition-all duration-500 ease-in-out hover:bg-[#b6b6b6c2] hover:text-black dark:hover:bg-white text-xl"
              >
                <FontAwesomeIcon icon={faListAlt} />
                Detalles
              </button>
            </div>
          </form>
        </div>
      </div>

      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*--------------------------------------------------------Modal de detalles---------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      
      <AddDetailsModal
        open={openDetails}
        onClose={handleCloseDetails}
        darkMode={darkMode}
        details={details}
        detailsOptions={detailsOptions}
        handleDetailChange={handleDetailChange}
        handleAddAdvantage={handleAddAdvantage}
        handleRemoveAdvantage={handleRemoveAdvantage}
        handleAddDescription={handleAddDescription}
        handleRemoveDescription={handleRemoveDescription}
        handleAddDetail={handleAddDetail}
        handleRemoveDetail={handleRemoveDetail}
        handleDescriptionChange={handleDescriptionChange}
        handleAdvantageChange={handleAdvantageChange}
        isMobile={isMobile}
      />     

      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*--------------------------------------------------------------Snackbar------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}

      <Snackbar
        className='mt-12'
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </AuthenticatedLayout>
  );
};

export default EditProject;