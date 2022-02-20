import  { NotificationController } from "../shared/notification/NotificationController.js";
import { AnuncioListController } from "./AnuncioListConroller.js";


document.addEventListener('DOMContentLoaded', async () => {


  const anuncioListElement = document.querySelector(".anuncio-list");

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(notificationElement);
  

  const anuncioListController = new AnuncioListController(anuncioListElement);
  await anuncioListController.showAnuncios();
});