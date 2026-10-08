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
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  const data: Product[] = await res.json();

  return (
    <div className="border-b border-t border-gray-200 bg-white overflow-hidden cursor-pointer">
      <MarqueeText
        direction="right"
        duration={35}
      >
        <div className="flex items-center">
          {data.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-2 whitespace-nowrap border-r border-gray-200 px-6 py-3 text-sm"
            >
              <span className="text-base">
                {product.categoryIcon}
              </span>

              <span className="font-medium text-[#1D271F]">
                {product.nameBn}
              </span>

              <span className="text-[#1D271F]">
                {product.today} টাকা/{product.unit}
              </span>

              <span
                className={
                  product.change.dir === "up"
                    ? "font-semibold text-red-500"
                    : "font-semibold text-green-600"
                }
              >
                {product.change.dir === "up" ? "▲" : "▼"}{" "}
                {product.change.pct}%
              </span>
            </div>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default MarqueePage;