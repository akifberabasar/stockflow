"use client";

import { useState } from "react";
import { useProducts } from "@/lib/ProductContext";

export default function ProductsPage() {
  const { products, loading, remove } = useProducts();
  const [arama, setArama] = useState("");

  const filtrelenmis = products.filter(
    (p) =>
      p.name.toLowerCase().includes(arama.toLowerCase()) ||
      p.sku.toLowerCase().includes(arama.toLowerCase())
  );

  if (loading) return <p className="p-6">Yükleniyor…</p>;

  return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">Ürünler</h1>
                    <a href="/products/new" className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition">
                        + Yeni
                    </a>
                </div>
                <input
                    type="text"
                    placeholder="Ürün adı veya SKU ara…"
                    value={arama}
                    onChange={(e) => setArama(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Masaüstü: tablo */}
            <div className="hidden md:block bg-white rounded-xl border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-left text-gray-500">
                        <tr>
                            <th className="px-4 py-3 font-medium">SKU</th>
                            <th className="px-4 py-3 font-medium">Ürün</th>
                            <th className="px-4 py-3 font-medium">Kategori</th>
                            <th className="px-4 py-3 font-medium text-right">Fiyat</th>
                            <th className="px-4 py-3 font-medium text-right">Stok</th>
                            <th className="px-4 py-3 font-medium text-center">Durum</th>
                            <th className="px-4 py-3 font-medium text-center">İşlem</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filtrelenmis.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-500">{p.sku}</td>
                                <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                                <td className="px-4 py-3 text-gray-600">{p.categoryName}</td>
                                <td className="px-4 py-3 text-right text-gray-900">
                                    {p.unitPrice.toLocaleString("tr-TR", {
                                        style: "currency",
                                        currency: "TRY",
                                    })}
                                </td>
                                <td className="px-4 py-3 text-right text-gray-900">{p.quantityInStock}</td>
                                <td className="px-4 py-3 text-center">
                                    {p.quantityInStock <= p.reorderLevel ? (
                                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                            Düşük stok
                                        </span>
                                    ) : (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                            Yeterli
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-center whitespace-nowrap">
                  <a href={`/products/new?id=${p.id}`}
                    className="text-blue-600 hover:underline text-xs mr-3">
                    Düzenle
                  </a>
                  <button
                    onClick={() => {
                      if (confirm(`"${p.name}" silinsin mi?`)) remove(p.id);
                    }}
                    className="text-red-600 hover:underline text-xs">
                    Sil
                  </button>
                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobil: kartlar */}
            <div className="md:hidden grid grid-cols-1 gap-3">
                {filtrelenmis.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl border p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium">{p.name}</p>
                                <p className="text-xs text-gray-500">{p.sku}</p>
                            </div>
                            {p.quantityInStock <= p.reorderLevel && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                    Düşük stok
                                </span>
                            )}
                        </div>
                        <div className="flex justify-between mt-3 text-sm">
                            <span className="text-gray-600">{p.categoryName}</span>
                            <span className="font-medium">
                                {p.unitPrice.toLocaleString("tr-TR", {
                                    style: "currency",
                                    currency: "TRY",
                                })}
                            </span>
                        </div>
                        <p className="text-sm mt-1">Stok: {p.quantityInStock}</p>
                    </div>
                ))}
            </div>

            {filtrelenmis.length === 0 && (
                <p className="text-center text-gray-500 py-10">Sonuç bulunamadı.</p>
            )}
        </div>
    );
}