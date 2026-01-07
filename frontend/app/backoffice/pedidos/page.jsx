import { Suspense } from "react";
import PedidosClient from "./PedidosClient";

export default function Pedidos() {
    return (
        <Suspense fallback={<div>Carregando Pedidos...</div>}>
            <PedidosClient />
        </Suspense>
    );
}