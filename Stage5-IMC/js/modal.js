export const Modal = {
    wrapper: document.getElementById('modal-wrapper'),
    modalValorImc: document.getElementById('valor-calculo-imc'),
    btnClose: document.getElementById('btn-close-modal'),

    open() {
        this.wrapper.classList.add('show');
    },
    close(){
        this.wrapper.classList.remove('show');
    },
    setValorDoImc(imc){
        this.modalValorImc.innerText = imc;
    }
}

// arrow function close modal
Modal.btnClose.onclick = () => Modal.close();

window.addEventListener('keydown', handleKeydown)

/*
window.onkeydown = handleKeydown;

poderia fazer dessa forma, mas o evento "onKeydown" só pode ser usado uma vez na aplicação, 
ou seja, caso tiver outro evento "onKeydown", 
a aplicação irá considerar o ultimo método carreagado
*/


function handleKeydown(event){
    if (event.key === 'Escape')
        Modal.close();
}
