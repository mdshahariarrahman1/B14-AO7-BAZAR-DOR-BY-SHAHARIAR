
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Product } from "@/types/product";

interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductDetailsContent = async ({
  params,
}: ProductDetailsPageProps) => {
  const { productId } = await params;

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const result = await res.json();

  // API একটি object অথবা array ফেরত দিলে handle করবে
  const product: Product | undefined = Array.isArray(result)
    ? result.find((item: Product) => item.slug === productId)
    : result.product
      ? result.product
      : result;

  if (!product || !product.slug) {
    notFound();
  }

  const markets = Array.isArray(product.markets)
    ? product.markets
    : [];

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) =>
            total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : product.today;

  return (
    <main className="min-h-screen bg-[#F0F5F1] px-4 py-6">
      <div className="container mx-auto">
        <div className="mb-5 text-[14px] text-gray-500">
          <Link className="pr-1" href="/">
            হোম
          </Link>
          {" › "}
          <Link
            className="pr-1"
            href={`/category/${product.category}`}
          >
            {product.categoryNameBn}
          </Link>
          {" › "}
          {product.nameBn}
        </div>

        <section className="flex items-center justify-between gap-3 rounded-xl border border-[#DFE8E0] bg-[#FAFCFA] p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#F0F5F1] p-3 text-3xl">
              {product.image}
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#1D271F]">
                {product.nameBn}
              </h1>

              <p className="text-xs text-gray-500">
                প্রতি {product.unit} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-xs">
                গতকালের তুলনায় আজকের দাম{" "}
                {product.change?.dir === "up"
                  ? "বেড়েছে"
                  : product.change?.dir === "down"
                    ? "কমেছে"
                    : "অপরিবর্তিত"}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#F0F5F1] p-4 text-center">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <h2 className="text-2xl font-bold">
              {product.today.toLocaleString("bn-BD")}
            </h2>

            <p className="text-xs text-gray-500">
              টাকা / {product.unit}
            </p>

            <p
              className={
                product.change?.dir === "up"
                  ? "text-xs text-red-600"
                  : product.change?.dir === "down"
                    ? "text-xs text-green-600"
                    : "text-xs text-gray-500"
              }
            >
              {product.change?.dir === "up"
                ? "▲"
                : product.change?.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {(product.change?.pct ?? 0).toLocaleString("bn-BD")}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-4 rounded-xl border border-[#DFE8E0] bg-[#FAFCFA] p-4">
          <h2 className="mb-3 text-sm font-bold">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-[#DFE8E0] p-3">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-1 font-bold text-green-600">
                {minPrice.toLocaleString("bn-BD")} টাকা
              </p>

              <p className="text-[10px] text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#DFE8E0] p-3">
              <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>

              <p className="mt-1 font-bold text-red-600">
                {maxPrice.toLocaleString("bn-BD")} টাকা
              </p>

              <p className="text-[10px] text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#DFE8E0] p-3">
              <p className="text-xs text-gray-500">গড় দাম</p>

              <p className="mt-1 font-bold">
                {averagePrice.toLocaleString("bn-BD", {
                  maximumFractionDigits: 2,
                })}{" "}
                টাকা
              </p>

              <p className="text-[10px] text-gray-500">
                বাজারের দাম অনুযায়ী
              </p>
            </div>
          </div>

          {/* Market Table */}
          <h2 className="mb-3 mt-5 text-sm font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-[#DFE8E0]">
            <table className="w-full text-[14px]">
              <thead className="bg-[#F7FAF7] text-gray-500">
                <tr>
                  <th className="p-3 text-left">বাজার</th>
                  <th className="p-3 text-left">বিভাগ</th>
                  <th className="p-3 text-right">সর্বনিম্ন</th>
                  <th className="p-3 text-right">সর্বোচ্চ</th>
                  <th className="p-3 text-right">গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${market.division}`}
                    className={
                      index % 2 === 0
                        ? "border-t bg-white"
                        : "border-t bg-[#F0F5F1]"
                    }
                  >
                    <td className="p-3">{market.market}</td>
                    <td className="p-3">{market.division}</td>

                    <td className="p-3 text-right">
                      {market.min.toLocaleString("bn-BD")} টাকা
                    </td>

                    <td className="p-3 text-right">
                      {market.max.toLocaleString("bn-BD")} টাকা
                    </td>

                    <td className="p-3 text-right font-semibold">
                      {(
                        (market.min + market.max) /
                        2
                      ).toLocaleString("bn-BD")}{" "}
                      টাকা
                    </td>
                  </tr>
                ))}

                {markets.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-5 text-center">
                      বাজারের তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

const ProductDetailsPage = ({
  params,
}: ProductDetailsPageProps) => {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F0F5F1] p-6 text-center">
          পণ্যের তথ্য লোড হচ্ছে...
        </main>
      }
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
};

export default ProductDetailsPage;