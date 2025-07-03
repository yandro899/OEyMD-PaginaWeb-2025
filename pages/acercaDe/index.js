import { integrantes } from './data.js';

const container = document.getElementById("integrantesContainer");

container.innerHTML = '';

integrantes.forEach(persona => {
    const item = document.createElement('div');
    item.classList.add('item', 'features-image', 'col-12', 'col-sm-6', 'col-md-4');

    item.innerHTML = `
        <div class="item-wrapper">
            <div class="item-img mb-3">
                <img src="${persona.foto}" alt="${persona.alt || persona.nombre}" title="">
            </div>
            <div class="item-content align-left">
                <h5 class="item-title mbr-fonts-style display-5"><strong>${persona.nombre}</strong></h5>
                <h6 class="item-subtitle mbr-fonts-style mb-3 display-7">${persona.rol}</h6>
            </div>
        </div>
    `;

    container.appendChild(item);
});
