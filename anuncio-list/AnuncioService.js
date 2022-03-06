import { signupService } from "../signup/SignupService.js";

export default {
    async getAnuncios() {
        const url = 
            "http://localhost:8000/api/anuncios";
        
        let response;
        let anuncios;
        
        try {
            response = await fetch(url);
        } catch (error) {
            throw new Error("No se puede mostrar los anuncios")
        }

        if (!response.ok) {
            throw new Error("Anuncios no encontrados")
        }
         
        try {
            anuncios = await response.json();
        } catch (error) {
            throw new Error("No se puede transformar la respuesta a json")
        }
        

        const transformedAnuncios = this.transformAnuncios(anuncios);

        return transformedAnuncios;
    
    },

    async getAnuncio(anuncioId) {
        const url = 
            `http://localhost:8000/api/anuncios/${anuncioId}`;
        
        let response;
        let anuncio;
        
        try {
            response = await fetch(url);
        } catch (error) {
            throw new Error("No se puede mostrar el anuncio")
        }

        if (!response.ok) {
            throw new Error("Anuncio no encontrado")
        }
         
        try {
            anuncio = await response.json();
        } catch (error) {
            throw new Error("No se puede transformar la respuesta a json")
        }
        

        const transformedAnuncio = this.transformAnuncios([anuncio]);

        return transformedAnuncio[0];
    },

    async deleteAnuncio(anuncioId) {
        const url = 
            `http://localhost:8000/api/anuncios/${anuncioId}`;
        
        let response;
        
        try {
            response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer" + signupService.getLoggedUser(),
                }
            });
        } catch (error) {
            throw new Error("No se puede borrar el anuncio")
        }

        if (!response.ok) {
            throw new Error("Anuncio no encontrado")
        }
         
       
    },

    transformAnuncios(anuncios) {
       return anuncios.map((anuncio) => {
            const transformedAnuncio = {
                nombre: anuncio.nombre,
                descripcion: anuncio.descripcion,
                precio: anuncio.precio,
                compraventa: anuncio.compraventa,
                date: anuncio.updateAt,
                id: anuncio.id,
                image: anuncio.image || 'https://s03.s3c.es/imag/_v0/770x420/e/c/9/490x_wallapop-logo.jpg',
            };

            return transformedAnuncio;
        })
    }
};