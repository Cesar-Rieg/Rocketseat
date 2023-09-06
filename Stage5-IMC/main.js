const form = document.getElementById('form-calculo-imc');
const inputPeso = document.getElementById('input-peso');
const inputAltura = document.getElementById('input-altura');
const btnCalcularImc = document.getElementById('btn-calcular-imc');

const Modal = {
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

// arrow function
Modal.btnClose.onclick = () => Modal.close();

// arrow function
form.onsubmit = (event) => {
    event.preventDefault();

    const peso = inputPeso.value;
    const altura = inputAltura.value;

    let resultado = calcularImc(peso, altura);
    console.log(resultado);

    setMensagemDoModal(resultado);
    Modal.open();
}

function calcularImc(peso, altura){
    return Number((peso / ((altura / 100) ** 2)).toFixed(2));
}

function setMensagemDoModal(imc){
    Modal.modalValorImc.innerText = imc;
}
