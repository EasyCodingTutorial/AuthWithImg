import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// For Upload Thing
import "@uploadthing/react/styles.css";


// For Providers
import { Provider } from "./Provider";



export const metadata: Metadata = {
  title: "Complete Authentication System",
  description: "Where you can complete your authentication process",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
