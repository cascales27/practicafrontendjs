export function buildAnuncioView(anuncio) {
    const currentTime = new Date(anuncio.date).toLocaleString();
    const anuncioDetailView = buildAnuncioDetailView(anuncio);

    let anuncioTemplate = `
        <a href="/anuncioDetail.html?id=${anuncio.id}">
          ${anuncioDetailView}
        </a>    
   `;
   return anuncioTemplate;
}

export function buildAnuncioDetailView(anuncio) {
  const currentTime = new Date(anuncio.date).toLocaleString();

  let anuncioTemplate = `
     <p>${currentTime}</p>
     <h1>${anuncio.nombre}</h1>
     <p>${anuncio.descripcion}</p>
     <p>${anuncio.precio}</p>
     <p>${anuncio.compraventa}</p>
     <img src="${anuncio.image}"></img>
     
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