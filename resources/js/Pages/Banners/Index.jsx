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
import SelectField from "@/Components/SelectField";

export default function Dashboard({ auth, banners }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);
    const [filterText, setFilterText] = useState("");
    const titleInput = useRef();
    const subtitleInput = useRef();
    const imagenPortadaInput = useRef();
    const linkUrlInput = useRef();
    const isActiveInput = useRef();

    const InitialValues = {
        title: "",
        subtitle: "",
        imagenPortada: null,
        linkUrl: "",
        isActive: "",
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

    const handleModal = (
        op,
        id,
        title,
        subtitle,
        imagenPortada,
        linkUrl,
        isActive
    ) => {
        setModal(true);
        setOperation(op);
        if (op === 1) {
            setTitle("Agregar Banner");
            setData({
                title: "",
                subtitle: "",
                imagenPortada: null,
                linkUrl: "",
                isActive: "",
            });
        } else {
            setTitle("Editar Banner");
            setData({
                id: id,
                title: title,
                subtitle: subtitle,
                imagenPortada: imagenPortada,
                linkUrl: linkUrl,
                isActive: isActive,
            });
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const save = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route("AdministradorBanners.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    ok("Banner Agregado.");
                },
            });
        } else {
            post(route("AdministradorBanners.updatepost", data.id), {
                preserveScroll: true,
                onSuccess: () => {
                    ok("Banner Actualizado.");
                },
            });
        }
    };

    const ok = (mensaje) => {
        closeModal();
        Swal.fire({ title: mensaje, icon: "success" });
    };

    const eliminar = (id, title) => {
        Swal.fire({
            title: `¿Estás seguro de eliminar Banner ${title}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("AdministradorBanners.destroy", id), {
                    onSuccess: () => {
                        ok("Banner Eliminado.");
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo eliminar el banner.",
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
            name: "Titulo",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Subtitulo",
            selector: (row) => row.subtitle,
            sortable: true,
        },
        {
            name: "Imagen",
            cell: (row) => (
                <div className="flex items-center justify-center px-2 py-2">
                    <img
                        src={`/storage/${row.imagenPortada}`}
                        alt={row.title}
                        className="w-16 h-16 rounded-full"
                    />
                </div>
            ),
            sortable: false,
        },
        {
            name: "Enlace",
            selector: (row) => row.linkUrl,
            sortable: true,
        },
        {
            name: "Estado",
            selector: (row) => row.isActive,
            sortable: true,
        },

        {
            name: "Editar",
            cell: (row) => (
                <WarningButton
                    onClick={() =>
                        handleModal(
                            2,
                            row.id,
                            row.title,
                            row.subtitle,
                            row.imagenPortada,
                            row.linkUrl,
                            row.isActive
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
                <DangerButton onClick={() => eliminar(row.id, row.title)}>
                    <i className="fa-solid fa-trash"></i>
                </DangerButton>
            ),
            ignoreRowClick: true,
        },
    ];

    const filteredTitle = banners.filter((banner) =>
        banner.title.toLowerCase().includes(filterText.toLowerCase())
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
                    Banners
                </h2>
            }
        >
            <Head title="Panel Banners" />
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow">
            <div className="container p-6 mx-auto mt-6 bg-white">
                <div className="flex justify-end mt-2 mb-3">
                    <PrimaryButton onClick={() => handleModal(1)}>
                        <i className="mr-2 fa-solid fa-plus-circle">
                            Añadir Banner
                        </i>
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
                        title="Banners Registrados"
                        columns={columns}
                        data={filteredTitle}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        responsive
                        fixedHeader
                        noDataComponent={<div>No hay Banners registrados</div>}
                    />
                </div>
            </div>

            <Modal show={modal} onClose={closeModal}>
                <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                <form onSubmit={save} className="p-6">
                    <FormField
                        htmlFor="title"
                        label={
                            <>
                                <span>Titulo</span>
                                <span className="text-red-500">*</span>
                            </>
                        }
                        id="title"
                        type="text"
                        name="title"
                        ref={titleInput}
                        placeholder="Titulo del Banner"
                        value={data.title}
                        onChange={handleInputChange}
                        errorMessage={errors.title}
                    />

                    <FormField
                        htmlFor="subtitle"
                        label={
                            <>
                                <span>Subtitulo</span>
                                <span className="text-red-500">*</span>
                            </>
                        }
                        id="subtitle"
                        type="text"
                        name="subtitle"
                        ref={subtitleInput}
                        placeholder="Subtitulo del Banner"
                        value={data.subtitle}
                        onChange={handleInputChange}
                        errorMessage={errors.subtitle}
                    />

                    <SelectField
                        htmlFor="isActive"
                        label={
                            <>
                                <span>Estado</span>
                                <span className="text-red-500">*</span>
                            </>
                        }
                        id="isActive"
                        ref={isActiveInput}
                        name="isActive"
                        value={data.isActive}
                        onChange={handleInputChange}
                        errorMessage={errors.isActive}
                        options={[
                            {
                                value: "",
                                label: "Seleccione...",
                                disabled: true,
                            },
                            { value: "1", label: "Activa" },
                            { value: "0", label: "Inactiva" },
                        ]}
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

                    <FormField
                        htmlFor="linkUrl"
                        label={
                            <>
                                <span>Enlace</span>
                                <span className="text-red-500">*</span>
                            </>
                        }
                        id="linkUrl"
                        type="text"
                        name="linkUrl"
                        ref={linkUrlInput}
                        placeholder="Enlace del Banner"
                        value={data.linkUrl}
                        onChange={handleInputChange}
                        errorMessage={errors.linkUrl}
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
