import { Outfit, Fraunces } from "next/font/google";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  title: "#VanLife — Travel van rentals",
  description:
    "Rent the perfect travel van for your next road trip. Browse simple, rugged, and luxury vans — or host your own.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${fraunces.variable} font-sans`}>
        <Provider>
          <div className="flex min-h-screen flex-col">
            <header>
              <Nav />
            </header>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
