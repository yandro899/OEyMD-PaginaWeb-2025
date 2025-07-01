import { productos, categorias, sub_categorias } from './data.js';

export function getCategorias() {
    return categorias;
};

export function getSubCategorias() {
    return sub_categorias;
};

export function getItems(categorias = null, sub_categorias = null, precioMax = null, precioMin = null) {
    const values = productos.filter(item => {
        let matchesCategoria = true;
        let matchesSubCategoria = true;
        let matchesPrecioMax = true;
        let matchesPrecioMin = true;

        if (Array.isArray(categorias) && categorias.length > 0) {
            matchesCategoria = categorias.includes(item.categoria);
        }

        if (Array.isArray(sub_categorias) && sub_categorias.length > 0) {
            const itemSubCategorias = Array.isArray(item.sub_categoria)
                ? item.sub_categoria
                : [item.sub_categoria];

            matchesSubCategoria = sub_categorias.every(sc => itemSubCategorias.includes(sc));
        }

        if (precioMax !== null) {
            matchesPrecioMax = item.precio <= precioMax;
        }

        if (precioMin !== null) {
            matchesPrecioMin = item.precio >= precioMin;
        }

        return matchesCategoria && matchesSubCategoria && matchesPrecioMax && matchesPrecioMin;
    }).map(item => ({
        id: item.id,
        nombre: item.nombre,
        categoria: item.categoria,
        sub_categoria: item.sub_categoria,
        descripcion: item.descripcion,
        precio: item.precio,
        stock: item.stock > 0,
        imagen: item.imagen,
    }));

    return values;
} 

export function getItem(id) {
    const item = productos.find(item => item.id === id);
    if (item) {
        return {
            id: item.id,
            nombre: item.nombre,
            categoria: item.categoria,
            sub_categoria: item.sub_categoria,
            descripcion: item.descripcion,
            precio: item.precio,
            stock: item.stock,
            imagen: item.imagen,
            especificaciones: item.especificaciones
        };
    }
    return null;
};

export function getItemByName(nombre) {
    const lowerNombre = nombre.toLowerCase();
    const item = productos.find(item => item.nombre.toLowerCase().includes(lowerNombre));

    if (item) {
        return {
            id: item.id,
            nombre: item.nombre,
            categoria: item.categoria,
            sub_categoria: item.sub_categoria,
            descripcion: item.descripcion,
            precio: item.precio,
            stock: item.stock,
            imagen: item.imagen,
            especificaciones: item.especificaciones
        };
    }
    return null;
}
