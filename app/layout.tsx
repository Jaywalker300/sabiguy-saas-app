import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/modal-provider'
import ToasterProvider from '@/components/toaster-provider'
import CrispChat from '@/components/crisp-chat'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SabiGuy',
  description: 'Your AI Co-Pilot on demand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <CrispChat/>
        <ModalProvider/>
        <ToasterProvider/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  )
}
