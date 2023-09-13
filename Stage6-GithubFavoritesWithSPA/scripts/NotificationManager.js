export class NotificationManager {
    static showNotification(isValid, message){

        this.app = document.getElementById("app");
        //console.log(this.app)

        this.createNotificationElement(isValid, message);
    }

    static closeNotification_() {
        const button = document.querySelector("button-open");
        const notification = document.querySelector(".notification");

        button.addEventListener('click', () => {
        notification.classList.toggle("show");
        })
    }

    static createNotificationElement(isValid, message) {
        let notificationElement = document.getElementById("notification");
        
        if (notificationElement != null){
            notificationElement.remove();
        }

        const div = document.createElement('div');
        
        div.innerHTML = this.getNotificationElement(isValid, message);
              
        this.app.append(div);
        notificationElement = document.getElementById("notification");

        this.notify(notificationElement);

        this.destroyNotificationElement(notificationElement);
    }

    static destroyNotificationElement(htmlElement) {
        setTimeout(() => {
            htmlElement?.remove();
        }, 5000);
    }

    static notify(htmlElement) {
        setTimeout(() => {
            htmlElement?.classList.add("show");
        }, 0);
    }

    static getNotificationElement(isValid, message) {
        return `<div id="notification" class="notification">
                    <h1 class="tittle-notification ${this.getClassNotification(isValid)}">${this.getTittleNotification(isValid)}</h1>
                    <hr class="hr-notification ${this.getClassNotification(isValid)}">
                    <p class="message-notification">${message}</p>
                </div>`; 
    }

    static getClassNotification(isValid) {
        return isValid ? 'success-notification' : 'error-notification';
    }

    static getTittleNotification(isValid) {
        return isValid 
                ? 'Sucesso 🚀'
                : 'Ocorreu um erro 🙁';
    }
}