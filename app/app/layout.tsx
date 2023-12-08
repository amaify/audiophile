import type { ReactNode } from "react";
import type { Metadata } from "next";
import AppProvider from "./app-provider";

export const metadata: Metadata = {
  title: "Audiophile",
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon-32x32.png",
    apple: "/favicon-32x32.png"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
