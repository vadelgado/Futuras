import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import Footer from "@/Components/Footer";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DangerButton from "@/Components/DangerButton";
import FormField from "@/Components/FormField";
import ImgField from "@/Components/ImgField";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import WarningButton from "@/Components/WarningButton";
import Textarea2 from "@/Components/Textarea2";



export default function Dashboard({ auth, noticias }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);
    const [filterText, setFilterText] = useState("");
    const tituloInput = useRef();
    const contenidoInput = useRef();
    const imagenPortadaInput = useRef();
    const InitialValues = {
        titulo: "",
        contenido: "",
        imagenPortada: null,
    };
    const {
        data,
        setData,
        errors,
        delete: destroy,
        post,
        processing,
    } = useForm(InitialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setData("imagenPortada", e.target.files[0]);
    };

    const handleModal = (op, id, titulo, contenido, imagenPortada) => {
        setModal(true);
        setOperation(op);
        if (op === 1) {
            setTitle("Agregar Noticia");
            setData({
                titulo: "",
                contenido: "",
                imagenPortada: null,
            });
        } else {
            setTitle("Editar Noticia");
            setData({
                id: id,
                titulo: titulo,
                contenido: contenido,
                imagenPortada: imagenPortada,
            });
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const save = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route("AdministradorNoticias.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    ok("Noticia Guardada");
                },
            });
        } else {
            post(route("AdministradorNoticias.updatepost", data.id), {
                preserveScroll: true,
                onSuccess: () => {
                    ok("Noticia Actualizada");
                },
            });
        }
    };

    const ok = (mensaje) => {
        closeModal();
        Swal.fire({ title: mensaje, icon: "success" });
    };

    const eliminar = (id, titulo) => {
        Swal.fire({
            title: `¿Estás seguro de eliminar ${titulo}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("AdministradorNoticias.destroy", id), {
                    onSuccess: () => {
                        ok("Noticia Eliminada.");
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo eliminar la noticia.",
                            icon: "error",
                        });
                    },
                });
            }
        });
    };

    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Nombre",
            selector: (row) => row.titulo,
            sortable: true,
        },
        {
            name: "Contenido",
            selector: (row) => row.contenido,
            sortable: true,
        },
        {
            name: "Portada",
            cell: (row) => (
                <div className="flex items-center justify-center px-2 py-2">
                    <img
                        src={`/storage/${row.imagenPortada}`}
                        alt={row.titulo}
                        className="w-16 h-16 rounded-full"
                    />
                </div>
            ),
            sortable: false,
        },
        {
            name: "Editar",
            cell: (row) => (
                <WarningButton
                    onClick={() =>
                        handleModal(
                            2,
                            row.id,
                            row.titulo,
                            row.contenido,
                            row.imagenPortada
                        )
                    }
                >
                    <i className="fa-solid fa-pencil"></i>
                </WarningButton>
            ),
            ignoreRowClick: true,
        },
        {
            name: "Eliminar",
            cell: (row) => (
                <DangerButton onClick={() => eliminar(row.id, row.titulo)}>
                    <i className="fa-solid fa-trash"></i>
                </DangerButton>
            ),
            ignoreRowClick: true,
        },
        {
            name: "Fotos",
            cell: (row) => (
                <a
                className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                href={`/AdministradorFotosNoticias?noticia_id=${row.id}`}
            >
                <i className="mr-2 fa-solid fa-image"> Fotos</i>
            </a>
            ),
            ignoreRowClick: true,
        }
    ];

    const filteredTitulo = noticias.filter((noticia) =>
        noticia.titulo.toLowerCase().includes(filterText.toLowerCase())
    );

    const paginationComponentOptions = {
        rowsPerPageText: "Registros por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Noticias
                </h2>
            }
        >
            <Head title="Panel Noticias" />

            <div className="flex flex-col min-h-screen">
            <main className="flex-grow">

            <div className="container p-6 mx-auto mt-6 bg-white">
                <div className="flex justify-end mt-2 mb-3">
                    <PrimaryButton onClick={() => handleModal(1)}>
                        <i className="mr-2 fa-solid fa-plus-circle">Añadir Noticia</i> 
                    </PrimaryButton>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Buscar por Titulo"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <DataTable
                        title="Noticias Registradas"
                        columns={columns}
                        data={filteredTitulo}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        responsive
                        fixedHeader
                        noDataComponent={<div>No hay noticias registradas</div>}
                    />
                </div>
            </div>

            <Modal show={modal} onClose={closeModal}>
                <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                <form onSubmit={save} className="p-6">
                    <input
                        type="text"
                        value={data.fk_torneo}
                        name="fk_torneo"
                        hidden
                        readOnly
                    />

                    <FormField
                        htmlFor="titulo"
                        label={
                            <>
                                <span>Titulo</span>
                                <span className="text-red-500">*</span>
                            </>
                        }
                        id="titulo"
                        type="text"
                        name="titulo"
                        ref={tituloInput}
                        placeholder="Titulo de la noticia"
                        value={data.titulo}
                        onChange={handleInputChange}
                        errorMessage={errors.titulo}
                    />

                    <Textarea2
                        htmlFor="contenido"
                        label={
                            <>
                                <span>Contenido</span>
                                <span className="text-red-500">*</span>
                            </>
                        }
                        id="contenido"
                        type="text"
                        ref={contenidoInput}
                        name="contenido"
                        placeholder="Contenido de la noticia"
                        value={data.contenido}
                        onChange={handleInputChange}
                        errorMessage={errors.contenido}
                    />

                    <ImgField
                        htmlFor="imagenPortada"
                        label="Foto de Portada"
                        id="imagenPortada"
                        name="imagenPortada"
                        ref={imagenPortadaInput}
                        onChange={handleFileChange}
                        errorMessage={errors.imagenPortada}
                    />

                    <div className="flex justify-end mt-4">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>
                        <PrimaryButton
                            className="ml-2"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? "Guardando..." : "Guardar"}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
            </main>
            </div>
            <Footer auth={auth} />
        </AuthenticatedLayout>
    );
}
 