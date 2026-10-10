import Image from "next/image";

import Logo from "@/asst/logo-icon.png";
import NavLinksPage from "./NavLinks";
import CurrentDate from "./CurrentDate";
import UserInfo from "./UserInfo";

const NavbarPage = () => {

  return (
    <>
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
            <p className="text-[14px]"><CurrentDate/></p>
          </div>
        </div>

        <UserInfo/>
      </section>
      <NavLinksPage/>
    
    </>
  );
};

export default NavbarPage;
