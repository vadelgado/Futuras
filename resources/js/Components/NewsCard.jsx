import React, { useState } from 'react';
import { Link } from "@inertiajs/react";

// Función para acortar el contenido
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

// Función para crear una lista de páginas con elipsis
const getPageNumbers = (totalPages, currentPage) => {
    const maxPages = 5;
    const pages = [];
    let startPage, endPage;

    if (totalPages <= maxPages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 4;
            pages.push('...');
            pages.push(totalPages);
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - 3;
            endPage = totalPages;
            pages.unshift(1);
            pages.unshift('...');
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
            pages.unshift(1);
            pages.push('...');
            pages.push(totalPages);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.splice(pages.length - (totalPages <= maxPages ? 0 : 2), 0, i);
    }

    return pages;
};

export default function NewsCard({ noticias }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 6;

    // Filtrar noticias según el término de búsqueda
    const filteredNoticias = noticias.filter((noticia) =>
        noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredNoticias.length / itemsPerPage);
    const maxLength = 80; // Longitud máxima del contenido
    const maxTitleLength = 20; // Longitud máxima del título

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calcular el índice de inicio y fin de las noticias para la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNoticias = filteredNoticias.slice(startIndex, endIndex);

    const pageNumbers = getPageNumbers(totalPages, currentPage);

    return (
        <div>
            {/* Barra de búsqueda */}
            <div className="flex justify-center my-4">
                <input
                    type="text"
                    placeholder="Buscar por título Noticia ..."
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <div className="flex flex-wrap justify-center">
                {currentNoticias.map((noticia) => {
                    const shortContent = truncateText(noticia.contenido, maxLength);
                    const shortTitle = truncateText(noticia.titulo, maxTitleLength);
                    return (
                        <Link key={noticia.id} href={`/noticia/${noticia.id}`} className="m-4">
                            <div className="max-w-xs overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:-translate-y-2 hover:shadow-2xl">
                                <img className="object-cover w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80" src={`/storage/${noticia.imagenPortada}`} alt={noticia.titulo} />
                                <div className="p-6">
                                    <div className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">{shortTitle}</div>
                                    <p className="text-base text-gray-700 dark:text-gray-300">
                                        {shortContent}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Controles de Paginación */}
            <div className="flex justify-center mt-4">
                {pageNumbers.map((pageNumber, index) => (
                    <button
                        key={index}
                        onClick={() => pageNumber !== '...' && handlePageChange(pageNumber)}
                        className={`mx-1 px-3 py-1 border rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border-blue-500 hover:bg-blue-700 hover:text-white transition`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
}
