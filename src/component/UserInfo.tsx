"use client";

import { useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserInfo = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট করা যায়নি!");
      return;
    }

    setIsOpen(false);

    toast.success("সফলভাবে সাইন আউট হয়েছে!", {
      position: "top-center",
      autoClose: 2000,
    });

    router.push("/");
    router.refresh();
  };

  // User login না থাকলে
  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/sign-in">
          <button
            type="button"
            className="cursor-pointer py-2.5 px-5 text-[16px] font-semibold text-[#1D271F] leading-5"
          >
            সাইন ইন
          </button>
        </Link>

        <Link href="/sign-up">
          <button
            type="button"
            className="cursor-pointer rounded-lg bg-[#05893E] px-5 py-2.5 text-[16px] font-semibold text-[#F3FBF4] leading-5 hover:shadow-[0_6px_8px_0_#047F3966] transition-shadow duration-200"
          >
            সাইন আপ
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Profile Button: Click করার আগের UI */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full px-2 py-1.5 hover:bg-[#F0F5F1] transition-colors cursor-pointer"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DDE8DE] text-sm font-semibold text-[#1D271F]">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <span className="text-[12px] font-medium leading-5 text-[#1D271F]">
          {user.name || "User"}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-[#647067] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="m7 10 5 5 5-5" />
        </svg>
      </button>

      {/* Click করার পর Dropdown */}
      {isOpen && (
        <>
          {/* বাইরে Click করলে Dropdown বন্ধ হবে */}
          <button
            type="button"
            aria-label="Close dropdown"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 top-full z-50 mt-2 w-90 max-w-[calc(100vw-24px)] rounded-[24px] border border-[#DFE7DF] bg-[#FAFCFA] px-7 py-6 shadow-[0_12px_20px_rgba(0,0,0,0.18)]">
            {/* User Information */}
            <div className="mb-5">
              <h3 className="text-[20px] font-semibold leading-7 text-[#263129]">
                {user.name}
              </h3>

              <p className="break-all text-[16px] leading-6 text-[#68716A]">
                {user.email}
              </p>
            </div>

            {/* My Profile */}

            <Link href="/profile">
            <button
              type="button"
              className="mb-4 flex w-full cursor-pointer items-center gap-2 text-left text-[18px] text-[#263129] hover:text-[#05893E] transition-colors"
            >
              <span>👤</span>
              <span>আমার প্রোফাইল</span>
            </button>
            </Link>

            {/* Sign Out */}
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 text-left text-[18px] text-[#EF4444] hover:text-[#C62828] transition-colors"
            >
              <span className="text-[24px]">↶</span>
              <span>সাইন আউট</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
