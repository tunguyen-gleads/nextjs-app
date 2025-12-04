import { getProductById } from "@/services";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  return {
    title: `${product.title} - Product Details`,
    description: product.description,
  };
}

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-black dark:via-zinc-900 dark:to-black">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200 group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-200">
              ←
            </span>
            <span>Back to Products</span>
          </Link>
        </div>

        {/* Main Product Card */}
        <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image Section */}
            <div className="lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 p-8 lg:p-12 flex items-center justify-center min-h-[500px]">
              <div className="relative w-full h-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
                <div className="relative w-full h-full bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>

            {/* Product Info Section */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full capitalize">
                  {product.category}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  <span className="text-2xl text-yellow-400">★</span>
                  <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {product.rating.rate}
                  </span>
                </div>
                <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-600"></div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {product.rating.count} reviews
                </span>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-700">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 flex-1">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  Description
                </h2>
                <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                <button className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Add to Cart
                </button>
                <button className="px-8 py-4 border-2 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 rounded-xl font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200">
                  ♡ Wishlist
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block mb-1">
                      Product ID
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                      #{product.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block mb-1">
                      Category
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium capitalize">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section Placeholder */}
        <div className="mt-16 text-center">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Looking for more?{" "}
            <Link
              href="/products"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Browse all products
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
