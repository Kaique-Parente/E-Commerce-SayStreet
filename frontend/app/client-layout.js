'use client';

import { CarrinhoProvider } from "@/context/CarrinhoContext";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <CarrinhoProvider>
        {children}
      </CarrinhoProvider>
    </SessionProvider>
  );
}