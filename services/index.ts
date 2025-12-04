import { Product } from "@/types";

// Base URL for external API
const API_BASE_URL = "https://fakestoreapi.com";

// Get base URL for internal API routes
const getBaseUrl = () => {
  // In server-side, try to get from environment or use localhost
  if (typeof window === "undefined") {
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      return process.env.NEXT_PUBLIC_BASE_URL;
    }
    // Local development: use localhost with port
    return "http://localhost:4200";
  }
  // Client-side: use relative URL
  return "";
};

// Fetch configuration with browser-like headers to bypass Cloudflare
const getFetchConfig = () => ({
  cache: "no-store" as const,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    Referer: "https://fakestoreapi.com/",
  },
});

export const getProducts = async (): Promise<Product[]> => {
  try {
    // In local development, use direct API call (no Cloudflare protection)
    // In production (Vercel), use internal API route to bypass Cloudflare
    const isProduction =
      process.env.VERCEL_URL || process.env.NODE_ENV === "production";

    let response: Response;

    if (isProduction) {
      // Production: use internal API route
      const baseUrl = getBaseUrl();
      const apiUrl = `${baseUrl}/api/products`;
      response = await fetch(apiUrl, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // If internal API fails, fallback to direct external API
      if (!response.ok) {
        console.warn("Internal API failed, trying direct external API");
        response = await fetch(`${API_BASE_URL}/products`, getFetchConfig());
      }
    } else {
      // Local development: use direct external API call
      response = await fetch(`${API_BASE_URL}/products`, getFetchConfig());
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText} - ${errorText}`
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
    // In local development, use direct API call (no Cloudflare protection)
    // In production (Vercel), use internal API route to bypass Cloudflare
    const isProduction =
      process.env.VERCEL_URL || process.env.NODE_ENV === "production";

    let response: Response;

    if (isProduction) {
      // Production: use internal API route
      const baseUrl = getBaseUrl();
      const apiUrl = `${baseUrl}/api/products/${id}`;
      response = await fetch(apiUrl, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // If internal API fails, fallback to direct external API
      if (!response.ok) {
        console.warn("Internal API failed, trying direct external API");
        response = await fetch(
          `${API_BASE_URL}/products/${id}`,
          getFetchConfig()
        );
      }
    } else {
      // Local development: use direct external API call
      response = await fetch(
        `${API_BASE_URL}/products/${id}`,
        getFetchConfig()
      );
    }

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Product not found");
      }
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `Failed to fetch product: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};
