import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thứ tự ưu tiện",
  description: "Thứ tự ưu tiện",
};
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black px-4">
      <main className="bg-white dark:bg-[#18181b] rounded-lg shadow-lg max-w-2xl w-full py-12 px-8">
        <article>
          <header className="mb-6 border-b border-zinc-200 dark:border-zinc-700 pb-6">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Thứ tự ưu tiện
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Đăng bởi{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                Nguyễn Văn A
              </span>{" "}
              · 22/06/2024
            </p>
          </header>
          <section className="prose prose-zinc max-w-none dark:prose-invert text-lg">
            <p>
              Hôm nay mình sẽ chia sẻ trải nghiệm đầu tiên khi bắt đầu xây dựng
              một dự án blog đơn giản với <strong>Next.js</strong> và{" "}
              <strong>Tailwind CSS</strong>. Việc kết hợp 2 công nghệ này giúp
              phát triển giao diện nhanh chóng và hiệu quả.
            </p>
            <h2>Khởi tạo dự án</h2>
            <p>
              Đầu tiên, mình khởi tạo dự án bằng lệnh{" "}
              <code>npx create-next-app</code>, sau đó cài đặt Tailwind CSS theo
              hướng dẫn trên trang chủ của Tailwind. Việc cấu hình diễn ra khá
              nhanh và thuận tiện.
            </p>
            <h2>Tạo giao diện</h2>
            <p>
              Sử dụng Tailwind, mình có thể dễ dàng tạo layout và các thành phần
              như header, nội dung, và action button cho blog. Mọi thứ đều khá
              trực quan, chỉ cần áp dụng class là giao diện đã thay đổi ngay.
            </p>
            <blockquote>
              <p>
                “Next.js kết hợp với Tailwind CSS thực sự là một combo mạnh mẽ
                cho lập trình UI hiện đại.”
              </p>
            </blockquote>
            <h2>Kết luận</h2>
            <p>
              Chỉ trong thời gian ngắn, mình đã có một blog mẫu với giao diện
              đẹp mắt và chuẩn responsive. Nếu bạn cũng đang muốn bắt đầu với
              Next.js, hãy thử kết hợp cùng Tailwind nhé!
            </p>
          </section>
          <footer className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-700 flex justify-end gap-4">
            <a
              href="#"
              className="inline-block rounded-full px-6 py-2 bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
            >
              Đọc thêm
            </a>
            <a
              href="#"
              className="inline-block rounded-full px-6 py-2 border border-zinc-300 dark:border-zinc-600 bg-transparent text-zinc-900 dark:text-zinc-100 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Bình luận
            </a>
          </footer>
        </article>
      </main>
    </div>
  );
}
