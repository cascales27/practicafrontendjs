class CrearAnuncio {
    constructor() {}

    async crearAnuncio(datosFormulario) {
        const body = {
            imagen: datosFormulario.get("imagen")|| 'https://s03.s3c.es/imag/_v0/770x420/e/c/9/490x_wallapop-logo.jpg¡',
            nombre: datosFormulario.get("nombre"),
            descripcion: datosFormulario.get("descripccion"),
            precio: datosFormulario.get("precio"),
            compra_o_venta: datosFormulario.get("compra o venta")
        }

        const response = await fetch("http://localhost:8000/api/anuncios", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + localStorage.getItem("jwt")
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
    };

    
}

export const crearService = new CrearAnuncio();