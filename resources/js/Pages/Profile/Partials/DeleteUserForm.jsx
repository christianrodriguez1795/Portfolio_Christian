import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Eliminar Cuenta</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-200">
                    Una vez que tu cuenta sea eliminada, todos sus recursos y datos se eliminarán de forma permanente. Antes
                    de eliminar tu cuenta, descarga cualquier dato o información que desees conservar.
                </p>
            </header>

            <button
                onClick={confirmUserDeletion}
                className="px-4 py-[6px] bg-red-600 text-white dark:bg-red-800 dark:text-white hover:bg-red-700 
                dark:hover:bg-red-900 flex items-center mt-4 rounded-[4px] uppercase text-[14px]"
            >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                Eliminar Cuenta
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal} >
                <form onSubmit={deleteUser} className="p-6 bg-white dark:bg-gray-900 border dark:border-white border-gray-300 shadow-md  sm:rounded-lg">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                        ¿Estás seguro de que deseas eliminar tu cuenta?
                    </h2>

                    <p className="w-full mt-1 text-sm text-gray-600 dark:text-gray-200">
                        Una vez que tu cuenta sea eliminada, todos sus recursos y datos se eliminarán de forma permanente.
                        Por favor, ingresa tu contraseña para confirmar que deseas eliminar tu cuenta de forma permanente.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Contraseña" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="Contraseña"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 6 }}>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-[6px] bg-black text-white dark:bg-white dark:text-black hover:bg-gray-700 
                            dark:hover:bg-gray-200 flex items-center rounded-[4px] uppercase text-[14px]"
                        >
                            {/* <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> */}
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-[6px] bg-red-600 text-white dark:bg-red-600 dark:text-white hover:bg-red-700 
                            dark:hover:bg-red-700 flex items-center rounded-[4px] uppercase text-[14px]"
                            disabled={processing}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                            Eliminar Cuenta
                        </button>
                    </Box>
                </form>
            </Modal>
        </section>
    );
}
