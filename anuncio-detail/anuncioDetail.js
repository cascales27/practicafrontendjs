import { AnuncioDetailController } from "../anuncio-detail/AnuncioDetailController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";

document.addEventListener("DOMContentLoaded", () => {
    const anuncioDetailElement = document.querySelector('.anuncio-detail');

    const notificationElement = document.querySelector(".notification");

    const notificationController = new NotificationController(notificationElement);

    const searchParams = new URLSearchParams(window.location.search);

    const anuncioId = searchParams.get('id');

    const anuncioDetailController = new AnuncioDetailController(anuncioDetailElement);
    anuncioDetailController.showAnuncio(anuncioId);

});