import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ProductProvider } from "@/lib/ProductContext";

export const metadata: Metadata = {
  title: "StockFlow — Envanter Yönetimi",
  description: "Kurumsal stok ve envanter yönetim sistemi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <ProductProvider>
          <nav className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
              <Link href="/" className="font-bold text-lg text-blue-600">
                📦 StockFlow
              </Link>
              <div className="flex gap-1 sm:gap-4 text-sm">
                <Link href="/" className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                  Panel
                </Link>
                <Link href="/products" className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                  Ürünler
                </Link>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            {children}
          </main>
        </ProductProvider>
      </body>
    </html>
  );
}