import AnuncioService from "../anuncio-list/AnuncioService.js";
import { buildAnuncioDetailView } from "../anuncio-list/AnuncioView.js";
import { pubSub } from "../shared/pubSub.js"; 
import { signupService } from "../signup/SignupService.js";
import { decodeToken } from "../utils/decodeToken.js";


export class AnuncioDetailController {
    constructor(anuncioDetailElement) {
        this.anuncioDetailElement = anuncioDetailElement;
        this.anuncio = null;

        
    }

    async showAnuncio(anuncioId) {
        if (!anuncioId) {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, "Id del anuncio no es valido");
            return;
        }
        try {
            this.anuncio = await AnuncioService.getAnuncio(anuncioId);
            const anuncioTemplate = buildAnuncioDetailView(this.anuncio);

            this.anuncioDetailElement.innerHTML = anuncioTemplate;
            this.handleDeleteButton();
        } catch (error) {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
        }
        
    }


    handleDeleteButton() {
       const loggedUserToken = signupService.getLoggedUser();

       

       if (loggedUserToken) {
           const userInfo = decodeToken(loggedUserToken);

           const isOwner = this.isAnuncioOwner(userInfo.userId);

           if (isOwner) {
               this.drawDeleteButton();
           }
       }
    }

    isAnuncioOwner(userId) {
        return userId === this.anuncio.userId;
    }

    drawDeleteButton() {
        const buttonElement = document.createElement("button");
        buttonElement.textContent = "Borrar anuncio";
    
        this.anuncioDetailElement.appendChild(buttonElement);
        this.AnuncioDetailElement.addEventListener("click", () => {
            this.deleteAnuncio();
        });
    
       
    }
    async deleteAnuncio() {
        const shouldDelete = window.confirm('Estas seguro de continuar?? Se borrará el anuncio');
    
        if ( shouldDelete) {
            try {
                await AnuncioService.deleteAnuncio(this.anuncio.id);
                window.location.href = '/';
            } catch (error) {
                
            }
            
        }
    }
}

