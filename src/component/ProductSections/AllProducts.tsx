import ProductCard from "./ProductCard";

import { Product } from "@/types/product";

interface AllProductsProps {
  products: Product[];
}

const AllProducts = ({
  products,
}: AllProductsProps) => {
  return (
    <section
      className="pt-8 pb-18"
    >
      <h2 className="text-lg font-bold text-[#1D271F]">
        সব পণ্য
      </h2>

      <p className="mt-1 text-sm text-[#1D271F]/60">
        মোট {products.length}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;