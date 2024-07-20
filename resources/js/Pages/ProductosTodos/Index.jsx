import { Link, Head } from "@inertiajs/react";
import React, { useState } from "react";
import Header from "@/Components/DashBoard/Header";
import ProductCard from "@/Components/ProductCard";
import Footer from "@/Components/Footer";

export default function Index({ auth, productos }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = productos.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Head title="Futuras Estrellas" />
            <Header auth={auth} />
            <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
            <div className="relative min-h-screen bg-gray-100 bg-center mt-36 sm:flex sm:justify-center sm:items-center bg-dots-darker dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="p-6 mx-auto max-w-7xl lg:p-8">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
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
