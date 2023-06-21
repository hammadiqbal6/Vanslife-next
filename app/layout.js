import Nav from "@/components/Nav/Nav";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vans life",
  description: "Vans life",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <header>
            <Nav />
          </header>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
