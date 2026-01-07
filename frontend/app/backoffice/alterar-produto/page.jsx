import { Suspense } from "react";
import AlterarProdutoClient from "./AlterarProdutoClient";

export default function AlterarProduto() {
    return (
        <Suspense fallback={<div>Carregando produto...</div>}>
            <AlterarProdutoClient />
        </Suspense>
    );
}