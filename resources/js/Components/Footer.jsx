import { Link } from "@inertiajs/react";
import Logo from "@/Components/Logo";
import FlyoutMenu from "@/Components/FlyoutMenu";

export default function Footer({ auth }) {
    return (
        <footer className="py-8 text-white bg-green-700">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center md:flex-row md:justify-between">
                    <div className="mb-4 md:mb-0">
                        <Logo className="w-auto h-12 sm:h-16" />
                    </div>
                    <div className="flex flex-col items-center md:flex-row md:space-x-8">
                        <Link
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-2 text-white md:mb-0 hover:text-gray-300"
                        >
                            Inicio
                        </Link>
                        <Link
                            href={route("producto.list")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-2 text-white md:mb-0 hover:text-gray-300"
                        >
                            Productos
                        </Link>
                        <Link
                            href={route("sede.list")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-2 text-white md:mb-0 hover:text-gray-300"
                        >
                            Sedes
                        </Link>
                        <Link
                            href={route("pagos.index")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-2 text-white md:mb-0 hover:text-gray-300"
                        >
                            Medios de Pagos
                        </Link>
                        <FlyoutMenu auth={auth} />
                    </div>
                </div>
                <div className="flex flex-col items-center mt-6 md:flex-row md:justify-between">
                    <div className="mb-4 text-center md:mb-0 md:text-left">
                        <p className="mb-2">
                            © 2024 Futuras Estrellas, administrada por Alianza Sureña. Todos los derechos reservados.
                        </p>
                        <p className="mb-2">
                            Este proyecto está licenciado bajo la <a href="/LICENSE" className="underline hover:text-gray-300">Licencia Apache 2.0</a>.
                        </p>
                        <p>
                            Desarrollado por Victor Alfonso Delgado Bolaños{" "}
                            <a
                                href="https://www.linkedin.com/in/v%C3%ADctor-alfonso-83046184/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-300"
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>{" "}
                            como parte de su pasantía en la empresa Alianza Sureña.
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:flex-row md:space-x-4">
                        <Link
                            href={route("politicasPrivacidad.index")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-2 text-white md:mb-0 hover:text-gray-300"
                        >
                            Política de privacidad
                        </Link>
                        <Link
                            href={route("terminosCondiciones.index")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-2 text-white md:mb-0 hover:text-gray-300"
                        >
                            Términos y condiciones
                        </Link>
                        <Link
                            href={route("PoliticaCokies.index")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-2 text-white md:mb-0 hover:text-gray-300"
                        >
                            Aviso de cookies
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center mt-6 space-x-4">
                    <a
                        href="https://www.facebook.com/oscararmando.futurasestrellas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                        href="https://www.instagram.com/osbolka1965/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}
