package com.saystreet.backend.security;

public enum TipoPagamento {

    CARTAO, PIX, BOLETO;

    public double aplicarDesconto(double valorOriginal) {
        switch (this) {
            case PIX:
                return valorOriginal * 0.98;
            case BOLETO:
                return valorOriginal * 0.95;
            case CARTAO:
                return valorOriginal;
            default:
                return valorOriginal;

        }
    }
}
