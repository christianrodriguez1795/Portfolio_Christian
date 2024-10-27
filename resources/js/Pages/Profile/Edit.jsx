import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-black dark:text-white font-semibold text-xl leading-tight">Perfil</h2>}
        >
            <Head title="Profile" />

            <div className="md:p-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className='w-full flex flex-col md:flex-row gap-6'>
                        <div className="p-4 sm:p-8 bg-white bg-opacity-0 dark:bg-[#2c2c2c] dark:bg-opacity-0 border border-gray-300 dark:border-opacity-0 shadow-md  sm:rounded-lg flex flex-col flex-grow">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl flex-grow flex flex-col"
                            />
                        </div>

                        <div className="p-4 sm:p-8 bg-white bg-opacity-0 border border-gray-300 dark:border-opacity-0 shadow-md  sm:rounded-lg flex-grow">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 bg-white bg-opacity-0 border border-gray-300 dark:border-opacity-0 shadow-md sm:rounded-lg">
                        <DeleteUserForm className="w-full" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
