import React, { useState, useCallback, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Typography, Box, Snackbar, Alert, Modal, IconButton, useMediaQuery } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faSave, faArrowLeft, faTrash, faPlus, faXmark, faInfoCircle, faInfo, faListAlt } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CustomSelectMultiple from '@/Components/Inputs/CustomSelectMultiple';
import axios from 'axios';
import { detailsOptions } from '@/Hooks/datosPorfolio';
import TextInput from '@/Components/Inputs/TextInput';
import AddSkillsModal from '@/Components/Modales/AddSkillsModal';
import AddDetailsModal from '@/Components/Modales/AddDetailsModal';

const CreateProject = ({ auth, skills }) => {
  const getPreferredTheme = () => localStorage.getItem('theme') === 'dark';

  const [darkMode, setDarkMode] = useState(getPreferredTheme());
  const [preview, setPreview] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openAddSkillModal, setOpenAddSkillModal] = useState(false);
  const [newSkills, setNewSkills] = useState(['']);
  const [skillsArray, setSkillsArray] = useState(skills);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [errors, setErrors] = useState({});
  const [details, setDetails] = useState([{ category: '', type: '', descriptions: [''] }]);
  const [data, setData] = useState({
    title: '',
    description: '',
    urlGitHub: '',
    urlSitio: '',
    image: null,
    skill_id: [],
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
      const response = await axios.post(route('projects.store'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const successMessage = response.data.success || 'Project created successfully.';
      setSnackbarMessage(successMessage);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setData({ title: '', description: '', urlGitHub: '', urlSitio: '', image: null, skill_id: [] });
      setPreview(null);
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

  // Función para abrir/cerrar el modal
  const handleOpenAddSkillModal = (e) => {
    e.preventDefault();
    setOpenAddSkillModal(true);
  }
  const handleCloseAddSkillModal = (e) => {
    e.preventDefault();
    setOpenAddSkillModal(false);
    setNewSkills(['']);
  };

  // Actualizar el valor de la habilidad en el array temporal
  const handleSkillChange = (index, value) => {
    setNewSkills(prevSkills => {
      const updatedSkills = [...prevSkills];
      updatedSkills[index] = value;
      return updatedSkills;
    });
  };

  const handleAddSkillInput = () => {
    setNewSkills(prevSkills => [...prevSkills, '']);
  };

  // Eliminar un campo de habilidad específico
  const handleRemoveSkill = (index) => {
    setNewSkills(prevSkills => prevSkills.filter((_, i) => i !== index));
  };

  // Enviar habilidades al servidor
  const handleSaveSkills = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/skills', { skills: newSkills });
      setSkillsArray(prevSkills =>
        [
          ...prevSkills,
          ...response.data.skills.map(skill => ({
            ...skill,
            name: skill.name.charAt(0).toUpperCase() + skill.name.slice(1).toLowerCase()
          }))
        ].sort((a, b) => a.name.localeCompare(b.name)) // Ordena alfabéticamente
      );
      setSnackbarMessage('Habilidades añadidas con éxito.');
      setSnackbarSeverity('success');
      handleCloseAddSkillModal(e);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
      setSnackbarMessage(`Error al añadir habilidades. Intenta nuevamente. ${errorMessage}`);
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  }; 

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="text-[#757575] dark:text-white font-semibold text-xl leading-tight">Añadir proyecto</h2>}>
      <Head title="Añadir proyecto" />

      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*------------------------------------------------------Formulario de proyecto------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      <div className="max-w-3xl mx-auto p-6">
        <div className='bg-white bg-opacity-0 md:p-5 rounded-lg relative '>
          <form data-aos="fade-down" onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-4 ">
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

              <div data-aos="fade-down" data-aos-duration='1400'>
                <button
                  onClick={(e) => handleOpenAddSkillModal(e)}
                  className="hidden md:flex md:flex-grow-0 justify-center items-center gap-2 bg-[#757575] dark:bg-[#ffffff63] text-white dark:text-black
                          font-bold px-4 py-[6px] rounded-lg transition-all duration-500 ease-in-out hover:bg-[#b6b6b6c2] hover:text-black dark:hover:bg-white "
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Añadir habilidad
                </button>
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
              <Box  {...getRootProps()} sx={{
                border: '2px dashed #cccccc',
                padding: '16px',
                borderRadius: '4px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: preview ? 'transparent' : darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
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
                  options={skillsArray.map(skill => ({ label: skill.name, value: skill.id }))}
                  value={data.skill_id}
                  onChange={(value) => setData(prevData => ({ ...prevData, skill_id: value }))}
                  label="Habilidades"
                  error={errors.skill_id}
                  multiple
                />

                <button
                  onClick={(e) => handleOpenAddSkillModal(e)}
                  className="md:hidden absolute right-8 top-5 w-fit h-fit flex flex-grow md:flex-grow-0 justify-center items-center gap-2 bg-white dark:bg-transparent text-[#757575]
                  dark:text-[#ffffff63] dark:hover:text-white font-bold px-1 py-1 rounded-full transition-all duration-500 ease-in-out hover:text-black 
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
      {/*------------------------------------------------------Modal de habilidades--------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}
      {/*----------------------------------------------------------------------------------------------------------------------------------------*/}

      <AddSkillsModal
        open={openAddSkillModal}
        onClose={handleCloseAddSkillModal}
        newSkills={newSkills}
        darkMode={darkMode}
        handleSkillChange={handleSkillChange}
        handleRemoveSkill={handleRemoveSkill}
        handleAddSkillInput={handleAddSkillInput}
        handleCloseAddSkillModal={handleCloseAddSkillModal}
        handleSaveSkills={handleSaveSkills}
        isMobile={isMobile}
      />

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
        // sx={{ zIndex: 9999 }}
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