import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RootProvider } from "fumadocs-ui/provider/next";
import localFont from "next/font/local";

import { Navbar } from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const METADATA: Metadata = {
  title: "fried-ui docs",
  description: "Documentation for fried-ui component library",
};

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout(props: Readonly<RootLayoutProps>): React.JSX.Element {
  const { children } = props;
  const bodyClassName = `${geistSans.variable} ${geistMono.variable} font-sans antialiased`;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bodyClassName}>
        <RootProvider>
          <Navbar />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}

export default RootLayout;
