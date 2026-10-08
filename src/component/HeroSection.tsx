import Image from "next/image";

import HeroImage from '@/asst/bazar-hero 1.png';

const HeroSectionPage = () => {

    const dates = new Date().toLocaleDateString("bn-BD",{
        dateStyle: "full",
    })

  return (

    <>

    <section className="bg-[#F1F7F3] px-4 py-5">
      <div className="container mx-auto">
        <div className="flex min-h-57 items-center justify-between overflow-hidden rounded-[20px] border border-[#DDE6DF] bg-[#FFFFFF] px-5 py-5 md:px-3 lg:px-3">
          <div className="pl-4">
            <div className="mb-2 inline-flex rounded-full bg-[#E5F6EA] px-3 py-1">
              <p className="text-[14px] leading-5 font-medium text-[#05893E]">
                {dates}
              </p>
            </div>

            <h1 className="text-[36px] font-bold leading-11.25 tracking-[-0.5px] text-[#1D271F] md:text-[32px]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 max-w-130 text-[15px] leading-6 text-[#1D271F]/70">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিভাজিত, দ্রুত, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-5 inline-flex items-center rounded-md bg-[#05893E] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_3px_5px_#05893E55] transition-all duration-200 hover:bg-[#047F39] hover:shadow-[0_5px_8px_#05893E55]"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          <div className="hidden pr-8 md:block">
            <Image
              src={HeroImage}
              alt="বাজারের পণ্য"
              
            />
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HeroSectionPage;
