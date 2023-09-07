export const Modal = {
    wrapper: document.getElementById('modal-wrapper'),
    modalValorImc: document.getElementById('valor-calculo-imc'),
    btnClose: document.getElementById('btn-close-modal'),

    open() {
        this.wrapper.classList.add('show');
    },
    close(){
        this.wrapper.classList.remove('show');
    }
}

// arrow function close modal
Modal.btnClose.onclick = () => Modal.close();