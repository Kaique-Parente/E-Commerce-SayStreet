import { Suspense } from "react";
import CadastrarProdutoClient from "./CadastrarProdutoClient";

export default function CadastrarProduto() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <CadastrarProdutoClient />
        </Suspense>
    );
}