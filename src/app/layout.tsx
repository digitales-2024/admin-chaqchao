import { Providers } from "@/redux/providers";
import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";

const lexend = Lexend_Deca({ subsets: ["latin"] });

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
