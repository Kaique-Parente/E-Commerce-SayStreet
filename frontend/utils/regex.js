export const formatCpf = (value) => {
    const onlyNumbers = value.replace(/\D/g, '').slice(0, 11); // Máximo 11 dígitos

    return onlyNumbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const validateCpf = (value) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(value);
};

export const formatCep = (value) => {
    const onlyNumbers = value.replace(/\D/g, '').slice(0, 8);

    return onlyNumbers.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
};

export const validateCep = (value) => {
    const cepRegex = /^\d{5}-\d{3}$/;
    return cepRegex.test(value);
};

export const formatNumeroCartao = (value) => {
    const onlyNumbers = value.replace(/\D/g, '').slice(0, 16); // Máximo de 16 dígitos
    return onlyNumbers
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2');
};

export const formatNomeCartao = (value) => {
    const onlyLettersAndSpaces = value.replace(/[^A-Za-z\s]/g, '').slice(0, 18); // Máximo de 18 caracteres (letras e espaços)
    return onlyLettersAndSpaces;
};

export const formatValidadeCartao = (value) => {
    const onlyNumbers = value.replace(/\D/g, '').slice(0, 4); // Máximo de 4 dígitos
    return onlyNumbers
        .replace(/(\d{2})(\d)/, '$1/$2');
};

export const formatCvvCartao = (value) => {
    const onlyNumbers = value.replace(/\D/g, '').slice(0, 3); // Máximo de 3 dígitos
    return onlyNumbers;
};


