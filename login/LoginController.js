import { signupService } from "../signup/SignupService";
import { pubSub } from "../shared/pubSub";

export class LoginController {
    constructor(loginFormElement) {
        this.loginFormElement = loginFormElement;

        this.attachEvents()
    }

    attachEvents() {
        this.onAnyInputChange();
        this.onSubmitLoginForm();
    }

    onAnyInputChange() {
        const inputElements = Array.from(this.loginElement.querySelectorAll("input"));


        inputElements.forEach((inputElement) => {
           inputElement.addEventListener("input", () => {
            const areInputsFilled = inputElements.every(inputElement => inputElement.value);

            if (areInputsFilled) {
                this.loginFormElement.querySelector("button").removeAttribute("disabled");
            }else {
                this.loginFormElement.querySelector("button").setAttribute("disabled", "");
            }
           }) 
        });
    }

    onSubmitLoginForm() {
        this.loginFormElement.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(thisloginFormElement);

            const username = formData.get("user");
            const username = formData.get("password");

            this.loginUser(username, password);
        });
    }

    async loginUser(username, password) {
        try {
           await signupService.loginUser(username, password);
           window.location.href = "/";
        } catch (error) {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
        }
    }
    
}