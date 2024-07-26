import React from "react";
import { Link } from "@inertiajs/react";

const ProductCard = ({ product }) => {
    const whatsappLink = `https://wa.me/573183773718?text=Hola,%20estoy%20interesado%20en%20el%20producto%20${encodeURIComponent(
        product.nombre
    )}%20(${product.categoria})%20que%20cuesta%20${product.precio}.`;

    const handleWhatsAppClick = (e) => {
        e.stopPropagation();
        window.open(whatsappLink, "_blank", "noopener,noreferrer");
    };

    const maxTitleLength = 10; // Longitud máxima del título
    const maxDescriptionLength = 30; // Longitud máxima de la descripción

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return ( 
        <div className="w-full max-w-sm m-4 overflow-hidden transition transform bg-white rounded-lg shadow-lg hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-800">
            <Link key={product.id} href={`/producto/${product.id}`}>
                <div className="relative h-64">
                    <img
                        className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-105"
                        src={`/storage/${product.imagen}`}
                        alt={product.nombre}
                    />
                    <div className="absolute top-0 right-0 px-2 py-1 m-2 text-xs text-white bg-red-500 rounded">
                        Nuevo
                    </div>
                </div>
                <div className="flex flex-col justify-between h-48 px-6 py-4">
                    <div>
                        <div className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {truncateText(product.nombre, maxTitleLength)}
                        </div>
                        <p className="text-base text-gray-700 dark:text-gray-300">
                            {truncateText(product.descripcion, maxDescriptionLength)}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            {product.precio === 50
                                ? "Info WhatsApp"
                                : product.precio.toLocaleString("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })}{" "}
                            {product.precio !== 50 && "(COP)"}
                        </span>
                        <button
                            onClick={handleWhatsAppClick}
                            className="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-700"
                        >
                            <i className="mr-2 fa-brands fa-whatsapp"></i>
                            Preguntar por WhatsApp
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                            <svg
                                className="w-4 h-4 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 2a6 6 0 100 12A6 6 0 0010 2zM5 10a5 5 1110 0A5 5 0 015 10z" />
                            </svg>
                            {product.categoria}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                            <svg
                                className="w-4 h-4 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M3 4a1 1 0 011-1h2.586l1-1H12l1 1H16a1 1 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm11 2a1 1 100 2H6a1 1 000-2h8z" />
                            </svg>
                            Stock: {product.stock}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
