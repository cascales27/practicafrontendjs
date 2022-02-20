export function buildAnuncioView(anuncio) {
    const currentTime = new Date(anuncio.updateAt).toLocaleString();

    let anuncioTemplate = `
        <a href="/anuncioDetail.html?id=${anuncio.id}">
       <h1>${anuncio.nombre}</h1>
       <p>${anuncio.descripcion}</p>
       <p>${anuncio.precio}</p>
       <p>${anuncio.compraventa}</p>
       <img src="${anuncio.image}"></img>
       <p>${currentTime}</p>
        </a>    
   `;
   return anuncioTemplate;
}

export function buildAnuncioListSpinnerView() {
    return `<div class="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>`;
  }

  export function buildNotFoundAnunciosView() {
      return `
      <h1>Vaya por Dios, no hay ningún anuncio!!!</h1>
      `;
  }