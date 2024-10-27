import React from 'react';
import InputError from '@/Components/InputError';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Información del Perfil</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-200">
                    Actualiza la información del perfil de tu cuenta y la dirección de correo electrónico.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6 flex flex-col flex-grow justify-between">
                <div className='flex-grow'>
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            className="peer pl-0 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 
                            focus:outline-none focus:ring-0 border-black focus:border-gray-300 dark:focus:border-gray-300 
                            dark:border-white bg-transparent dark:text-white 
                            placeholder-transparent"
                            placeholder=" "
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                            transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Nombre
                        </label>
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="relative flex-grow mt-4">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            className="peer pl-0 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0  
                            focus:outline-none focus:ring-0 border-black focus:border-gray-300 dark:focus:border-gray-300 
                            dark:border-white bg-transparent dark:text-white 
                            placeholder-transparent"
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-0 top-5 text-gray-700 dark:text-gray-300 transition-all duration-200 
                            transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Correo Electrónico
                        </label>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-gray-800">
                                Tu dirección de correo electrónico no está verificada.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Haz clic aquí para reenviar el correo electrónico de verificación.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 font-medium text-sm text-green-600">
                                    Se ha enviado un nuevo enlace de verificación a tu dirección de correo electrónico.
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <Box sx={{ display: 'flex', gap: 3 }}>                    

                    <button
                        type="submit"
                        className="flex md:flex-grow-0 justify-center items-center gap-2 bg-[#757575] dark:bg-[#ffffff63] text-white dark:text-black
                          font-bold px-4 py-[6px] rounded-lg transition-all duration-500 ease-in-out hover:bg-[#b6b6b6c2] hover:text-black dark:hover:bg-white "
                    >
                        <FontAwesomeIcon icon={faSave} />
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
