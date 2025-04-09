package com.saystreet.backend.security;

public class NameValidator {
    
    public static boolean validaNome(String nome){
        if(nome == null || nome.trim().isEmpty()){
            return false;
        }

        String[] palavras = nome.trim().split("\\s+");

        if(palavras.length < 2 ){
            return false;
        }

        for(String palavra : palavras){
            if(palavra.length() < 3){
                return false;
            }
        }
        return true;
    }
}
