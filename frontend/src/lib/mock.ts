import type { Product, Category } from "@/types";

export const mockProducts: Product[] = [
  { id: 1, sku: "ELK-001", name: "Kablosuz Mouse", unitPrice: 249.9, quantityInStock: 120, reorderLevel: 30, categoryName: "Elektronik", supplierName: "TeknoTed A.Ş." },
  { id: 2, sku: "ELK-002", name: "Mekanik Klavye", unitPrice: 899.0, quantityInStock: 14, reorderLevel: 20, categoryName: "Elektronik", supplierName: "TeknoTed A.Ş." },
  { id: 3, sku: "OFS-001", name: "A4 Fotokopi Kağıdı (500'lü)", unitPrice: 89.5, quantityInStock: 340, reorderLevel: 50, categoryName: "Ofis", supplierName: "Kırtasiye Dünyası" },
  { id: 4, sku: "OFS-002", name: "Toplantı Kalemi (12'li)", unitPrice: 45.0, quantityInStock: 8, reorderLevel: 25, categoryName: "Ofis", supplierName: "Kırtasiye Dünyası" },
  { id: 5, sku: "MOB-001", name: "Ergonomik Ofis Sandalyesi", unitPrice: 3450.0, quantityInStock: 22, reorderLevel: 10, categoryName: "Mobilya", supplierName: "Konfor Mobilya" },
  { id: 6, sku: "MOB-002", name: "Ayarlanabilir Masa", unitPrice: 5200.0, quantityInStock: 5, reorderLevel: 8, categoryName: "Mobilya", supplierName: "Konfor Mobilya" },
];

export const mockCategories: Category[] = [
  { id: 1, name: "Elektronik", productCount: 2 },
  { id: 2, name: "Ofis", productCount: 2 },
  { id: 3, name: "Mobilya", productCount: 2 },
];