const SCREEN_1_CLASS_NAME = '.screen-1';
const SCREEN_2_CLASS_NAME = '.screen-2';
const ID_SUCCESS_MESSAGE = 'successMessage';
const ID_ERROR_MESSAGE = 'errorMessage';
const ID_NUMERO_ADIVINHAR = 'input-numero-adivinhar';
const ID_BTN_TRY = 'btnTry'
const ID_BTN_AGAIN = 'btnAgain'

const screen1 = document.querySelector(SCREEN_1_CLASS_NAME);
const screen2 = document.querySelector(SCREEN_2_CLASS_NAME);
const btnTry = document.getElementById(ID_BTN_TRY);
const btnAgain = document.getElementById(ID_BTN_AGAIN);
const inputNumeroAdivinhar = document.getElementById(ID_NUMERO_ADIVINHAR);
const errorMessageParagraph = document.getElementById(ID_ERROR_MESSAGE);

var quantidadeDeTentativas = 1; 


btnTry.addEventListener('click', tentarAdivinhar);
btnAgain.addEventListener('click', jogarNovamente);
document.addEventListener('keydown', function(e){
    if (e.key == 'Enter' && screen1.classList.contains('hide')){
        jogarNovamente(e);
    }
});


function alterarMensagemDeAcerto(quantidadeDeTentativas){
    let mensagem = `Acertou em ${quantidadeDeTentativas} ${quantidadeDeTentativas > 1 ? 'vezes' : 'vez'}`;
    document.getElementById(ID_SUCCESS_MESSAGE).innerText = mensagem;
    console.log(mensagem);
}

function jogarNovamente(event){
    toggleScreen();
    showMensagemDeErro(false);
    inputNumeroAdivinhar.value = 0;
    quantidadeDeTentativas = 1;
}

function tentarAdivinhar(event){
    event.preventDefault();
    showMensagemDeErro(false);

    if (valueOutOfRange(inputNumeroAdivinhar.value)){
        showMensagemDeErro(true);
        return;
    }

    let random = Math.round(Math.random() * 10);

    console.log(`Random: ${random} | Input: ${inputNumeroAdivinhar.value}`);

    if (Number(inputNumeroAdivinhar.value) == random){
        alterarMensagemDeAcerto(quantidadeDeTentativas);
        toggleScreen();
    }
    else {
        quantidadeDeTentativas++;   
    }
}

function showMensagemDeErro(showErrorMessage){
    if (showErrorMessage){
        errorMessageParagraph.classList.remove('hide');
    }
    if (!showErrorMessage){
        errorMessageParagraph.classList.add('hide');
    }
}

function toggleScreen(){
    screen1.classList.toggle('hide');
    screen2.classList.toggle('hide');
}

function valueOutOfRange(number) {
    return number < 0 || number > 10;
}