"use client";

import { Sidebar } from '@/components/CoreUI/Sidebar';
import '@coreui/coreui/dist/css/coreui.min.css';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Perfil() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const timeoutRef = useRef(null);

    // Função que faz logout
    const startLogoutTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            signOut();
        }, 60 * 60 * 1000);
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
            return;
        }

        if (status === "authenticated") {
            startLogoutTimer();

            const resetTimer = () => startLogoutTimer();

            window.addEventListener("mousemove", resetTimer);
            window.addEventListener("keydown", resetTimer);
            window.addEventListener("click", resetTimer);

            return () => {
                clearTimeout(timeoutRef.current);
                window.removeEventListener("mousemove", resetTimer);
                window.removeEventListener("keydown", resetTimer);
                window.removeEventListener("click", resetTimer);
            };
        }
    }, [status, router]);

    if (status === "loading") return <p>Carregando...</p>;

    const user = session?.user;

    /*
        <h1>Perfil do Usuário</h1>
        <p><strong>Nome:</strong> {user?.nome}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>CPF:</strong> {user?.cpf}</p>
        <p><strong>Data de Nascimento:</strong> {user?.dataNascimento}</p>
        <p><strong>Gênero:</strong> {user?.genero}</p>
    */

    return (
        <div style={{ padding: "2rem" }}>
            {!user ? (
                <>
                    <h1>Carregando</h1>
                </>
            ) : (
                <>
                    <Sidebar/>
                </>
            )}
        </div>
    );
}