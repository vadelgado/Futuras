export default function ApplicationLogo(props) {
    return (
        <img
            src="logo-home1.webp" // Reemplaza esto con la ruta real de tu imagen
            alt="Logo"
            className="w-32 h-auto sm:w-40 md:w-48" // Ajusta estas clases según sea necesario
            {...props}
        />
    );
}
