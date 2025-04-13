'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/ClientComponents/NavBar'
import { Sidebar } from '@/components/CoreUI/Sidebar'
import { Rubik } from 'next/font/google'

const rubik = Rubik({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    style: ['normal'],
    display: 'swap',
})

const Loading = () => (
    <div style={{
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <h1>Carregando...</h1>
    </div>
)  

export default function PerfilLayout({ children }) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const timeoutRef = useRef(null)

    const startLogoutTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            signOut({ callbackUrl: '/login' })
        }, 60 * 60 * 1000) // 1 hora
    }

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
            return
        }

        if (status === 'authenticated') {
            startLogoutTimer()

            const resetTimer = () => startLogoutTimer()

            window.addEventListener('mousemove', resetTimer)
            window.addEventListener('keydown', resetTimer)
            window.addEventListener('click', resetTimer)

            return () => {
                clearTimeout(timeoutRef.current)
                window.removeEventListener('mousemove', resetTimer)
                window.removeEventListener('keydown', resetTimer)
                window.removeEventListener('click', resetTimer)
            }
        }
    }, [status, router])

    if (status === 'loading') {
        return <Loading/>
    }

    const user = session?.user;

    return (
        <div className={rubik.className}>
            {status === "authenticated" && !user ? (
                <Loading/>
            ) : (
                <>
                    <NavBar />
                    <Sidebar />
                    <main>{children}</main>
                </>
            )}
        </div>
    )
}