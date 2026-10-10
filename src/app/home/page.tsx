import { Suspense } from "react";

import RisingProducts from "@/component/ProductSections/RisingProducts";
import FallingProducts from "@/component/ProductSections/FallingProducts";
import AllProducts from "@/component/ProductSections/AllProducts";

import type { Product } from "@/types/product";

export const instant = false;

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  return products;
};

const ProductsContent = async () => {
  const products = await getProducts();

  return (
    <>
      <RisingProducts products={products} />

      <FallingProducts products={products} />

      <AllProducts products={products} />
    </>
  );
};

const HomePages = () => {
  return (
    <main className="bg-[#F1F7F3]">
      <div className="container mx-auto px-4">
        <Suspense
          fallback={
            <p className="py-10 text-center text-[#05893E]">
              পণ্যের তথ্য লোড হচ্ছে...
            </p>
          }
        >
          <ProductsContent />
        </Suspense>
      </div>
    </main>
  );
};

export default HomePages;

