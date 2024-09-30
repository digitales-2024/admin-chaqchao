import { Providers } from "@/redux/providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";

import "./globals.css";
import { ApiStatus } from "@/components/common/ApiStatus";

const lexend = localFont({
  src: "./fonts/lexend-deca-latin-400-normal.woff",
  variable: "--font-lexend-deca",
});

export const metadata: Metadata = {
  title: "Chaqchao - Panel Administrativo",
  description: "Panel administrativo de Chaqchao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={lexend.className}>
        <Toaster
          richColors
          position="top-center"
          toastOptions={{
            style: {
              background: "#fff",
              borderBlockColor: "#e2e8f0",
            },
          }}
          closeButton
        />
        <Providers>
          <ApiStatus />
          {children}
        </Providers>
      </body>
    </html>
  );
}
