import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'animate.css';

export default function Banner({ banners }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000); // Cambiar cada 5 segundos
        return () => clearInterval(interval);
    }, [banners.length]);

    const nextBanner = () => {
        setCurrentIndex((currentIndex + 1) % banners.length);
    };

    const prevBanner = () => {
        setCurrentIndex((currentIndex - 1 + banners.length) % banners.length);
    };

    const { title, subtitle, imagenPortada, linkUrl } = banners[currentIndex];

    return (
        <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg md:h-80 lg:h-96">
            <a href={linkUrl} className="block w-full h-full">
                <div 
                    className="absolute inset-0 transition-transform duration-1000 ease-in-out transform bg-center bg-cover hover:scale-105"
                    style={{ backgroundImage: `url(/storage/${imagenPortada})` }}
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black bg-opacity-50">
                        <h2 className="text-2xl font-bold text-center text-white md:text-4xl animate__animated animate__fadeInDown">{title}</h2>
                        <p className="mt-2 text-lg text-center text-white md:text-2xl animate__animated animate__fadeInUp">{subtitle}</p>
                    </div>
                </div>
            </a>
            {banners.length > 1 && (
                <>
                    <button 
                        onClick={prevBanner} 
                        className="absolute left-0 px-4 py-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 top-1/2 hover:bg-opacity-75"
                    >
                        &lt;
                    </button>
                    <button 
                        onClick={nextBanner} 
                        className="absolute right-0 px-4 py-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 top-1/2 hover:bg-opacity-75"
                    >
                        &gt;
                    </button>
                </>
            )}
        </div>
    );
}

Banner.propTypes = {
    banners: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            subtitle: PropTypes.string.isRequired,
            imagenPortada: PropTypes.string.isRequired,
            linkUrl: PropTypes.string.isRequired,
        })
    ).isRequired,
};
