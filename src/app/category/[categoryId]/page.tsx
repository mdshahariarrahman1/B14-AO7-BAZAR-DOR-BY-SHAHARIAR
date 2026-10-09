import { notFound } from "next/navigation";

import { Product } from "@/types/product";
import CategoryProducts from "@/component/CategoryProducts";


interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(categoryId)}`
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

        {/* Category heading */}
        <section className="flex min-h-21 items-center gap-3 rounded-2xl border border-[#DDE6DF] bg-white px-5 py-4">
          <span className="text-3xl">
            {categoryIcon}
          </span>

          <div>
            <h1 className="text-xl font-bold text-[#1D271F]">
              {categoryName}
            </h1>

            <p className="mt-1 text-xs text-[#1D271F]/60">
              {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Sorting and products */}
        <CategoryProducts products={products}/>

      </div>
    </main>
  );
};

export default CategoryPage;