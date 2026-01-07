package com.saystreet.backend.security;

public class CpfValidator {
    public static boolean isValidCPF(String cpf) {
        // Remover caracteres não numéricos
        cpf = cpf.replaceAll("[^0-9]", "");

        // Verificar se o CPF tem 11 dígitos
        if (cpf.length() != 11) {
            return false;
        }

        // Verificar se o CPF não é uma sequência de números repetidos
        if (cpf.equals("00000000000") || cpf.equals("11111111111") || cpf.equals("22222222222") ||
            cpf.equals("33333333333") || cpf.equals("44444444444") || cpf.equals("55555555555") ||
            cpf.equals("66666666666") || cpf.equals("77777777777") || cpf.equals("88888888888") ||
            cpf.equals("99999999999")) {
            return false;
        }

        // Verificar o primeiro dígito verificador
        int sum = 0;
        for (int i = 0; i < 9; i++) {
            sum += (10 - i) * (cpf.charAt(i) - '0');
        }
        int firstVerifier = 11 - (sum % 11);
        if (firstVerifier == 10 || firstVerifier == 11) {
            firstVerifier = 0;
        }
        if (firstVerifier != cpf.charAt(9) - '0') {
            return false;
        }

        // Verificar o segundo dígito verificador
        sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += (11 - i) * (cpf.charAt(i) - '0');
        }
        int secondVerifier = 11 - (sum % 11);
        if (secondVerifier == 10 || secondVerifier == 11) {
            secondVerifier = 0;
        }
        return secondVerifier == cpf.charAt(10) - '0';
    }
}
