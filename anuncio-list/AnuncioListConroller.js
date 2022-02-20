
import AnuncioService from "./AnuncioService.js";
import { buildAnuncioView, buildAnuncioListSpinnerView, buildNotFoundAnunciosView } from "./AnuncioView.js";
import { pubSub } from "../shared/pubSub.js";


export class AnuncioListController {
    anuncioListElement = null;

    constructor(anuncioListElement, notificationController) {
        this.anuncioListElement = anuncioListElement;
        this.notificationController = notificationController;
    }

    async showAnuncios() {
        let anuncios;

        const spinnerTemplate = buildAnuncioListSpinnerView();
    
        this.anuncioListElement.innerHTML = spinnerTemplate;
    
        try {
            anuncios = await AnuncioService.getAnuncios();

            if (anuncios.length === 0) {
                this.anuncioListElement.innerHTML = buildNotFoundAnunciosView();
            }
    
        for (const anuncio of anuncios) {
            const anuncioArticleElement = document.createElement("article");
            const anuncioTemplate = buildAnuncioView(anuncio);
        
            anuncioArticleElement.innerHTML = anuncioTemplate;
        
            this.anuncioListElement.appendChild(anuncioArticleElement);
            }
    
        
        } catch (error) {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, "No se han podido cargar los anuncios");
        } finally {
            const loader = this.anuncioListElement.querySelector(".loader");
            loader.classList.toggle("hidden");
        }
    }
}
 
