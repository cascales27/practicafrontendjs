import { CrearController } from "./CrearController.js";
import { NotificationController } from "../shared/notification/NotificationController.js"

document.addEventListener('DOMContentLoaded', () => {
    const crearFormElement = document.querySelector("form");
    const notificationElement = document.querySelector(".notification");

    const crearController = new CrearController(crearFormElement);

    const notificationController = new NotificationController(notificationElement);

});