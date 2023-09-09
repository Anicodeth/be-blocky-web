'use client'
import { NextUIProvider } from '@nextui-org/react'
import { AuthContextProvider } from './context/auth-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </NextUIProvider>
  )
}