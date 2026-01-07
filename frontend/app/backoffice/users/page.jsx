import { Suspense } from "react";
import UsersClient from "./UsersClient";

export default function Users() {
    return (
        <Suspense fallback={<div>Carregando usuário...</div>}>
            <UsersClient />
        </Suspense>
    );
}