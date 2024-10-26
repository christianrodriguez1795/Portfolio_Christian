import { Box, IconButton, Modal, Typography } from '@mui/material';
import React from 'react';
import TextInput from '../Inputs/TextInput';
import CustomSelectMultiple from '../Inputs/CustomSelectMultiple';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';

const AddDetailsModal = ({
    open,
    onClose,
    darkMode,
    details,
    detailsOptions,
    handleDetailChange,
    handleAddAdvantage,
    handleRemoveAdvantage,
    handleAddDescription,
    handleRemoveDescription,
    handleAddDetail,
    handleRemoveDetail,
    handleDescriptionChange,
    handleAdvantageChange,
    handleCloseDetails,
    isMobile
}) => {
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '100%' : '60%',
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
                    Agregar Detalles
                </Typography>
                <div
                    className={`overflow-y-auto scrollbarModal ${darkMode ? 'scrollbarModal-dark' : 'scrollbarModal-light'}`}
                    style={{ minHeight: '70vh', maxHeight: '70vh', overflowY: 'auto', padding: '16px' }}
                >
                    {details.map((detail, detailIndex) => (
                        <div key={`${detail.category}-${detail.type}-${detailIndex}`}
                            className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 mb-4 bg-[#e4e4e4] dark:bg-[#414141] rounded-lg p-5">
                            <div className="flex flex-col gap-4">
                                <CustomSelectMultiple
                                    key={`${detail.category}-${detail.type}-${detailIndex}`}
                                    options={detailsOptions.map((option) => ({ label: option.name, value: option.id }))}
                                    onChange={(value) => handleDetailChange(detailIndex, 'type', value[0], detail)}
                                    value={detail.type === '' ? null : [detail.type]}
                                    label="Seleccione el tipo de detalle"
                                    error={!!detail.error}
                                />

                                {detail.type === 2 ? (
                                    <>
                                        <TextInput
                                            id={`title-${detailIndex}`}
                                            name={`title${detailIndex}`}
                                            value={detail.title || ''}
                                            onChange={(e) => handleDetailChange(detailIndex, 'title', e.target.value, detail)}
                                            required
                                            label="Titulo"
                                            placeholder=""
                                            darkMode={darkMode}
                                        />
                                        <TextInput
                                            id={`description-${detailIndex}`}
                                            name={`description${detailIndex}`}
                                            value={detail.description}
                                            onChange={(e) => handleDescriptionChange(detailIndex, null, e.target.value)}
                                            required
                                            label="Descripcion"
                                            placeholder=""
                                            textarea
                                            darkMode={darkMode}
                                        />
                                        {detail.advantages.map((adv, advIndex) => (
                                            <TextInput
                                                key={advIndex}
                                                id={`title-${detailIndex}`}
                                                name={`title${detailIndex}`}
                                                value={adv}
                                                onChange={(e) => handleAdvantageChange(detailIndex, advIndex, e.target.value)}
                                                required
                                                label={`Ventaja ${advIndex + 1}`}
                                                placeholder=""
                                                darkMode={darkMode}
                                            >
                                                {detail.advantages.length > 1 && (
                                                    <IconButton
                                                        disableRipple
                                                        onClick={() => handleRemoveAdvantage(detailIndex, advIndex)}
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 10,
                                                            right: 0,
                                                            color: darkMode ? 'white' : '#757575',
                                                            transition: 'color 0.3s ease',
                                                            '&:hover': {
                                                                color: darkMode ? '#ff2929' : '#ff2929', // Cambia estos colores según tu preferencia
                                                            },
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faXmark} />
                                                    </IconButton>
                                                )}
                                            </TextInput>
                                        ))}
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => handleAddAdvantage(detailIndex)}
                                                className="md:w-fit md:h-fit text-white hover:text-black transition-all duration-500 mt-2 md:mt-4
                                                flex flex-grow md:flex-grow-0 justify-center items-center gap-2 bg-[#757575] dark:bg-[#ffffff63] 
                                                dark:text-black font-bold px-6 py-2 rounded-lg ease-in-out hover:bg-[#b6b6b6c2] 
                                                dark:hover:bg-white"
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                                <span>Añadir ventaja</span>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    detail.descriptions.map((desc, descIndex) => (
                                        <TextInput
                                            key={descIndex}
                                            id={`description-${detailIndex}`}
                                            name={`description${detailIndex}`}
                                            value={desc}
                                            onChange={(e) => handleDescriptionChange(detailIndex, descIndex, e.target.value)}
                                            required
                                            label={`Descripción ${descIndex + 1}`}
                                            placeholder=""
                                            textarea
                                            darkMode={darkMode}
                                        >
                                            {detail.descriptions.length > 1 && (
                                                <IconButton
                                                    disableRipple
                                                    onClick={() => handleRemoveDescription(detailIndex, descIndex)}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: -10,
                                                        right: 0,
                                                        color: darkMode ? 'white' : '#757575',
                                                        transition: 'color 0.3s ease',
                                                        '&:hover': {
                                                            color: darkMode ? '#ff2929' : '#ff2929', // Cambia estos colores según tu preferencia
                                                        },
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </IconButton>
                                            )}
                                        </TextInput>
                                    ))
                                )}

                                {detail.type !== 2 && (
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => handleAddDescription(detailIndex)}
                                            className="md:w-fit md:h-fit text-white hover:text-black transition-all duration-500 mt-2 
                                            md:mt-4 flex flex-grow md:flex-grow-0 justify-center items-center gap-2 bg-[#757575] 
                                            dark:bg-[#ffffff63] dark:text-black font-bold px-6 py-2 rounded-lg ease-in-out 
                                            hover:bg-[#b6b6b6c2] dark:hover:bg-white"
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                            <span>Añadir descripción</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {details.length > 1 && (
                                <button
                                    onClick={() => handleRemoveDetail(detailIndex)}
                                    className="md:w-fit md:h-fit text-white hover:text-red-500 dark:hover:text-red-500 
                                    transition-all duration-500 md:m-4 flex flex-grow md:flex-grow-0 justify-center items-center gap-2 
                                    bg-[#757575] dark:bg-[#ffffff63] dark:text-black font-bold px-6 py-2 rounded-lg ease-in-out 
                                    hover:bg-[#b6b6b6c2] dark:hover:bg-white"
                                >
                                    <FontAwesomeIcon icon={faTrash} size={isMobile ? '1x' : '2x'} />
                                    {isMobile && (
                                        <span>Borrar detalle</span>
                                    )}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <IconButton onClick={handleAddDetail}
                    sx={{
                        position: 'absolute',
                        top: 26,
                        left: 30,
                        color: darkMode ? 'white' : '#757575'
                    }}>
                    <FontAwesomeIcon icon={faPlus} />
                </IconButton>
                <IconButton onClick={onClose}
                    disableRipple
                    sx={{
                        position: 'absolute',
                        top: 26,
                        right: 30,
                        color: darkMode ? 'white' : '#757575',
                        transition: 'color 0.3s ease',
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
                <div className="flex justify-center items-center flex-grow">
                    <button
                        onClick={onClose}
                        className="md:w-fit h-fit flex flex-grow md:flex-grow-0 justify-center items-center gap-2 bg-[#757575] 
                        dark:bg-[#ffffff63] text-white dark:text-black font-bold px-6 py-2 rounded-lg transition-all 
                        duration-500 ease-in-out hover:bg-[#b6b6b6c2] hover:text-black dark:hover:bg-white"
                    >
                        <FontAwesomeIcon icon={faSave} />
                        Guardar Detalles
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default AddDetailsModal;
