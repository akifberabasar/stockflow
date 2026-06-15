"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type ProductInput,
} from "@/lib/api";
import type { Product } from "@/types";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  reload: () => void;
  add: (input: ProductInput) => Promise<void>;
  edit: (id: number, input: ProductInput) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = () => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch((e) => console.error("Ürünler yüklenemedi:", e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, []);

  const add = async (input: ProductInput) => {
    await createProduct(input);
    reload();
  };

  const edit = async (id: number, input: ProductInput) => {
    await updateProduct(id, input);
    reload();
  };

  const remove = async (id: number) => {
    await deleteProduct(id);
    reload();
  };

  return (
    <ProductContext.Provider value={{ products, loading, reload, add, edit, remove }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts ProductProvider içinde kullanılmalı");
  return ctx;
}