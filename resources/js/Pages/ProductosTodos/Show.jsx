import { Link, Head } from "@inertiajs/react";
import Header from "@/Components/DashBoard/Header";
import Gallery from "@/Components/Gallery";
import Footer from "@/Components/Footer";

export default function Show({ auth, producto, galeriaProductos }) {
    const productUrl = window.location.href;
    const whatsappMessage = `Hola, estoy interesado en el producto ${producto.nombre}. Puedes darme más información? ${productUrl}`;
    const whatsappNumber = "+573183773718";

    return (
        <>
            <Head title={producto.nombre} />
            <Header auth={auth} />
            <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
            <div className="relative min-h-screen antialiased bg-gray-100 bg-center mt-36 dark:bg-gray-900 bg-dots-darker dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
                <div className="p-6 mx-auto max-w-7xl lg:p-8">
                    <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-1/2">
                                <img
                                    src={`/storage/${producto.imagen}`}
                                    alt={producto.nombre}
                                    className="object-cover w-full h-64 transition-transform duration-300 lg:h-full hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col justify-between p-6 lg:w-1/2">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                                        {producto.nombre}
                                    </h2>
                                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                                        {producto.descripcion}
                                    </p>
                                    <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                        {producto.precio.toLocaleString(
                                            "es-CO",
                                            {
                                                style: "currency",
                                                currency: "COP",
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            }
                                        )}{" "}
                                        (COP)
                                    </p>

                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                                        Stock: {producto.stock}
                                    </p>
                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                                        Categoría: {producto.categoria}
                                    </p>
                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                                        Especificaciones:{" "}
                                        {producto.tipoEspecificaciones} -{" "}
                                        {producto.valorEspecificaciones}
                                    </p>
                                </div>
                                <div className="flex justify-center mt-6 lg:mt-0">
                                    <a
                                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                                            whatsappMessage
                                        )}`}
                                        target="_blank"
                                        className="inline-flex items-center px-4 py-2 font-semibold text-white transition-transform duration-300 transform bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 hover:scale-105"
                                    >
                                        <i className="mr-2 fa-brands fa-whatsapp"></i>
                                        Preguntar por WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Gallery gallery={galeriaProductos} />
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
