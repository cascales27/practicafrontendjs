import { decodeToken } from "../utils/decodeToken.js";
import { pubSub } from "../shared/pubSub.js";
import { crearService } from "./CrearService.js";
import AnuncioService from "../anuncio-list/AnuncioService.js";

export class CrearController {
    constructor(crearElement) {
        this.crearElement = crearElement;

        this.attachEvents();
    }

    attachEvents() {
        this.onAnyInputChange();
    }

    onAnyInputChange() {
        const inputElements = Array.from(this.crearElement.querySelectorAll("input"));

        inputElements.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
               const areInputsFilled = inputElements.every((inputElement) => inputElement.value);

               if (areInputsFilled) {
                   this.crearElement.querySelector("button").removeAttribute("disabled");
               }else {
                this.crearElement.querySelector("button").setAttribute("disabled", "");
               }
            });
        });
    }

    onSubmitForm() {
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();

            const datosFormulario = new DatosFormulario(this.formElement);

            this.anuncioNuevo(datosFormulario);
        });
    }

    async anuncioNuevo(datosFormulario) {
        try {
            await AnuncioService.anuncioNuevo(datosFormulario);
            window.location.href = "/";
        } catch (error) {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
        }
    }
}