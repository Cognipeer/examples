import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CognipeerProvider } from "@/context/CognipeerContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cognipeer Chat Example",
  description: "A chat interface example using Cognipeer APIs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <CognipeerProvider>
          {children}
        </CognipeerProvider>
      </body>
    </html>
  );
}
