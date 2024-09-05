import { Providers } from "@/redux/providers";
import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const lexend = Lexend_Deca({
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
  preload: true,
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
    <html lang="en">
      <body className={lexend.className}>
        <Toaster richColors />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
