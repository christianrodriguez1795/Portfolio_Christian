import React, { useRef, useState } from 'react';
import { Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEye, faEyeSlash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Box from '@mui/material/Box';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPasswordConfirmation = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation);
    };

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Actualizar Contraseña</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-200">
                    Asegúrate de que tu cuenta esté utilizando una contraseña larga y aleatoria para mantener la seguridad.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6 flex flex-col flex-grow justify-between">
                <div className='flex-grow'>
                    <div className="relative flex-grow">
                        <input
                            type="password"
                            id="current_password"
                            name="current_password"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            required
                            className="peer pl-0 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 
                            focus:outline-none focus:ring-0 border-black focus:border-gray-300 dark:focus:border-gray-300 
                            dark:border-white bg-transparent dark:text-white 
                            placeholder-transparent"
                            placeholder=" "
                        />
                        <label
                            htmlFor="current_password"
                            className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                            transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Contraseña Actual
                        </label>
                        {errors.current_password && (
                            <Tooltip title={errors.current_password} arrow placement="top-end">
                                <FontAwesomeIcon icon={faExclamationCircle} className="absolute right-0 top-[23px] text-red-600" />
                            </Tooltip>
                        )}
                    </div>

                    <div className="relative flex-grow mt-4">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            className="peer pl-0 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 
                            focus:outline-none focus:ring-0 border-black focus:border-gray-300 dark:focus:border-gray-300 
                            dark:border-white bg-transparent dark:text-white 
                            placeholder-transparent"
                            placeholder=" "
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                            transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Nueva Contraseña
                        </label>
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute right-0 top-5 text-black dark:text-white focus:outline-none"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                        {errors.password && (
                            <Tooltip title={errors.password} arrow placement="top-end" sx={{ backgroundColor: 'white' }}>
                                <FontAwesomeIcon icon={faExclamationCircle} className="absolute right-6 top-[23px] text-red-600" />
                            </Tooltip>
                        )}
                    </div>

                    <div className="relative flex-grow mt-4">
                        <input
                            type={showPasswordConfirmation ? 'text' : 'password'}
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                            className="peer pl-0 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 
                            focus:outline-none focus:ring-0 border-black focus:border-gray-300 dark:focus:border-gray-300 
                            dark:border-white bg-transparent dark:text-white 
                            placeholder-transparent"
                            placeholder=" "
                        />
                        <label
                            htmlFor="password_confirmation"
                            className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                            transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Confirmar Contraseña
                        </label>
                        <button
                            type="button"
                            onClick={toggleShowPasswordConfirmation}
                            className="absolute right-0 top-5 text-black dark:text-white focus:outline-none"
                        >
                            <FontAwesomeIcon icon={showPasswordConfirmation ? faEyeSlash : faEye} />
                        </button>
                        {errors.password_confirmation && (
                            <Tooltip title={errors.password_confirmation} arrow placement="top-end" >
                                <FontAwesomeIcon icon={faExclamationCircle} className="absolute right-6 top-[23px] text-red-600" />
                            </Tooltip>
                        )}
                    </div>
                </div>
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <button
                        type="submit"
                        className="px-4 py-[6px] bg-black text-white dark:bg-white dark:text-black hover:bg-[#A9A9A9] 
                        dark:hover:bg-gray-300 flex items-center mt-4 rounded-[4px] uppercase text-[14px]"
                    >
                        <FontAwesomeIcon icon={faSave} className="mr-2" />
                        Guardar
                    </button>

                    <div className="flex justify-center items-center">
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-200">Guardado.</p>
                        </Transition>
                    </div>
                </Box>

            </form>
        </section>
    );
}
