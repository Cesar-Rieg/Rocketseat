export const Notification = {
    element: document.getElementById('notification'),
    open(){
        Notification.element.classList.add('show');
    },
    close(){
        Notification.element.classList.remove('show');
    }
}
