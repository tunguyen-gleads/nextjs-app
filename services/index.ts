import { Product } from "@/types";

// Helper function to create timeout signal
const createTimeoutSignal = (timeoutMs: number = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return { signal: controller.signal, timeoutId };
};

// Base fetch configuration for server-side requests
const getFetchConfig = () => ({
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (compatible; Next.js)",
    Accept: "application/json",
  },
  next: {
    revalidate: 60 * 5, // 5 minutes
  },
});

export const getProducts = async (): Promise<Product[]> => {
  const { signal, timeoutId } = createTimeoutSignal(10000);
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      ...getFetchConfig(),
      cache: "no-store", // Disable cache for more reliable fetching
      signal,
    });

    if (!response.ok) {
      clearTimeout(timeoutId);
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      clearTimeout(timeoutId);
      throw new Error("Response is not JSON");
    }

    const data = await response.json();
    clearTimeout(timeoutId);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Error fetching products:", error);
    // Return empty array as fallback
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  const { signal, timeoutId } = createTimeoutSignal(10000);
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      ...getFetchConfig(),
      cache: "no-store", // Disable cache for more reliable fetching
      signal,
    });

    if (!response.ok) {
      clearTimeout(timeoutId);
      if (response.status === 404) {
        throw new Error("Product not found");
      }
      throw new Error(
        `Failed to fetch product: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      clearTimeout(timeoutId);
      throw new Error("Response is not JSON");
    }

    const data = await response.json();
    clearTimeout(timeoutId);
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Error fetching product:", error);
    throw error;
  }
};
