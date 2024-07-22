import { Link, Head } from "@inertiajs/react";
import Header from "@/Components/DashBoard/Header";
import Gallery from "@/Components/Gallery";
import Footer from "@/Components/Footer";


export default function Welcome({ auth, noticias, galeriaNoticias }) {
    return (
        <>
            <Head title={noticias.titulo} />
            <Header auth={auth}></Header>
            <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
            <div className="relative min-h-screen antialiased bg-gray-100 bg-center mt-36 sm:flex sm:justify-center sm:items-center dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="p-6 mx-auto max-w-7xl lg:p-8">
                    <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                        <img
                            src={`/storage/${noticias.imagenPortada}`}
                            alt="Portada de la noticia"
                            className="object-cover w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-104 2xl:h-112"
                        />
                        <div className="p-6">
                            <h2 className="mb-2 text-2xl subpixel-antialiased font-bold text-gray-800 sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">
                                {noticias.titulo}
                            </h2>
                            <p className="mb-4 text-base subpixel-antialiased text-gray-700 sm:text-sm md:text-base lg:text-base xl:text-base">
                                {new Date(noticias.created_at).toLocaleDateString()}
                            </p>
                            <p className="text-base subpixel-antialiased text-gray-700 whitespace-pre-wrap sm:text-sm md:text-base lg:text-base xl:text-base">
                                {noticias.contenido}
                            </p>
                            <div className="flex mt-4 space-x-4">
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                                >
                                    <i className="mr-2 fa-brands fa-whatsapp"></i>
                                    Compartir en WhatsApp
                                </a>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    <i className="mr-2 fa-brands fa-facebook"></i>
                                    Compartir en Facebook
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Gallery gallery={galeriaNoticias} />
                    </div>
                </div>
            </div>
            </main>
            </div>
            <Footer auth={auth}/>

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
