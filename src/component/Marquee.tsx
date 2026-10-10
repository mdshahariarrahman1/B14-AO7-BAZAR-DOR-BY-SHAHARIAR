
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const MarqueePage = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    return null;
  }

  const result = await res.json();

  const data: Product[] = Array.isArray(result)
    ? result
    : Array.isArray(result.products)
      ? result.products
      : [];

  return (
    <div className="cursor-pointer overflow-hidden border-y border-gray-200 bg-white">
      <MarqueeText direction="right" duration={35}>
        <div className="flex items-center">
          {data.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-gray-200 px-6 py-3 text-sm hover:bg-[#F0F5F1]"
            >
              <span className="text-base">
                {product.categoryIcon}
              </span>

              <span className="font-medium text-[#1D271F]">
                {product.nameBn}
              </span>

              <span className="text-[#1D271F]">
                {product.today.toLocaleString("bn-BD")} টাকা/
                {product.unit}
              </span>

              <span
                className={
                  product.change.dir === "up"
                    ? "font-semibold text-red-500"
                    : "font-semibold text-green-600"
                }
              >
                {product.change.dir === "up" ? "▲" : "▼"}{" "}
                {product.change.pct.toLocaleString("bn-BD")}%
              </span>
            </Link>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default MarqueePage;