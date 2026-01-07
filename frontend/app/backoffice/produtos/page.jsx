import { Suspense } from "react";
import ProdutosClient from "./ProdutosClient";

export default function Produtos() {
    return (
        <Suspense fallback={<div>Carregando produtos...</div>}>
            <ProdutosClient />
        </Suspense>
    );
}
