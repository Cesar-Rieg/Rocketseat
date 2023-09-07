export function isNotANumber(value){
    return isNaN(value) || value == "";
}

export function calcularImc(peso, altura){
    return Number((peso / ((altura / 100) ** 2)).toFixed(2));
}