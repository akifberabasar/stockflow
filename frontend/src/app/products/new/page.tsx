"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useProducts } from "@/lib/ProductContext";
import { getCategories, getSuppliers } from "@/lib/api";
import type { Lookup } from "@/types";

function ProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const { products, add, edit } = useProducts();

  const [categories, setCategories] = useState<Lookup[]>([]);
  const [suppliers, setSuppliers] = useState<Lookup[]>([]);

  const [form, setForm] = useState({
    sku: "",
    name: "",
    unitPrice: "",
    quantityInStock: "",
    reorderLevel: "",
    categoryId: "",
    supplierId: "",
  });

  // Kategori + tedarikçi listelerini API'den çek
  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
    getSuppliers().then(setSuppliers).catch(console.error);
  }, []);

  // Düzenleme modunda: mevcut ürünün bilgilerini forma doldur
  useEffect(() => {
    if (editId) {
      const p = products.find((x) => x.id === Number(editId));
      if (p) {
        setForm({
          sku: p.sku,
          name: p.name,
          unitPrice: String(p.unitPrice),
          quantityInStock: String(p.quantityInStock),
          reorderLevel: String(p.reorderLevel),
          categoryId: "",
          supplierId: "",
        });
      }
    }
  }, [editId, products]);

  const guncelle = (alan: string, deger: string) =>
    setForm((prev) => ({ ...prev, [alan]: deger }));

  const kaydet = async () => {
    if (!form.sku || !form.name || !form.categoryId || !form.supplierId) {
      alert("SKU, ürün adı, kategori ve tedarikçi zorunludur.");
      return;
    }
    const input = {
      sku: form.sku,
      name: form.name,
      unitPrice: parseFloat(form.unitPrice) || 0,
      quantityInStock: parseInt(form.quantityInStock) || 0,
      reorderLevel: parseInt(form.reorderLevel) || 0,
      categoryId: Number(form.categoryId),
      supplierId: Number(form.supplierId),
    };
    try {
      if (editId) {
        await edit(Number(editId), input);
      } else {
        await add(input);
      }
      router.push("/products");
    } catch (e) {
      alert("İşlem başarısız: " + (e as Error).message);
    }
  };

  const inputClass =
    "border rounded-lg px-3 py-2 text-sm w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">
        {editId ? "Ürünü Düzenle" : "Yeni Ürün"}
      </h1>

      <div className="bg-white rounded-xl border p-6 space-y-4">
        <div>
          <label className="text-sm text-gray-600">SKU (Stok Kodu)</label>
          <input className={inputClass} value={form.sku}
            onChange={(e) => guncelle("sku", e.target.value)} placeholder="ELK-003" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Ürün Adı</label>
          <input className={inputClass} value={form.name}
            onChange={(e) => guncelle("name", e.target.value)} placeholder="Kablosuz Kulaklık" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Birim Fiyat (₺)</label>
            <input className={inputClass} type="number" value={form.unitPrice}
              onChange={(e) => guncelle("unitPrice", e.target.value)} placeholder="0" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Stok Adedi</label>
            <input className={inputClass} type="number" value={form.quantityInStock}
              onChange={(e) => guncelle("quantityInStock", e.target.value)} placeholder="0" />
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600">Kritik Stok Eşiği</label>
          <input className={inputClass} type="number" value={form.reorderLevel}
            onChange={(e) => guncelle("reorderLevel", e.target.value)} placeholder="0" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Kategori</label>
            <select className={inputClass} value={form.categoryId}
              onChange={(e) => guncelle("categoryId", e.target.value)}>
              <option value="">Seçiniz…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Tedarikçi</label>
            <select className={inputClass} value={form.supplierId}
              onChange={(e) => guncelle("supplierId", e.target.value)}>
              <option value="">Seçiniz…</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={kaydet}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
            {editId ? "Güncelle" : "Kaydet"}
          </button>
          <button onClick={() => router.push("/products")}
            className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition">
            İptal
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewProductPage() {
  return (
    <Suspense fallback={<p className="p-6">Yükleniyor…</p>}>
      <ProductForm />
    </Suspense>
  );
}