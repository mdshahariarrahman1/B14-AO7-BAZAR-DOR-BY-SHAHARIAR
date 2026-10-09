"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/component/ProductSections/ProductCard";
import { Product } from "@/types/product";

interface CategoryProductsProps {
  products: Product[];
}

type SortOption = "default" | "price-low" | "price-high";

const CategoryProducts = ({ products }: CategoryProductsProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortBy === "price-low") {
      result.sort((a, b) => a.today - b.today);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortBy]);

  return (
    <>
      {/* Sorting bar */}
      <div className="mt-5 flex min-h-15 items-center justify-end rounded-2xl border border-[#DDE6DF] bg-white px-5">
        <label
          htmlFor="sort-products"
          className="mr-2 text-sm text-[#1D271F]/70"
        >
          সাজান
        </label>

        <select
          id="sort-products"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as SortOption)}
          className="h-7.5 cursor-pointer rounded-lg border border-[#D1D8D2] bg-white px-2 text-xs text-[#1D271F] outline-none"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {/* Product count */}
      <p className="mt-4 text-xs text-[#1D271F]/70">
        মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product grid */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <p className="py-12 text-center text-sm text-[#1D271F]/60">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </>
  );
};

export default CategoryProducts;
