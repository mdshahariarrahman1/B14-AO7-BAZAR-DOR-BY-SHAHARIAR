
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface CategoryLinksProps {
  categories: Category[];
}

const CategoryLinks = ({ categories }: CategoryLinksProps) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-5 overflow-x-auto overscroll-x-contain py-3 text-[#1D271F] [scrollbar-width:none] sm:gap-10 sm:py-5 [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => {
        const href = `/category/${category.slug}`;

        const isActive =
          pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={category.id}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-all duration-200 sm:gap-2 sm:text-sm ${
              isActive
                ? "bg-[#05893E] text-white shadow-sm"
                : "text-gray-700 hover:bg-green-50 hover:text-[#05893E]"
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryLinks;
