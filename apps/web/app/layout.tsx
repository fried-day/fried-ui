import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "fried-ui",
  description: "fried-ui component library",
};

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout(props: Readonly<RootLayoutProps>) {
  const { children } = props;
  const bodyClassName = `${geistSans.variable} ${geistMono.variable} font-sans antialiased`;

  return (
    <html lang="en">
      <body className={bodyClassName}>{children}</body>
    </html>
  );
}

export default RootLayout;
