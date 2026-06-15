export interface Product {
  id: number;
  sku: string;
  name: string;
  unitPrice: number;
  quantityInStock: number;
  reorderLevel: number;
  categoryName: string;
  supplierName: string;
}

export interface Category {
  id: number;
  name: string;
  productCount: number;
}

export interface Lookup {
  id: number;
  name: string;
}