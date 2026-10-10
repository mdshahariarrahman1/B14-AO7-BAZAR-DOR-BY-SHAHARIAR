
import Link from "next/link";

const NotFound=()=> {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F0F5F1] px-4 text-center">
      <div className="text-7xl font-extrabold text-[#05893E]">
        404
      </div>

      <div className="mt-4 text-5xl">🛒</div>

      <h1 className="mt-5 text-2xl font-bold text-[#1D271F]">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-[#758078]">
        দুঃখিত! আপনি যে পেজটি খুঁজছেন,
        সেটি পাওয়া যায়নি অথবা সরিয়ে ফেলা হয়েছে।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#05893E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#047331]"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}

export default NotFound;