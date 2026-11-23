import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function DetalleProducto({ agregarProducto }) {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        fetch("https://dummyjson.com/products/" + id)
            .then((respuesta) => respuesta.json())
            .then((datos) => setProducto(datos));
    }, [id]);

    if (producto === null) {
        return <p className="alert alert-info m-4">Cargando producto...</p>;
    }

    function agregarAlCarrito() {
        if (agregarProducto) {
            agregarProducto(producto.title, 1, producto.price, false, 0);
            alert("Se agregó " + producto.title + " al carrito.");
        }
    }

    return (
        <div className="p-4">
            <div className="card shadow-sm">
                <div className="row g-0">
                    <div className="col-md-4 text-center">
                        <img
                            src={producto.thumbnail}
                            alt={producto.title}
                            className="img-fluid p-3"
                            style={{ maxHeight: "300px", objectFit: "contain" }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <span className="badge bg-secondary mb-2">{producto.category}</span>
                            <h2>{producto.title}</h2>
                            <p>{producto.description}</p>
                            <p className="fs-4 fw-bold text-success">${producto.price.toFixed(2)}</p>

                            <p>
                                Stock: {producto.stock} unidades
                                {producto.stock < 10 && (
                                    <span className="badge bg-warning text-dark ms-2">
                                        ¡Últimas unidades!
                                    </span>
                                )}
                            </p>

                            <button
                                className="btn btn-primary me-2"
                                onClick={agregarAlCarrito}
                            >
                                Agregar
                            </button>
                            <Link to="/buscar" className="btn btn-outline-secondary">
                                Volver
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalleProducto;