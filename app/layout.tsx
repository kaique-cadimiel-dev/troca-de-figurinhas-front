import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import '@/app/globals.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { SpotsProvider } from '@/context/SpotsContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trocakard - Locais de Troca de Figurinhas",
  description: "Encontre os melhores pontos de encontro para trocar figurinhas da Copa do Mundo 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50">
        <GluestackUIProvider mode="light">
          <SpotsProvider>
            {children}
          </SpotsProvider>
        </GluestackUIProvider>
      </body>
    </html>
  );
}
