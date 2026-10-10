
import Link from "next/link";
import MarqueePage from "./Marquee";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinksPage = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: Category[] = await res.json();

  return (
    <>
      <nav className="border-y border-gray-200 bg-white">
        <div className="container mx-auto flex items-center gap-5 overflow-x-auto overscroll-x-contain px-4 py-3 text-[#1D271F] [scrollbar-width:none] sm:gap-10 sm:px-10 sm:py-5 [&::-webkit-scrollbar]:hidden">
          {data.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-gray-700 transition-colors duration-200 hover:text-[#05893E] sm:gap-2 sm:text-sm"
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          ))}
        </div>
      </nav>

      <MarqueePage />
    </>
  );
};

export default NavLinksPage;
