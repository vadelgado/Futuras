import { useState, useEffect } from 'react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    return isVisible ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 text-center text-white bg-gray-800">
            <p className="mb-2">Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Al continuar navegando, aceptas nuestro uso de cookies. <a href={route("PoliticaCokies.index")} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Más información</a></p>
            <button onClick={acceptCookies} className="px-4 py-2 bg-blue-500 rounded">Aceptar</button>
        </div>
    ) : null;
}
