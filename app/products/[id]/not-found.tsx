import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-black dark:via-zinc-900 dark:to-black">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
          Product Not Found
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}
