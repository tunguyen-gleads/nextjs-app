import { getProducts } from "@/services";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our amazing product collection",
};

const Products = async () => {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No Products Available</h1>
          <p className="text-gray-600 mb-8">
            We&apos;re sorry, but there are no products available at the moment.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>
          <span>Back Home</span>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative w-full h-64 bg-gray-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Category Badge */}
              <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded mb-2">
                {product.category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                {product.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm font-medium text-gray-700 ml-1">
                    {product.rating.rate}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  ({product.rating.count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Products Count */}
      <div className="mt-8 text-center text-gray-600">
        Showing {products.length} products
      </div>
    </div>
  );
};

export default Products;
