import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="block"
    >
      <div className="rounded-xl border border-[#DDE6DF] bg-white p-4 transition hover:shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F1F7F3] text-xl">
            {product.image}
          </div>

          <div>
            <h3 className="font-semibold text-[#1D271F]">
              {product.nameBn}
            </h3>

            <p className="text-xs text-[#1D271F]/60">
              প্রতি {product.unit}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-[#1D271F]/60">
              আজকের দাম
            </p>

            <p className="text-lg font-bold text-[#1D271F]">
              {product.today.toLocaleString("bn-BD")} টাকা
            </p>
          </div>

          <span
            className={
              product.change.dir === "up"
                ? "rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-500"
                : "rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
            }
          >
            {product.change.dir === "up" ? "▲" : "▼"}{" "}
            {product.change.pct.toLocaleString("bn-BD")}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;