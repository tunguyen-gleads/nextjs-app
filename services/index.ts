import { Product } from "@/types";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("https://fakestoreapi.com/products", {
    next: {
      revalidate: 60 * 5, // 5 minutes
    },
  });
  const data = await response.json();
  return data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: {
      revalidate: 60 * 5, // 5 minutes
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await response.json();
  return data;
};
