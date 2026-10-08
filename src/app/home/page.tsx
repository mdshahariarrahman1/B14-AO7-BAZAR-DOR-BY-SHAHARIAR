import NavbarPage from "@/component/Navbar";
import MarqueePage from "@/component/Marquee";


import RisingProducts from "@/component/ProductSections/RisingProducts";
import FallingProducts from "@/component/ProductSections/FallingProducts";
import AllProducts from "@/component/ProductSections/AllProducts";

const HomePages = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  const products = await res.json();

  return (
    <main className="bg-[#F1F7F3]">

      <div className="container mx-auto px-4">

        <RisingProducts
          products={products}
        />

        <FallingProducts
          products={products}
        />

        <AllProducts
          products={products}
        />

      </div>

    </main>
  );
};

export default HomePages;