import ProductCard from "./ProductCard";

import { Product } from "@/types/product";

interface RisingProductsProps {
  products: Product[];
}

const RisingProducts = ({
  products,
}: RisingProductsProps) => {
  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="py-8">
      <h2 className="mb-4 text-lg font-bold text-[#1D271F]">
        <span className="text-red-500">▲</span>{" "}
        আজ দাম বেড়েছে
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {risingProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default RisingProducts;