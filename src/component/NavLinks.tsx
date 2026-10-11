
import CategoryLinks from "./CategoryLinks";
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
        <div className="container mx-auto px-4 sm:px-10">
          <CategoryLinks categories={data} />
        </div>
      </nav>

      <MarqueePage />
    </>
  );
};

export default NavLinksPage;
