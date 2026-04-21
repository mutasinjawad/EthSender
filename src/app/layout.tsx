import { Inter, Fira_Code } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { type ReactNode } from "react";

import { Providers } from "./providers";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "AirSend - Token Distribution Tool for Ethereum",
  description: "Token Distribution Tool for Ethereum",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export default function RootLayout(props: {children: ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${inter.variable} ${firaCode.variable}`}>
        <Providers>
          <Header />
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
