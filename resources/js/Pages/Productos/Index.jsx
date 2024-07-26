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



export default function Dashboard({ auth, productos }) { 
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);
    const [filterText, setFilterText] = useState("");
    const nombreInput = useRef();
    const descripcionInput = useRef();
    const precioInput = useRef();
    const stockInput = useRef();
    const imagenInput = useRef();
    const categoriaInput = useRef();
    const tipoEspecificacionesInput = useRef();
    const valorEspecificacionesInput = useRef();

    const InitialValues = {
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: null,
        categoria: "",
        tipoEspecificaciones: "",
        valorEspecificaciones: "",
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
        descripcion,
        precio,
        stock,
        imagen,
        categoria,
        tipoEspecificaciones,
        valorEspecificaciones 
    ) => {
        setModal(true);
        setOperation(op);
        if (op === 1) {
            setTitle("Agregar Producto");
            setData({
                nombre: "",
                descripcion: "",
                precio: "",
                stock: "",
                imagen: null,
                categoria: "",
                tipoEspecificaciones: "",
                valorEspecificaciones: "",
            });
        } else {
            setTitle("Editar Producto");
            setData({
                id: id,
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                stock: stock,
                imagen: imagen,
                categoria: categoria,
                tipoEspecificaciones: tipoEspecificaciones,
                valorEspecificaciones: valorEspecificaciones,                
            });
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const save = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route("AdministradorProductos.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    ok("Producto Guardado");
                },
            });
        } else {
            post(route("AdministradorProductos.updatepost", data.id), {
                preserveScroll: true,
                onSuccess: () => {
                    ok("Producto Actualizado");
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
            title: `¿Estás seguro de eliminar el producto ${nombre}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("AdministradorProductos.destroy", id), {
                    onSuccess: () => {
                        ok("Producto Eliminado.");
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo eliminar el producto.",
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
            name: "Descripción",
            selector: (row) => row.descripcion,
            sortable: true,
        },
        {
            name: "Precio",
            selector: (row) => (row.precio == 50 ? "Info WhatsApp" : row.precio),
            sortable: true,
        },
        {
            name: "stock",
            selector: (row) => row.stock,
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
            name: "Categoría",
            selector: (row) => row.categoria,
            sortable: true,
        },
        {
            name: "Especificaciones",
            selector: (row) => row.tipoEspecificaciones,
            sortable: true,
        },
        {
            name: "Valor Especificaciones",
            selector: (row) => row.valorEspecificaciones,
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
                            row.descripcion,
                            row.precio,
                            row.stock,
                            row.imagen,
                            row.categoria,
                            row.tipoEspecificaciones,
                            row.valorEspecificaciones                          

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
                href={`/AdministradorFotosProductos?producto_id=${row.id}`}
            >
                <i className="mr-2 fa-solid fa-image"></i>
            </a>
            ),
            ignoreRowClick: true,
        }
    ];

    const filteredNombre = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(filterText.toLowerCase())
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
                    Productos
                </h2>
            }
        >
            <Head title="Panel Productos" />

            <div className="flex flex-col min-h-screen">
            <main className="flex-grow">

            <div className="container p-6 mx-auto mt-6 bg-white">
                <div className="flex justify-end mt-2 mb-3">
                    <PrimaryButton onClick={() => handleModal(1)}>
                        <i className="mr-2 fa-solid fa-plus-circle">Añadir Producto</i> 
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
                        title="Productos Registrados"
                        columns={columns}
                        data={filteredNombre}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        responsive
                        fixedHeader
                        noDataComponent={<div>No hay productos Registrados</div>}
                    />
                </div>
            </div>

            <Modal show={modal} onClose={closeModal}>
                <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                <form onSubmit={save} className="p-6">
                    <FormField
                        htmlFor="nombre"
                        label={
                            <>
                                <span>Nombre del Producto</span>
                                <span className="text-red-500">*</span>
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



                    <Textarea2
                        htmlFor="descripcion"
                        label={
                            <>
                                <span>Descripción</span>
                                <span className="text-red-500">*</span>
                            </>
                        }
                        id="descripcion"
                        type="text"
                        ref={descripcionInput}
                        name="descripcion"
                        placeholder="Descripción del Producto"
                        value={data.descripcion}
                        onChange={handleInputChange}
                        errorMessage={errors.descripcion}
                    />

                    <FormField
                        htmlFor="precio"
                        label={
                            <>
                                <span>Precio</span>
                                <span className="text-red-500">*</span>
                            </>
                        }
                        id="precio"
                        type="number"
                        name="precio"
                        ref={precioInput}
                        placeholder="Precio del Producto"
                        value={data.precio}
                        onChange={handleInputChange}
                        errorMessage={errors.precio}
                    />

                    <FormField
                        htmlFor="stock"
                        label={
                            <>
                                <span>Stock</span>
                                <span className="text-red-500">*</span>
                            </>
                        }
                        id="stock"
                        type="number"
                        name="stock"
                        ref={stockInput}
                        placeholder="Stock del Producto"
                        value={data.stock}
                        onChange={handleInputChange}
                        errorMessage={errors.stock}
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
                        htmlFor="categoria"
                        label={
                            <>
                                <span>Categoría</span>
                                <span className="text-red-500">*</span>
                            </>
                        }
                        id="categoria"
                        type="text"
                        name="categoria"
                        ref={categoriaInput}
                        placeholder="Categoría del Producto"
                        value={data.categoria}
                        onChange={handleInputChange}
                        errorMessage={errors.categoria}
                    />

                    <FormField
                        htmlFor="tipoEspecificaciones"
                        label={
                            <>
                                <span>Tipo de Especificaciones Talla, Tamaño, Capacidad</span>
                                <span className="text-red-500">*</span>
                            </>
                        }
                        id="tipoEspecificaciones"
                        type="text"
                        name="tipoEspecificaciones"
                        ref={tipoEspecificacionesInput}
                        placeholder="Tipo de Especificaciones del Producto"
                        value={data.tipoEspecificaciones}
                        onChange={handleInputChange}
                        errorMessage={errors.tipoEspecificaciones}
                    />

                    <FormField
                        htmlFor="valorEspecificaciones"
                        label={
                            <>
                                <span>Valor de Especificaciones</span>
                                <span className="text-red-500">*</span>
                            </>
                        }
                        id="valorEspecificaciones"
                        type="text"
                        name="valorEspecificaciones"
                        ref={valorEspecificacionesInput}
                        placeholder="Valor de Especificaciones del Producto"
                        value={data.valorEspecificaciones}
                        onChange={handleInputChange}
                        errorMessage={errors.valorEspecificaciones}
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
