import Image from "next/image";
import HeroImage from "@/asst/bazar-hero 1.png";
import Link from "next/link";
import { connection } from "next/server";

const NavbarPage = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="bg-[#F1F7F3] px-3 py-4 sm:px-4 sm:py-5">
      <div className="container mx-auto">
        <div className="flex flex-col items-start overflow-hidden rounded-[20px] border border-[#DDE6DF] bg-white px-4 py-6 sm:px-5 md:min-h-57 md:flex-row md:items-center md:justify-between md:px-3 md:py-5">

          {/* Hero Content */}
          <div className="min-w-0 pl-1 sm:pl-4 md:flex-1">
            <div className="mb-2 inline-flex max-w-full rounded-full bg-[#E5F6EA] px-3 py-1">
              <p className="text-xs font-medium leading-5 text-[#05893E] sm:text-[14px]">
                {date}
              </p>
            </div>

            <h1 className="text-[26px] leading-9 font-bold tracking-[-0.5px] text-[#1D271F] sm:text-[32px] sm:leading-10 lg:text-[36px] lg:leading-11.25">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-3 max-w-130 text-sm leading-6 text-[#1D271F]/70 sm:mt-4 sm:text-[15px]">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিভাজিত, দ্রুত, সর্বনিম্ন-সর্বাধিক এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#সব-পণ্য"
              className="mt-5 inline-flex items-center rounded-md bg-[#05893E] px-4 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#047F39] sm:px-5"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Hero Image */}
          <div className="mt-6 flex w-full justify-center md:mt-0 md:w-auto md:shrink-0 md:pr-8">
            <Image
              src={HeroImage}
              alt="বাজারের পণ্য"
              priority
              className="h-auto w-full max-w-65 object-contain sm:max-w-[320px] md:w-auto md:max-w-none"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default NavbarPage;
