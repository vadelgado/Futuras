import { Link, Head } from "@inertiajs/react";
import Header from "@/Components/DashBoard/Header";
import Gallery from "@/Components/Gallery";
import Footer from "@/Components/Footer";

export default function Show({ auth, sede, galeriaSedes }) {
    return (
        <>
            <Head title={sede.nombre} />
            <Header auth={auth} />
            <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
            <div className="relative min-h-screen mt-24 antialiased bg-gray-100 bg-center dark:bg-gray-900 bg-dots-darker dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
                <div className="p-4 mx-auto max-w-7xl lg:p-8">
                    <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <div className="p-6">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white animate__animated animate__fadeInDown">
                                {sede.nombre}
                            </h2>
                            {sede.imagen && (
                                <div className="mb-4">
                                    <img
                                        src={`/storage/${sede.imagen}`}
                                        alt={sede.nombre}
                                        className="object-contain w-full h-auto rounded max-h-96 animate__animated animate__fadeIn"
                                    />
                                </div>
                            )}

                            <div className="space-y-4 animate__animated animate__fadeInUp">
                                <p className="text-gray-800 dark:text-gray-300">
                                    <strong>Dirección:</strong> {sede.direccion}
                                </p>
                                <p className="text-gray-800 dark:text-gray-300">
                                    <strong>Teléfono:</strong>{" "}
                                    <a
                                        href={`tel:${sede.telefono}`}
                                        className="text-blue-500 underline"
                                    >
                                        {sede.telefono}
                                    </a>
                                </p>
                                {sede.telefonoDos && (
                                    <p className="text-gray-800 dark:text-gray-300">
                                        <strong>Teléfono 2:</strong>{" "}
                                        <a
                                            href={`tel:${sede.telefonoDos}`}
                                            className="text-blue-500 underline"
                                        >
                                            {sede.telefonoDos}
                                        </a>
                                    </p>
                                )}
                                {sede.telefonoTres && (
                                    <p className="text-gray-800 dark:text-gray-300">
                                        <strong>Teléfono 3:</strong>{" "}
                                        <a
                                            href={`tel:${sede.telefonoTres}`}
                                            className="text-blue-500 underline"
                                        >
                                            {sede.telefonoTres}
                                        </a>
                                    </p>
                                )}
                                <p className="text-gray-800 dark:text-gray-300">
                                    <strong>Email:</strong>{" "}
                                    <a
                                        href={`mailto:${sede.email}`}
                                        className="text-blue-500 underline"
                                    >
                                        {sede.email}
                                    </a>
                                </p>
                                <p className="text-gray-800 dark:text-gray-300">
                                    <strong>Encargado:</strong> {sede.encargado}
                                </p>
                                <p className="text-gray-800 dark:text-gray-300">
                                    <strong>Coordenadas:</strong>{" "}
                                    <a
                                        href={sede.coordenadas}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        Ver en Google Maps
                                    </a>
                                </p>
                                <p className="text-gray-800 dark:text-gray-300">
                                    <strong>Días de la Semana:</strong>{" "}
                                    {sede.diasSemana}
                                </p>
                                <p className="text-gray-800 dark:text-gray-300">
                                    <strong>Horario:</strong> {sede.horario}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 animate__animated animate__fadeInUp">
                        <Gallery gallery={galeriaSedes} />
                    </div>
                </div>
            </div>
            </main>
            </div>
            <Footer auth={auth} />

            <style>{`
                .antialiased {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
