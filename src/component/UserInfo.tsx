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
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-4">
        <Link href="/sign-in">
          <button
            type="button"
            className="cursor-pointer whitespace-nowrap px-2 py-2 text-xs font-semibold leading-5 text-[#1D271F] sm:px-5 sm:py-2.5 sm:text-[16px]"
          >
            সাইন ইন
          </button>
        </Link>

        <Link href="/sign-up">
          <button
            type="button"
            className="cursor-pointer whitespace-nowrap rounded-lg bg-[#05893E] px-2.5 py-2 text-xs font-semibold leading-5 text-[#F3FBF4] transition-shadow duration-200 hover:shadow-[0_6px_8px_0_#047F3966] sm:px-5 sm:py-2.5 sm:text-[16px]"
          >
            সাইন আপ
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative shrink-0">
      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex max-w-36.25 cursor-pointer items-center gap-1 rounded-full px-1.5 py-1.5 transition-colors hover:bg-[#F0F5F1] sm:max-w-none sm:gap-2 sm:px-2"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#DDE8DE] text-sm font-semibold text-[#1D271F]">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <span className="truncate text-xs font-medium leading-5 text-[#1D271F] sm:text-[14px]">
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
          className={`shrink-0 text-[#647067] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="m7 10 5 5 5-5" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close dropdown"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 top-full z-50 mt-2 w-[calc(100vw-24px)] max-w-90 rounded-2xl border border-[#DFE7DF] bg-[#FAFCFA] px-4 py-5 shadow-[0_12px_20px_rgba(0,0,0,0.18)] sm:w-90 sm:rounded-[24px] sm:px-7 sm:py-6">
            {/* User Information */}
            <div className="mb-5 min-w-0">
              <h3 className="wrap-break-word text-lg font-semibold leading-7 text-[#263129] sm:text-[20px]">
                {user.name}
              </h3>

              <p className="break-all text-sm leading-6 text-[#68716A] sm:text-[16px]">
                {user.email}
              </p>
            </div>

            {/* My Profile */}
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="mb-4 flex w-full items-center gap-2 text-left text-base text-[#263129] transition-colors hover:text-[#05893E] sm:text-[18px]"
            >
              <span>👤</span>
              <span>আমার প্রোফাইল</span>
            </Link>

            {/* Sign Out */}
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full cursor-pointer items-center gap-2 text-left text-base text-[#EF4444] transition-colors hover:text-[#C62828] sm:text-[18px]"
            >
              <span className="text-2xl">↶</span>
              <span>সাইন আউট</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
