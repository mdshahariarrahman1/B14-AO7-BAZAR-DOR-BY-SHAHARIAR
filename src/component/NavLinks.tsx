import Link from "next/link";
import MarqueePage from "./Marquee";

interface Category{
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const NavLinksPage = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: Category[] = await res.json();

  return (
    <>
      <nav className="border-y border-gray-200 bg-white">
        <div className="container mx-auto flex items-center gap-10 overflow-x-auto px-10 py-5 text-[#1D271F]">
          {data.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-gray-700 hover:text-[#05893E]"
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