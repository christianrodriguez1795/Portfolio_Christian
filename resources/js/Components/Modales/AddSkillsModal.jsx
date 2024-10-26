import { Box, IconButton, Modal, Typography } from '@mui/material';
import React from 'react';
import TextInput from '../Inputs/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';

const AddSkillsModal = ({
    open,
    onClose,
    newSkills,
    darkMode,
    handleSkillChange,
    handleRemoveSkill,
    handleAddSkillInput,
    handleCloseAddSkillModal,
    handleSaveSkills,
    isMobile
}) => {
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '100%' : '40%',
        maxHeight: '100%',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...modalStyle, backgroundColor: darkMode ? '#2c2c2c' : 'white' }}>
                <Typography variant="h6" textAlign="center" color={darkMode ? 'white' : 'black'}>
                    Añadir Tecnologia
                </Typography>
                <div
                    className={`overflow-y-auto scrollbarModal ${darkMode ? 'scrollbarModal-dark' : 'scrollbarModal-light'}`}
                    style={{ minHeight: '40vh', maxHeight: '70vh', overflowY: 'auto', padding: '16px' }}
                >
                    <div className="flex flex-col gap-4">
                        {newSkills.map((skill, index) => (
                            <TextInput
                                key={index}
                                id={`skill-${index}`}
                                name={`skill${index}`}
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                                required
                                label={`Habilidad ${index + 1}`}
                                placeholder=""
                                darkMode={darkMode}
                            >
                                {newSkills.length > 1 && (
                                    <IconButton
                                        onClick={() => handleRemoveSkill(index)}
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            marginTop: 2,
                                            color: darkMode ? 'white' : '#757575',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </IconButton>
                                )}
                            </TextInput>
                        ))}

                        <div className="flex justify-center">
                            <button
                                onClick={handleAddSkillInput}
                                className="flex md:flex-grow-0 justify-center items-center gap-2 bg-black dark:bg-[#ffffff63] text-white dark:text-black
                  font-bold px-4 py-[6px] rounded-lg transition-all duration-500 ease-in-out hover:bg-[#b6b6b6c2] hover:text-black dark:hover:bg-white"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                Añadir habilidad
                            </button>
                        </div>
                    </div>
                </div>

                <IconButton
                    onClick={handleCloseAddSkillModal}
                    disableRipple
                    sx={{
                        position: 'absolute',
                        top: 26,
                        right: 30,
                        transition: 'color 0.3s ease',
                        color: darkMode ? 'white' : '#757575',
                        '&:hover': {
                            color: darkMode ? '#ff2929' : '#ff2929', // Cambia estos colores según tu preferencia
                        },  
                    }}
                    TouchRippleProps={{
                        style: { color: darkMode ? '#0000' : '#0000ff' }, // Color del ripple
                    }}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </IconButton>
                <div className="flex justify-center items-center flex-grow bg-[#0000]">
                    <button
                        onClick={handleSaveSkills}
                        className="md:w-fit h-fit flex flex-grow md:flex-grow-0 justify-center items-center gap-2 bg-black dark:bg-[#ffffff63] text-white dark:text-black
              font-bold px-6 py-2 rounded-lg transition-all duration-500 ease-in-out hover:bg-[#b6b6b6c2] hover:text-black dark:hover:bg-white"
                    >
                        <FontAwesomeIcon icon={faSave} />
                        <span className="text-base">Guardar</span>
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default AddSkillsModal;
