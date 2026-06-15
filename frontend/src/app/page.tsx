"use client";

import { useProducts } from "@/lib/ProductContext";

export default function DashboardPage() {
  const { products } = useProducts();
const toplamUrun = products.length;
const toplamStokDegeri = products.reduce(
  (acc, p) => acc + p.unitPrice * p.quantityInStock,
  0
);
const dusukStok = products.filter(
  (p) => p.quantityInStock <= p.reorderLevel
).length;

  const kartlar = [
    { baslik: "Toplam Ürün", deger: toplamUrun, renk: "text-blue-600" },
    {
      baslik: "Toplam Stok Değeri",
      deger: toplamStokDegeri.toLocaleString("tr-TR", {
        style: "currency",
        currency: "TRY",
      }),
      renk: "text-green-600",
    },
    { baslik: "Düşük Stok Uyarısı", deger: dusukStok, renk: "text-red-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Panel</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kartlar.map((k) => (
          <div
            key={k.baslik}
            className="bg-white rounded-xl border p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{k.baslik}</p>
            <p className={`text-3xl font-bold mt-2 ${k.renk}`}>{k.deger}</p>
          </div>
        ))}
      </div>
    </div>
  );
}