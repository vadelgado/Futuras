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

export default function Dashboard({ auth, sedes }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);
    const [filterText, setFilterText] = useState("");
    const nombreInput = useRef();
    const imagenInput = useRef();
    const direccionInput = useRef();
    const telefonoInput = useRef();
    const telefonoDosInput = useRef();
    const telefonoTresInput = useRef();
    const emailInput = useRef();
    const encargadoInput = useRef();
    const coordenadasInput = useRef();
    const diasSemanaInput = useRef();
    const horarioInput = useRef();
    const estadoInput = useRef();

    const InitialValues = {
        nombre: "",
        imagen: null,
        direccion: "",
        telefono: "",
        telefonoDos: "",
        telefonoTres: "",
        email: "",
        encargado: "",
        coordenadas: "",
        diasSemana: "",
        horario: "",
        estado: "",
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
        setData("imagen", e.target.files[0]);
    };

    const handleModal = (
        op,
        id,
        nombre,
        imagen,
        direccion,
        telefono,
        telefonoDos,
        telefonoTres,
        email,
        encargado,
        coordenadas,
        diasSemana,
        horario,
        estado
    ) => {
        setModal(true);
        setOperation(op);
        if (op === 1) {
            setTitle("Agregar Sede");
            setData({
                nombre: "",
                imagen: null,
                direccion: "",
                telefono: "",
                telefonoDos: "",
                telefonoTres: "",
                email: "",
                encargado: "",
                coordenadas: "",
                diasSemana: "",
                horario: "",
                estado: "",
            });
        } else {
            setTitle("Editar Sede");
            setData({
                id: id,
                nombre: nombre,
                imagen: imagen,
                direccion: direccion,
                telefono: telefono,
                telefonoDos: telefonoDos,
                telefonoTres: telefonoTres,
                email: email,
                encargado: encargado,
                coordenadas: coordenadas,
                diasSemana: diasSemana,
                horario: horario,
                estado: estado,
            });
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const save = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route("AdministradorSedes.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    ok("Sede Guardada");
                },
            });
        } else {
            post(route("AdministradorSedes.updatepost", data.id), {
                preserveScroll: true,
                onSuccess: () => {
                    ok("Sede Actualizada");
                },
            });
        }
    };

    const ok = (mensaje) => {
        closeModal();
        Swal.fire({ title: mensaje, icon: "success" });
    };

    const eliminar = (id, nombre) => {
        Swal.fire({
            title: `¿Estás seguro de eliminar la sede ${nombre}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("AdministradorSedes.destroy", id), {
                    onSuccess: () => {
                        ok("Sede Eliminada.");
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo eliminar la sede.",
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
            selector: (row) => row.nombre,
            sortable: true,
        },
        {
            name: "Imagen Principal",
            cell: (row) => (
                <div className="flex items-center justify-center px-2 py-2">
                    <img
                        src={`/storage/${row.imagen}`}
                        alt={row.nombre}
                        className="w-16 h-16 rounded-full"
                    />
                </div>
            ),
            sortable: false,
        },
        {
            name: "Dirección",
            selector: (row) => row.direccion,
            sortable: true,
        },
        {
            name: "Teléfono",
            selector: (row) => row.telefono,
            sortable: true,
        },
        {
            name: "Teléfono Dos",
            selector: (row) => row.telefonoDos,
            sortable: true,
        },
        {
            name: "Teléfono Tres",
            selector: (row) => row.telefonoTres,
            sortable: true,
        },
        {
            name: "Correo Electrónico",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Encargado",
            selector: (row) => row.encargado,
            sortable: true,
        },
        {
            name: "Google Maps",
            cell: (row) => (
                <a
                    href={row.coordenadas}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Google Maps 🗺
                </a>
            ),
            sortable: true,
        },
        {
            name: "Dias de Atención",
            selector: (row) => row.diasSemana,
            sortable: true,
        },
        {
            name: "Horario",
            selector: (row) => row.horario,
            sortable: true,
        },
        {
            name: "Estado",
            selector: (row) => row.estado,
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
                            row.nombre,
                            row.imagen,
                            row.direccion,
                            row.telefono,
                            row.telefonoDos,
                            row.telefonoTres,
                            row.email,
                            row.encargado,
                            row.coordenadas,
                            row.diasSemana,
                            row.horario,
                            row.estado
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
                <DangerButton onClick={() => eliminar(row.id, row.nombre)}>
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
                    href={`/AdministradorFotosSedes?sede_id=${row.id}`}
                >
                    <i className="mr-2 fa-solid fa-image"></i>
                </a>
            ),
            ignoreRowClick: true,
        },
    ];

    const filteredNombre = sedes.filter((sede) =>
        sede.nombre.toLowerCase().includes(filterText.toLowerCase())
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
                    Sedes
                </h2>
            }
        >
            <Head title="Panel Sedes" />
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow">
                    <div className="container p-6 mx-auto mt-6 bg-white">
                        <div className="flex justify-end mt-2 mb-3">
                            <PrimaryButton onClick={() => handleModal(1)}>
                                <i className="mr-2 fa-solid fa-plus-circle">
                                    Añadir Sede
                                </i>
                            </PrimaryButton>
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Buscar por Nombre del Producto"
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                            />
                        </div>

                        <div className="overflow-x-auto">
                            <DataTable
                                title="Sedes Registradas"
                                columns={columns}
                                data={filteredNombre}
                                pagination
                                paginationComponentOptions={
                                    paginationComponentOptions
                                }
                                responsive
                                fixedHeader
                                noDataComponent={
                                    <div>No hay Sedes Registradas</div>
                                }
                            />
                        </div>
                    </div>

                    <Modal show={modal} onClose={closeModal}>
                        <h2 className="text-lg font-medium text-gray-900">
                            {title}
                        </h2>
                        <form onSubmit={save} className="p-6">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <FormField
                                    htmlFor="nombre"
                                    label={
                                        <>
                                            <span>Nombre de la sede</span>
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </>
                                    }
                                    id="nombre"
                                    type="text"
                                    name="nombre"
                                    ref={nombreInput}
                                    placeholder="Nombre del Producto"
                                    value={data.nombre}
                                    onChange={handleInputChange}
                                    errorMessage={errors.nombre}
                                />

                                <ImgField
                                    htmlFor="imagen"
                                    label="Foto Principal"
                                    id="imagen"
                                    name="imagen"
                                    ref={imagenInput}
                                    onChange={handleFileChange}
                                    errorMessage={errors.imagen}
                                />

                                <FormField
                                    htmlFor="direccion"
                                    label={
                                        <>
                                            <span>Dirección</span>
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </>
                                    }
                                    id="direccion"
                                    type="text"
                                    name="direccion"
                                    ref={direccionInput}
                                    placeholder="Dirección"
                                    value={data.direccion}
                                    onChange={handleInputChange}
                                    errorMessage={errors.direccion}
                                />

                                <FormField
                                    htmlFor="telefono"
                                    label={
                                        <>
                                            <span>Teléfono</span>
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </>
                                    }
                                    id="telefono"
                                    type="number"
                                    name="telefono"
                                    ref={telefonoInput}
                                    placeholder="Teléfono"
                                    value={data.telefono}
                                    onChange={handleInputChange}
                                    errorMessage={errors.telefono}
                                />

                                <FormField
                                    htmlFor="telefonoDos"
                                    label={
                                        <>
                                            <span>Teléfono Dos</span>
                                        </>
                                    }
                                    id="telefonoDos"
                                    type="number"
                                    name="telefonoDos"
                                    ref={telefonoDosInput}
                                    placeholder="Teléfono Dos"
                                    value={data.telefonoDos}
                                    onChange={handleInputChange}
                                    errorMessage={errors.telefonoDos}
                                />

                                <FormField
                                    htmlFor="telefonoTres"
                                    label={
                                        <>
                                            <span>Teléfono Tres</span>
                                        </>
                                    }
                                    id="telefonoTres"
                                    type="number"
                                    name="telefonoTres"
                                    ref={telefonoTresInput}
                                    placeholder="Teléfono Tres"
                                    value={data.telefonoTres}
                                    onChange={handleInputChange}
                                    errorMessage={errors.telefonoTres}
                                />

                                <FormField
                                    htmlFor="email"
                                    label={
                                        <>
                                            <span>Correo Electrónico</span>
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </>
                                    }
                                    id="email"
                                    type="text"
                                    name="email"
                                    ref={emailInput}
                                    placeholder="Correo Electrónico"
                                    value={data.email}
                                    onChange={handleInputChange}
                                    errorMessage={errors.email}
                                />
                                                                <SelectField
                                    htmlFor="estado"
                                    label={
                                        <>
                                            <span>Estado</span>
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </>
                                    }
                                    id="estado"
                                    ref={estadoInput}
                                    name="estado"
                                    value={data.estado}
                                    onChange={handleInputChange}
                                    errorMessage={errors.estado}
                                    options={[
                                        {
                                            value: "",
                                            label: "Seleccione...",
                                            disabled: true,
                                        },
                                        { value: "activa", label: "Activa" },
                                        {
                                            value: "inactiva",
                                            label: "Inactiva",
                                        },
                                        {
                                            value: "mantenimiento",
                                            label: "En Mantenimiento",
                                        },
                                    ]}
                                />

                                <FormField
                                    htmlFor="encargado"
                                    label={
                                        <>
                                            <span>Encargado</span>
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </>
                                    }
                                    id="encargado"
                                    type="text"
                                    name="encargado"
                                    ref={encargadoInput}
                                    placeholder="Encargado"
                                    value={data.encargado}
                                    onChange={handleInputChange}
                                    errorMessage={errors.encargado}
                                />

                                <FormField
                                    htmlFor="coordenadas"
                                    label={
                                        <>
                                            <span>Google Maps</span>
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </>
                                    }
                                    id="coordenadas"
                                    type="text"
                                    name="coordenadas"
                                    ref={coordenadasInput}
                                    placeholder="Google Maps"
                                    value={data.coordenadas}
                                    onChange={handleInputChange}
                                    errorMessage={errors.coordenadas}
                                />

                                <FormField
                                    htmlFor="diasSemana"
                                    label={
                                        <>
                                            <span>Días de Atención</span>
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </>
                                    }
                                    id="diasSemana"
                                    type="text"
                                    name="diasSemana"
                                    ref={diasSemanaInput}
                                    placeholder="Días de Atención"
                                    value={data.diasSemana}
                                    onChange={handleInputChange}
                                    errorMessage={errors.diasSemana}
                                />

                                <FormField
                                    htmlFor="horario"
                                    label={
                                        <>
                                            <span>Horario</span>
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </>
                                    }
                                    id="horario"
                                    type="text"
                                    name="horario"
                                    ref={horarioInput}
                                    placeholder="Horario"
                                    value={data.horario}
                                    onChange={handleInputChange}
                                    errorMessage={errors.horario}
                                />


                            </div>

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
