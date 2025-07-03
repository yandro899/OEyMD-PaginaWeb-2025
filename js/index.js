import { getSubCategorias, getItemsByCategoria } from "../pages/catalogo/catalogo.js";

const subCategorias = getSubCategorias();
const container = document.getElementById("sliderSubCategoriasInner");

// Por cada grupo de 4 subcategorías, generamos un slide (col-md-3)
let chunkSize = 4;
for (let i = 0; i < subCategorias.length; i += chunkSize) {
  const grupo = subCategorias.slice(i, i + chunkSize);

  const itemSlide = document.createElement("div");
  itemSlide.className = `carousel-item ${i === 0 ? "active" : ""}`;

  const row = document.createElement("div");
  row.className = "row justify-content-center text-center align-items-center m-auto";

  grupo.forEach(subCategoria => {
    const productos = getItemsByCategoria(subCategoria);
    const img = productos?.imagen || "/assets/images/default.png";

    const col = document.createElement("div");
    col.className = "col-xs-12 col-sm-6 col-md-3 mb-4";

    col.innerHTML = `
      <div class="card border-0 shadow-sm h-100 text-white" style="background-color: #1e1e1e;">
        <img src="${img}" class="card-img-top p-3 imagen-fija" alt="${subCategoria}">
        <div class="card-body">
          <h5 class="card-title text-uppercase">${subCategoria}</h5>
        </div>
      </div>
    `;
    row.appendChild(col);
  });

  itemSlide.appendChild(row);
  container.appendChild(itemSlide);
}
