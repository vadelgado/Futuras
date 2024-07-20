import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Footer from "@/Components/Footer";
import { Link, useForm } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function Dashboard({ auth }) {
    const { post } = useForm();

    function handleLogout() {
        post(route('logout'));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Panel Principal</h2>}
        >
            <Head title="Panel" />

            <div className="flex flex-col min-h-screen">
                <main className="flex-grow">
                    <div className="py-8">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <h3 className="mb-4 text-lg font-semibold">Bienvenido, {auth.user.name}!</h3>
                                    <p className="mb-4">Estás conectado al Panel de Futuras Estrellas.</p>
                                    <p className="mb-4">Aquí puedes administrar información sobre noticias, productos, sedes y pagos de la escuela de fútbol.</p>
                                    <p>¡Explora y disfruta de la gestión fácil y rápida!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <Link href="/" className="p-6 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition transform hover:scale-105 duration-300">
                                <i className="fa-solid fa-house text-4xl mb-2"></i>
                                <p className="font-semibold">Inicio</p>
                            </Link>
                            <Link href={route('AdministradorNoticias.index')} className="p-6 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-105 duration-300">
                                <i className="fa-regular fa-newspaper text-4xl mb-2"></i>
                                <p className="font-semibold">Noticias</p>
                            </Link>
                            <Link href={route('AdministradorProductos.index')} className="p-6 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition transform hover:scale-105 duration-300">
                                <i className="fa-solid fa-store text-4xl mb-2"></i>
                                <p className="font-semibold">Productos</p>
                            </Link>
                            <Link href={route('AdministradorSedes.index')} className="p-6 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition transform hover:scale-105 duration-300">
                                <i className="fa-solid fa-map-location-dot text-4xl mb-2"></i>
                                <p className="font-semibold">Sedes</p>
                            </Link>
                            <Link href={route('AdministradorBanners.index')} className="p-6 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition transform hover:scale-105 duration-300">
                                <i className="fa-regular fa-images text-4xl mb-2"></i>
                                <p className="font-semibold">Banner Inicio</p>
                            </Link>
                            <Link href={route('profile.edit')} className="p-6 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition transform hover:scale-105 duration-300">
                                <i className="fa-solid fa-user text-4xl mb-2"></i>
                                <p className="font-semibold">Perfil</p>
                            </Link>
                            <div onClick={handleLogout} className="p-6 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition transform hover:scale-105 duration-300 cursor-pointer">
                                <i className="fa-solid fa-sign-out-alt text-4xl mb-2"></i>
                                <p className="font-semibold">Cerrar Sesión</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer auth={auth} />
        </AuthenticatedLayout>
    );
}
