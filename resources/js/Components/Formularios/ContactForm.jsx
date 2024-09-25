import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Tooltip } from '@mui/material';

const ContactForm = ({ setSnackbar }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        // Clear errors when user starts typing
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const validateForm = () => {
        const newErrors = {};

        // Basic validation checks
        if (!form.name) newErrors.name = 'El nombre es requerido';
        if (!form.email) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'El correo electrónico no es válido';
        }
        if (!form.subject) newErrors.subject = 'El asunto es requerido';
        if (!form.message) newErrors.message = 'El mensaje es requerido';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            axios.post('/contact', form)
                .then(response => {
                    setSnackbar({
                        open: true,
                        message: response.data.success,
                        severity: 'success'
                    });
                    setForm({ name: '', email: '', subject: '', message: '' });
                })
                .catch(error => {
                    setSnackbar({
                        open: true,
                        message: error.response.data.error,
                        severity: 'error'
                    });
                });
        }
    };

    return (
        <div className="w-full max-w-2xl px-6 md:px-6 py-0">
            <form onSubmit={handleSubmit} noValidate className="w-full">
                <div data-aos="fade-right" className='w-full flex flex-col md:flex-row gap-4'>
                    <div data-aos="fade-right" className="relative flex-grow overflow-x-hidden">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className={`peer pl-0 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-black'} 
                        focus:outline-none focus:ring-0 focus:border-gray-300 dark:border-white dark:bg-black dark:text-white 
                        placeholder-transparent`}
                            placeholder=" "
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                        transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-6 whitespace-nowrap"
                        >
                            Nombre
                        </label>
                        {errors.name && (
                            <Tooltip title={errors.name} arrow placement="top-end">
                                <FontAwesomeIcon icon={faExclamationCircle} className="absolute right-0 top-[23px] text-red-600" />
                            </Tooltip>
                        )}

                    </div>
                    <div data-aos="fade-left" className="relative flex-grow overflow-x-hidden">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={`peer pl-0 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-black'} 
                        focus:outline-none focus:ring-0 focus:border-gray-300 dark:border-white dark:bg-black dark:text-white 
                        placeholder-transparent`}
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                        transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-6 whitespace-nowrap"
                        >
                            Correo Electrónico
                        </label>

                        {errors.email && (
                            <Tooltip title={errors.email} arrow placement="top-end">
                                <FontAwesomeIcon icon={faExclamationCircle} className="absolute right-0 top-[23px] text-red-600" />
                            </Tooltip>
                        )}
                    </div>
                </div>
                <div data-aos="fade-right" className="relative mt-4 overflow-x-hidden">
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={`peer pl-0 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 ${errors.subject ? 'border-red-500 dark:border-red-500' : 'border-black'} 
                        focus:outline-none focus:ring-0 focus:border-gray-300 dark:border-white dark:bg-black dark:text-white 
                        placeholder-transparent`}
                        placeholder=" "
                    />
                    <label
                        htmlFor="subject"
                        className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                        transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-6 whitespace-nowrap"
                    >
                        Asunto
                    </label>
                    {errors.subject && (
                        <Tooltip title={errors.subject} arrow placement="top-end">
                            <FontAwesomeIcon icon={faExclamationCircle} className="absolute right-0 top-[23px] text-red-600" />
                        </Tooltip>
                    )}

                </div>
                <div data-aos="fade-left" className="relative mt-8">
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={form.message}
                        onChange={handleChange}
                        className={`peer pl-2 p-3 pt-4 w-full border-2 rounded-md ${errors.message ? 'border-red-500 dark:border-red-500' : 'border-black'} 
                        focus:outline-none focus:ring-0 focus:border-gray-300 dark:border-white dark:bg-black dark:text-white 
                        placeholder-transparent resize-none scrollbarGenerico scrollbarGenerico-light`}
                        placeholder=" "
                    />
                    <label
                        htmlFor="message"
                        className="rounded-md px-2 absolute left-3 -top-3 bg-white dark:bg-black text-gray-700 dark:text-gray-300 transition-all duration-200 
                        transform -translate-y-0 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-6 
                        peer-focus:scale-75 peer-focus:-translate-y-0 whitespace-nowrap"
                    >
                        Mensaje
                    </label>
                    {errors.message && (
                        <Tooltip title={errors.message} arrow placement="top-end">
                            <FontAwesomeIcon icon={faExclamationCircle} className="absolute right-[13px] top-[18px] text-red-600" />
                        </Tooltip>
                    )}

                </div>
                <button data-aos="fade-up"
                    type="submit"
                    className="mt-3 flex items-center justify-center w-full p-3 font-semibold text-white bg-black rounded-lg 
                    transition-colors duration-300 ease-in-out hover:bg-gray-800 hover:text-white dark:text-black dark:bg-white 
                    dark:hover:bg-gray-300"
                >
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
