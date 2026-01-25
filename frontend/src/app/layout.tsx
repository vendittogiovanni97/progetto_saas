import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans } from "next/font/google";
import { AuthProvider } from "@/providers/AuthProvider";
import MuiThemeProvider from "@/providers/MuiThemeProvider";
import "./globals.css";


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Gestionale SaaS",
  description: "Gestionale SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${spaceGrotesk.variable} ${notoSans.variable}`} suppressHydrationWarning>
        <AuthProvider>
          <MuiThemeProvider>
            {children}
          </MuiThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
