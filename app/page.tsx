import { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/services";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Thứ tự ưu tiện - Trang chủ",
  description: "Khám phá sản phẩm tuyệt vời của chúng tôi",
};

export default async function Home() {
  // Lấy 4 sản phẩm đầu tiên để hiển thị preview
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 4);

  // If no products, show empty state
  if (allProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-black dark:via-zinc-900 dark:to-black">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Welcome
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Products are loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-black dark:via-zinc-900 dark:to-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5"></div>
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 animate-fade-in">
              Thứ tự ưu tiện
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              Khám phá bộ sưu tập sản phẩm đa dạng và chất lượng cao của chúng
              tôi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Xem tất cả sản phẩm →
              </Link>
              <Link
                href="#featured"
                className="inline-block px-8 py-4 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-full font-semibold text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
              >
                Sản phẩm nổi bật
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Sản phẩm nổi bật
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Khám phá những sản phẩm được yêu thích nhất của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative w-full h-48 bg-gray-100 dark:bg-zinc-700">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 rounded mb-2">
                  {product.category}
                </span>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      {product.rating.rate}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-300"
          >
            Xem tất cả {allProducts.length} sản phẩm →
          </Link>
        </div>
      </section>
    </div>
  );
}
