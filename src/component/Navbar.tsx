"use client";

import Image from "next/image";

import Logo from "@/asst/logo-icon.png";
import NavLinksPage from "./NavLinks";

const NavbarPage = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className=" ">
      <section className="container mx-auto flex justify-between py-3 px-4">
        <div className=" flex items-center gap-3">
          <Image
            src={Logo}
            alt="LOGO"
            width={64}
            height={64}
            className="py-3 px-4 bg-green-700 rounded-2xl"
          />
          <div>
            <h1 className=" font-bold text-[22px]">বাজার দর</h1>
            <p className="text-[14px]">{date}</p>
          </div>
        </div>

        <div className=" flex gap-4">
          <button className=" font-semibold text-[16px] text-[#1D271F] leading-5.25 py-2.5 px-5 cursor-pointer">
            সাইন ইন
          </button>
          <button
            className="font-semibold text-[16px] text-[#F3FBF4] bg-[#05893E] leading-5.25 py-2.5 px-5 rounded-lg
          hover:shadow-[0_6px_8px_0_#047F3966] cursor-pointer transition-shadow duration-200"
          >
            সাইন আপ
          </button>
        </div>
      </section>
      <NavLinksPage/>
    </div>
  );
};

export default NavbarPage;
