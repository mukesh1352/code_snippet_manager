import type { Metadata } from "next";
import "./globals.css";




export const metadata: Metadata = {
  title: "Code-snippet-manager",
  description: "Self-made project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       {children}
      </body>
    </html>
  );
}
