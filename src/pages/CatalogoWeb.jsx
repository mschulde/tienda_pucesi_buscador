import { useState, useEffect } from 'react';
import CardProducto from '../components/CardProducto';

function CatalogoWeb({ agregarProducto }) {
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setProductos(datos.products);
                setCargando(false);
            })
            .catch(() => {
                setError("Error al cargar los productos");
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p className="p-4 fw-bold">Cargando productos...</p>;
    }

    if (error !== "") {
        return <p className="p-4 text-danger fw-bold">Error: {error}</p>;
    }

    return (
        <div className="bg-info p-4">
            <h2 className="mb-4 fw-bold">Catálogo Web</h2>
            <div className="row gap-3 ps-3">
                {productos.map((item) => (
                    <CardProducto
                        key={item.id}
                        producto={{
                            nombre: item.title,
                            precio: item.price,
                            disponible: item.stock > 0,
                            stock: item.stock,
                            imagen: item.thumbnail,
                            esLicor: false
                        }}
                        agregarProducto={agregarProducto}
                    />
                ))}
            </div>
        </div>
    );
}

export default CatalogoWeb;