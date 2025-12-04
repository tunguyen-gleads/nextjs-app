import { Product } from "@/types";

// Base URL for API - can be moved to env variable if needed
const API_BASE_URL = "https://fakestoreapi.com";

// Fetch configuration optimized for Vercel deployment
const fetchConfig = {
  cache: "no-store" as const, // Force fresh fetch on Vercel
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const url = `${API_BASE_URL}/products`;

    const response = await fetch(url, fetchConfig);

    console.log("🚀 ~ getProducts ~ response:", response);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        `Expected JSON but got: ${contentType || "unknown content type"}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.warn("API returned non-array data:", typeof data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return empty array as fallback to prevent page crash
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const url = `${API_BASE_URL}/products/${id}`;

    const response = await fetch(url, fetchConfig);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Product not found");
      }
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `Failed to fetch product: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        `Expected JSON but got: ${contentType || "unknown content type"}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};
