import { Modal } from './js/modal.js';
import { Notification } from './js/notification.js';
import { 
    calcularImc as CalcularImc, 
    isNotANumber as IsNotANumber
} from './js/utils.js';

const form = document.getElementById('form-calculo-imc');
const inputPeso = document.getElementById('input-peso');
const inputAltura = document.getElementById('input-altura');
const btnCalcularImc = document.getElementById('btn-calcular-imc');

inputPeso.oninput = () => Notification.close();
inputAltura.oninput = () => Notification.close();

// arrow function
form.onsubmit = (event) => {
    event.preventDefault();
    Notification.close();

    const peso = inputPeso.value;
    const altura = inputAltura.value;

    if (IsNotANumber(peso) || IsNotANumber(altura)){
        Notification.open();
        return;
    }

    let resultado = CalcularImc(peso, altura);
    console(resultado);

    Modal.setValorDoImc(resultado);
    Modal.open();
}

function console(mensagem){
    console.log(`(console.log(valor)) Exibe um valor no console: ${mensagem}`);
    console.info(`(console.info(mensagem)) Exibe uma mensagem informativa: ${mensagem}`);
    console.warn(`(console.warn(aviso)) Exibe um aviso com ícone de alerta: ${mensagem}`);
    console.error(`(console.error(erro)) Exibe uma mensagem de erro com ícone de erro: ${mensagem}`);
    console.assert(`(console.assert(condicao, mensagem)) Exibe uma mensagem de erro se a condição for falsa: `, false);
    console.clear(`(console.clear()) Limpa o console`);
    console.trace(`(console.trace()) Exibe a pilha de chamadas de função`);
    console.group(`(console.group()) Agrupa as mensagens no console: ${mensagem}`);
    console.groupEnd(`(console.groupEnd()) Agrupa as mensagens no console: ${mensagem}`);
    console.count(`console.count(label)) Conta o número de vezes qye esse ponto de códgo foi ancalçado`);
}

