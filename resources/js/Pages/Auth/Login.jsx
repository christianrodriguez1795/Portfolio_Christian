import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEye, faEyeSlash, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from '@mui/material/styles';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();

    const getPreferredTheme = () => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            return localTheme === 'dark';
        } else {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    };

    const [darkMode, setDarkMode] = useState(getPreferredTheme);

    useEffect(() => {
        const matchDark = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (!localStorage.getItem('theme')) {
                setDarkMode(e.matches);
            }
        };
        matchDark.addEventListener('change', handleChange);

        return () => matchDark.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Iniciar sesión" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit} className=''>
                <div className="flex justify-center my-6 ">
                    <WorkOutlineIcon style={{ fontSize: 96 }} className='text-black dark:text-white' />
                </div>

                <div>
                    <div className="relative flex items-center bg-transparent">
                        <FontAwesomeIcon icon={faUser} className="absolute left-3 text-gray-700 dark:text-white" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            className="peer pl-10 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 border-black 
                            focus:outline-none focus:ring-0 focus:border-gray-300 dark:border-white bg-transparent dark:text-white 
                            placeholder-transparent"
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-10 top-5 text-gray-700 dark:text-white transition-all duration-200 
                            transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Correo Electrónico
                        </label>
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 relative flex items-center">
                    <FontAwesomeIcon icon={faLock} className="absolute left-3 text-gray-700 dark:text-white" />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        className="peer pl-10 p-3 pt-5 w-full border-b-2 border-t-0 border-l-0 border-r-0 border-black 
                        focus:outline-none focus:ring-0 focus:border-gray-300 dark:border-white bg-transparent dark:text-white 
                        placeholder-transparent"
                        placeholder=" "
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-10 top-5 text-gray-700 dark:text-white transition-all duration-200 
                        transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Contraseña
                    </label>
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-0 top-5 text-gray-700 dark:text-white focus:outline-none"
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex justify-between items-center mt-4">
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                sx={{
                                    color: darkMode ? 'white' : 'black',
                                    '&.Mui-checked': {
                                        color: darkMode ? '#4caf50' : '#ff5722',  // Cambia el color del checkbox marcado
                                    },
                                    '& .MuiSvgIcon-root': {
                                        fill: darkMode ? 'white' : 'black',  // Cambia el color del ícono SVG
                                    },
                                }}
                            />
                        }
                        label="Recuérdame"
                        className="text-sm text-gray-600 dark:text-white"
                    />
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 dark:text-white hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}
                </div>

                <div className="flex items-center justify-end mt-4">


                    <button
                        type="submit"
                        className="flex flex-grow  items-center justify-center px-4 py-4 font-semibold text-white bg-black rounded-lg 
                        transition-colors duration-300 ease-in-out hover:bg-gray-800 dark:text-black dark:bg-white 
                        dark:hover:bg-gray-500"
                        disabled={processing}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        Iniciar sesión
                    </button>
                </div>
            </form>

        </GuestLayout>
    );
}
