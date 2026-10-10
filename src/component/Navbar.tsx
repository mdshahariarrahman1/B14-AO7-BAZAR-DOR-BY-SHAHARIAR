import Image from "next/image";

import Logo from "@/asst/logo-icon.png";
import NavLinksPage from "./NavLinks";
import CurrentDate from "./CurrentDate";
import UserInfo from "./UserInfo";

const NavbarPage = () => {
  return (
    <>
      <section className="container mx-auto flex items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image
            src={Logo}
            alt="LOGO"
            width={64}
            height={64}
            className="h-12 w-12 shrink-0 rounded-xl bg-green-700 p-2 sm:h-16 sm:w-16 sm:rounded-2xl sm:p-3"
          />

          <div className="min-w-0">
            <h1 className="text-[18px] font-bold sm:text-[22px]">
              বাজার দর
            </h1>

            <p className="text-xs sm:text-[14px]">
              <CurrentDate />
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <UserInfo />
        </div>
      </section>

      <NavLinksPage />
    </>
  );
};

export default NavbarPage;
