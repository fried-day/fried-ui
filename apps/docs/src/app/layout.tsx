import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RootProvider } from "fumadocs-ui/provider/next";
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
  title: {
    default: "fried-ui",
    template: "%s — fried-ui",
  },
  description:
    "Same component in React. Same class in HTML. One source of truth. Compound primitives, dual selectors, dark mode, and zero runtime.",
  metadataBase: new URL("https://fried-ui.vercel.app"),
  openGraph: {
    title: "fried-ui",
    description:
      "Same component in React. Same class in HTML. One source of truth. Compound primitives, dual selectors, dark mode, and zero runtime.",
    siteName: "fried-ui",
    type: "website",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = (props: Readonly<RootLayoutProps>): React.JSX.Element => {
  const { children } = props;
  const bodyClassName = `${geistSans.variable} ${geistMono.variable} font-sans antialiased`;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bodyClassName}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
