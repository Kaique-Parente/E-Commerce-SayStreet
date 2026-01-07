import { Suspense } from "react";
import AlterarUserClient from "./AlterarUserClient";

export default function AlterarUser() {
    return (
        <Suspense fallback={<div>Carregando usuário...</div>}>
            <AlterarUserClient />
        </Suspense>
    );
}