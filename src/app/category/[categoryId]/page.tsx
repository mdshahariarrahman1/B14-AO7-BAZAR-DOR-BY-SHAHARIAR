
import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Product } from "@/types/product";
import CategoryProducts from "@/component/CategoryProducts";

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const CategoryContent = async ({
  params,
}: CategoryPageProps) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(categoryId)}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }

  const products: Product[] = await res.json();

  if (products.length === 0) {
    notFound();
  }

  const categoryName = products[0].categoryNameBn;
  const categoryIcon = products[0].categoryIcon;

  return (
    <main className="min-h-screen bg-[#F1F6F2]">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <section className="flex min-h-21 items-center gap-3 rounded-2xl border border-[#DDE6DF] bg-white px-5 py-4">
          <span className="text-3xl">{categoryIcon}</span>

          <div>
            <h1 className="text-xl font-bold text-[#1D271F]">
              {categoryName}
            </h1>

            <p className="mt-1 text-xs text-[#1D271F]/60">
              {products.length.toLocaleString("bn-BD")}
              টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        <CategoryProducts products={products} />
      </div>
    </main>
  );
};

const CategoryPage = ({ params }: CategoryPageProps) => {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F1F6F2] p-6 text-center">
          পণ্যের তথ্য লোড হচ্ছে...
        </main>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
};

export default CategoryPage;