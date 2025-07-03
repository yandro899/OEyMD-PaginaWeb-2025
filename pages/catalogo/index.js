import * as catalogo from './catalogo.js';

function getSelectValues(selectElement) {
    return Array.from(selectElement.options)
        .filter(option => option.selected)
        .map(option => option.value);
}

function crearBotonPaginador(texto, onClick, disabled = false) {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.classList.add('btn', 'btn-sm', 'btn-primary', 'border');
    if (disabled) {
        btn.disabled = true;
        btn.classList.add('btn-secondary');
    };
    btn.addEventListener('click', onClick);
    return btn;
}

function renderizarPaginacion() {
    const paginadores = document.querySelectorAll('[data-grupo="paginador"]');
    if (!paginadores || paginadores.length === 0) return;

    const totalPaginas = Math.ceil(itemsFiltrados.length / itemsPorPagina);

    paginadores.forEach(paginador => {
        paginador.innerHTML = '';
        paginador.classList.add('d-flex', 'justify-content-center', 'my-3', 'gap-2', 'flex-wrap');

        // ⏮ Ir al inicio
        const btnInicio = crearBotonPaginador('⏮', () => obtenerElementos(1), paginaActual === 1);
        paginador.appendChild(btnInicio);

        // ◀️ Anterior
        const btnAnterior = crearBotonPaginador('◀', () => obtenerElementos(paginaActual - 1), paginaActual === 1);
        paginador.appendChild(btnAnterior);

        // Números
        for (let i = 1; i <= totalPaginas; i++) {
            const btn = crearBotonPaginador(i, () => obtenerElementos(i), i === paginaActual);
            paginador.appendChild(btn);
        }

        // ▶️ Siguiente
        const btnSiguiente = crearBotonPaginador('▶', () => obtenerElementos(paginaActual + 1), paginaActual === totalPaginas);
        paginador.appendChild(btnSiguiente);

        // ⏭ Ir al final
        const btnFin = crearBotonPaginador('⏭', () => obtenerElementos(totalPaginas), paginaActual === totalPaginas);
        paginador.appendChild(btnFin);
    });
}

function obtenerCategorias() {
    const contenedor = document.getElementById('categorias');
    contenedor.innerHTML = '';

    const select = document.createElement('select');
    // select.onclick = () => obtenerElementos();
    select.multiple = true;
    select.name = 'categorias[]';
    select.classList.add('form-control');

    const values = catalogo.getCategorias();
    values.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        select.appendChild(option);
    });

    contenedor.appendChild(select);
}

function obtenerSubCategorias() {
    const contenedor = document.getElementById('subcategorias');
    contenedor.innerHTML = '';

    const select = document.createElement('select');
    // select.onclick = () => obtenerElementos();
    select.multiple = true;
    select.name = 'subcategorias[]';
    select.classList.add('form-control');

    const values = catalogo.getSubCategorias();
    values.forEach(subCategoria => {
        const option = document.createElement('option');
        option.value = subCategoria;
        option.textContent = subCategoria;
        select.appendChild(option);
    });

    contenedor.appendChild(select);
}

function obtenerElementos(pagina = 1) {
    const elementos = document.getElementById('catalogo');
    const categorias = getSelectValues(document.querySelector('#categorias select'));
    const subcategorias = getSelectValues(document.querySelector('#subcategorias select'));

    itemsFiltrados = catalogo.getItems(categorias, subcategorias);

    paginaActual = pagina;
    elementos.innerHTML = '';

    const inicio = (pagina - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const itemsPagina = itemsFiltrados.slice(inicio, fin);

    itemsPagina.forEach(item => {
        const itemElement = crearItemElement(item);
        elementos.appendChild(itemElement);
    });

    renderizarPaginacion();
}

function crearItemElement(item) {
    // <div class="item features-image col-12 col-md-6 col-lg-3">
    const itemElement = document.createElement('div');
    itemElement.classList.add('item', 'features-image', 'col-xxl-3', 'col-xl-3', 'col-lg-4', 'col-md-6', 'col-sm-12');

    // <div class="item-wrapper">
    const wrapper = document.createElement('div');
    wrapper.classList.add('item-wrapper');

    // <div class="item-img"><img ...></div>
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('item-img');

    const img = document.createElement('img');
    img.src = item.imagen;
    img.alt = item.alt || 'Imagen del producto';
    img.classList.add('img-fluid');
    imgDiv.appendChild(img);

    // <div class="item-content">
    const content = document.createElement('div');
    content.classList.add('item-content');

    // <h5 class="item-title mbr-fonts-style display-5"><strong>...</strong></h5>
    const title = document.createElement('h5');
    title.classList.add('item-title', 'mbr-fonts-style', 'display-5');

    const strong = document.createElement('strong');
    strong.textContent = item.nombre;
    title.appendChild(strong);

    // <h6 class="item-subtitle mbr-fonts-style display-7">$25.000</h6>
    const subtitle = document.createElement('h6');
    subtitle.classList.add('item-subtitle', 'mbr-fonts-style', 'display-7');
    subtitle.textContent = `$${item.precio}`;

    // <p class="mbr-text mbr-fonts-style display-7">Descripción</p>
    const description = document.createElement('p');
    description.classList.add('mbr-text', 'mbr-fonts-style', 'display-7');
    description.textContent = item.descripcion;

    // <div class="mbr-section-btn item-footer"><a href="..." class="btn ...">Comprar</a></div>
    const footer = document.createElement('div');
    footer.classList.add('mbr-section-btn', 'item-footer');

    const boton = document.createElement('a');
    boton.classList.add('btn', 'item-btn', 'btn-primary', 'display-7');
    boton.href = item.enlace || '#';
    boton.textContent = 'Comprar';
    footer.appendChild(boton);

    const botonProducto = document.createElement('button');
    botonProducto.classList.add('btn', 'btn-outline-secondary', 'ms-2');
    botonProducto.textContent = 'Ver producto';
    botonProducto.setAttribute('data-bs-toggle', 'modal');
    botonProducto.setAttribute('data-bs-target', '#modal-producto');

    // Evento que carga el contenido dinámico
    botonProducto.addEventListener('click', () => {
        const datos = catalogo.getItem(item.id);
        if (!datos) return;

        const modalTitle = document.getElementById('modal-producto-label');
        const modalBody = document.getElementById('modal-producto-body');

        modalTitle.textContent = datos.nombre;

        const categoriaBadge = `<span class="badge bg-primary me-1">${datos.categoria}</span>`;
        const subCategoriasBadges = (datos.sub_categoria || [])
            .map(sub => `<span class="badge bg-secondary me-1">${sub}</span>`)
            .join('');

        const especificacionesHTML = datos.especificaciones
            ? `<div class="mb-3">
              <strong>Especificaciones:</strong>
              <ul class="mb-0">
                  ${Object.entries(datos.especificaciones).map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('')}
              </ul>
           </div>`
            : '';

        modalBody.innerHTML = `
        <div class="col-md-5">
            <img src="${datos.imagen}" alt="Imagen del producto" class="img-fluid rounded">
        </div>
        <div class="col-md-7">
            <p class="mb-2"><strong>Descripción:</strong> ${datos.descripcion}</p>
            <p class="mb-2"><strong>Precio:</strong> $${datos.precio}</p>
            <p class="mb-2"><strong>Stock Disponible:</strong> ${datos.stock}</p>
            ${especificacionesHTML}
            <div class="mt-3">
                ${categoriaBadge + subCategoriasBadges}
            </div>
        </div>
    `;

        const modalEl = document.getElementById('modal-producto');
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    });

    footer.appendChild(botonProducto);

    const tags = document.createElement('div');
    tags.classList.add('mt-3');
    const categoriaBadge = `<span class="badge bg-primary me-1">${item.categoria}</span>`;
    const subCategoriasBadges = (item.sub_categoria || [])
        .map(sub => `<span class="badge bg-secondary me-1">${sub}</span>`)
        .join('');
    tags.innerHTML = categoriaBadge + subCategoriasBadges;

    content.appendChild(title);
    content.appendChild(subtitle);
    content.appendChild(description);
    content.appendChild(tags);
    content.appendChild(footer);

    wrapper.appendChild(imgDiv);
    wrapper.appendChild(content);
    itemElement.appendChild(wrapper);

    return itemElement;
}

function emptyFilter() {
    const categoriasSelect = document.querySelector('#categorias select');
    const subcategoriasSelect = document.querySelector('#subcategorias select');
    categoriasSelect.selectedIndex = -1;
    subcategoriasSelect.selectedIndex = -1;
    obtenerElementos();
};

// export function limpiarElementos() {
//     const elementos = document.getElementById('catalogo');
//     while (elementos.firstChild) {
//         elementos.removeChild(elementos.firstChild);
//     }
// };


let paginaActual = 1;
const itemsPorPagina = 12;
let itemsFiltrados = [];


document.getElementById('btn-buscar').addEventListener('click', () => obtenerElementos(1));
document.getElementById('btn-limpiar').addEventListener('click', emptyFilter);
obtenerCategorias();
obtenerSubCategorias();
document.addEventListener('DOMContentLoaded', () => {
    obtenerElementos(1);
});