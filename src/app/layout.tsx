import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Navbar className="absolute">
          <NavbarBrand>
            <p className="font-bold text-black">SIMULADOR DE MAIZ</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              
            </NavbarItem>
            
          </NavbarContent>
          <NavbarContent justify="end">
            
          </NavbarContent>
        </Navbar> */}
        {children}
      </body>
    </html>
  );
}
