import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import "./globals.css";

export const metadata: Metadata = {
  title: "Shakers Talent Challenge",
  description: "Find your next project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}