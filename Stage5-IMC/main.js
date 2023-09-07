import { Modal } from './js/modal.js';

const form = document.getElementById('form-calculo-imc');
const inputPeso = document.getElementById('input-peso');
const inputAltura = document.getElementById('input-altura');
const btnCalcularImc = document.getElementById('btn-calcular-imc');

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
