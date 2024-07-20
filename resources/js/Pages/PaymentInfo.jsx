import { Head } from "@inertiajs/react";
import Header from "@/Components/DashBoard/Header";
import React from "react";
import Footer from "@/Components/Footer";

export default function PaymentInfo({ auth }) {
    return (
        <>
            <Head title="Futuras Estrellas - Canales de Pago" />
            <Header auth={auth} />
            <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
            <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800 mt-36">
                    <h1 className="mb-4 text-3xl font-bold text-center text-gray-900 dark:text-white">
                        Canales de Ahorro y Pagos Digitales
                    </h1>
                    <div className="flex items-center justify-center mb-4">
                        <img src="/images/warning.webp" alt="Advertencia" className="w-16 h-16 mr-2" />
                        <p className="font-bold text-center text-red-500 dark:text-red-400">
                            Advertencia: Estos son los únicos medios de pago oficiales. Asegúrese de enviar el comprobante con el motivo del pago para su validez.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="p-4 transition-transform transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:scale-105">
                            <img src="/images/davivienda.webp" alt="Davivienda" className="w-48 h-24 mx-auto" />
                            <p className="mt-2 text-center text-gray-900 dark:text-white">Cuenta Ahorros: <strong>346100000402</strong></p>
                        </div>
                        <div className="p-4 transition-transform transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:scale-105">
                            <img src="/images/bbva.webp" alt="BBVA" className="w-48 h-24 mx-auto" />
                            <p className="mt-2 text-center text-gray-900 dark:text-white">Cuenta Ahorros: <strong>445193220</strong></p>
                        </div>
                        <div className="p-4 transition-transform transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:scale-105">
                            <img src="/images/daviplata.webp" alt="Daviplata" className="w-12 h-12 mx-auto" />
                            <img src="/images/nequi.webp" alt="Nequi" className="w-12 h-12 mx-auto mt-2" />
                            <p className="mt-2 text-center text-gray-900 dark:text-white">Daviplata - Nequi: <strong>3183773718</strong></p>
                        </div>
                    </div>
                    <div className="mt-6 text-center text-gray-900 dark:text-white">
                        <p>Enviar comprobantes de pago a cualquiera de los grupos de WhatsApp donde pertenezca.</p>
                        <p>Además, debe informar el motivo del pago.</p>
                    </div>
                    <div className="mt-4 text-center">
                        <img src="/images/whatsapp.png" alt="WhatsApp" className="w-16 h-16 mx-auto" />
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
