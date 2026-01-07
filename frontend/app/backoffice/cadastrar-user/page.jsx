import { Suspense } from "react";
import CadastrarUserClient from "./CadastrarUserClient";

export default function CadastrarUser() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <CadastrarUserClient />
        </Suspense>
    );
}