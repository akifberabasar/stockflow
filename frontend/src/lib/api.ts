import type { Product, Lookup } from "@/types";

const API = process.env.NEXT_PUBLIC_API_URL!;

export interface ProductInput {
  sku: string;
  name: string;
  unitPrice: number;
  quantityInStock: number;
  reorderLevel: number;
  categoryId: number;
  supplierId: number;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API}/products`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Ürünler alınamadı: ${res.status}`);
  return res.json();
}

export async function createProduct(input: ProductInput): Promise<void> {
  const res = await fetch(`${API}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Ürün eklenemedi: ${res.status}`);
}

export async function updateProduct(id: number, input: ProductInput): Promise<void> {
  const res = await fetch(`${API}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Ürün güncellenemedi: ${res.status}`);
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${API}/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Ürün silinemedi: ${res.status}`);
}

export async function getCategories(): Promise<Lookup[]> {
  const res = await fetch(`${API}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Kategoriler alınamadı: ${res.status}`);
  return res.json();
}

export async function getSuppliers(): Promise<Lookup[]> {
  const res = await fetch(`${API}/suppliers`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Tedarikçiler alınamadı: ${res.status}`);
  return res.json();
}