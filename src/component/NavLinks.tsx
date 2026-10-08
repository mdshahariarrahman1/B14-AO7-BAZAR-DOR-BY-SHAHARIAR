
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

  const data: Category[] = await res.json();

  return (
    <nav className="border-y border-gray-200 bg-white">
      <div className="container mx-auto flex items-center gap-10 px-10 py-5 text-[#1D271F]">
        {data.map((category) => (
          <div
            key={category.id}
            className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-sm font-semibold text-gray-700"
          >
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavLinksPage;