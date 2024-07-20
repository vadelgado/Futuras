import { Link, Head } from "@inertiajs/react";
import React, { useState } from "react";
import Header from "@/Components/DashBoard/Header";
import Footer from "@/Components/Footer";

export default function Index({ auth, sedes }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSedes = sedes.filter((sede) =>
        sede.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Head title="Futuras Estrellas - Sedes" />
            <Header auth={auth} />
            <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
            <div className="relative min-h-screen bg-gray-100 bg-center mt-36 sm:flex sm:justify-center sm:items-center bg-dots-darker dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="p-6 mx-auto max-w-7xl lg:p-8">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredSedes.map((sede) => (
                            <Link key={sede.id} href={`/sede/${sede.id}`} className="block">
                                <div className="flex flex-col h-full overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:scale-105 hover:shadow-2xl">
                                    <img
                                        src={`/storage/${sede.imagen}`}
                                        alt={sede.nombre}
                                        className="object-contain w-full h-auto rounded-t-lg max-h-72"
                                        style={{ maxHeight: "300px" }}
                                    />
                                    <div className="flex flex-col justify-between flex-1 p-6">
                                        <div>
                                            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                                {sede.nombre}
                                            </h2>
                                            <p className="mb-4 text-gray-700 dark:text-gray-300">
                                                {sede.direccion}
                                            </p>
                                            <p className="mb-2 text-gray-700 dark:text-gray-300">
                                                <strong>Teléfonos:</strong>{" "}
                                                <a href={`tel:${sede.telefono}`} className="text-blue-500 hover:underline">
                                                    {sede.telefono}
                                                </a>
                                                {sede.telefonoDos && (
                                                    <span>
                                                        ,{" "}
                                                        <a href={`tel:${sede.telefonoDos}`} className="text-blue-500 hover:underline">
                                                            {sede.telefonoDos}
                                                        </a>
                                                    </span>
                                                )}
                                                {sede.telefonoTres && (
                                                    <span>
                                                        ,{" "}
                                                        <a href={`tel:${sede.telefonoTres}`} className="text-blue-500 hover:underline">
                                                            {sede.telefonoTres}
                                                        </a>
                                                    </span>
                                                )}
                                            </p>
                                            <p className="mb-2 text-gray-700 dark:text-gray-300">
                                                <strong>Email:</strong>{" "}
                                                <a href={`mailto:${sede.email}`} className="text-blue-500 hover:underline">
                                                    {sede.email}
                                                </a>
                                            </p>
                                            <p className="mb-2 text-gray-700 dark:text-gray-300">
                                                <strong>Encargado:</strong> {sede.encargado}
                                            </p>
                                            <p className="mb-2 text-gray-700 dark:text-gray-300">
                                                <strong>Coordenadas:</strong>{" "}
                                                <a href={`${sede.coordenadas}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                    Google Maps
                                                </a>
                                            </p>
                                            <p className="mb-2 text-gray-700 dark:text-gray-300">
                                                <strong>Días de la Semana:</strong> {sede.diasSemana}
                                            </p>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <strong>Horario:</strong> {sede.horario}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            </main>
            </div>
            <Footer auth={auth} />

            <style>{`
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
