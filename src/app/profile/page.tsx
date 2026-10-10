
"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const ProfilePage=()=> {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const user = session?.user;

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি!");
        setIsSigningOut(false);
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 800);
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setIsSigningOut(false);
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি");
        return;
      }

      toast.success("প্রোফাইল আপডেট হয়েছে!");
      router.refresh();
    } catch {
      toast.error("আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-[75vh] bg-[#F0F5F0] px-4 py-12">
        <div className=" container mx-auto animate-pulse">
          <div className="mb-6 h-8 w-40 rounded bg-gray-200" />
          <div className="mb-5 h-27 rounded-2xl bg-white" />
          <div className="h-56 rounded-2xl bg-white" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#F0F5F0] px-4">
        <div className="rounded-2xl border border-[#DFE7DF] bg-[#FAFCFA] p-8 text-center">
          <h1 className="text-xl font-bold text-[#252D26]">
            আপনার প্রোফাইল দেখতে সাইন ইন করুন
          </h1>

          <button
            onClick={() => router.push("/sign-in")}
            className="mt-5 rounded-lg bg-[#078A43] px-6 py-3 font-semibold text-white hover:bg-[#067638]"
          >
            সাইন ইন
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[75vh] bg-[#F0F5F0] px-4 py-10 text-[#252D26]">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-[#758078]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Information */}
        <div className="mb-5 flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-[#DFE7DF] bg-[#FAFCFA] p-5">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#E9EEE9]">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  fill
                  sizes="64px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-2xl font-bold text-[#078A43]">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="break-all text-sm text-[#758078]">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="shrink-0 rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            ↩ {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </div>

        {/* Profile Form */}
        <div className="rounded-2xl border border-[#DFE7DF] bg-[#FAFCFA] p-5">
          <h2 className="mb-7 text-base font-bold">তথ্য</h2>

          <form onSubmit={handleUpdate} className="px-0 sm:px-5">
            <label
              htmlFor="profile-name"
              className="mb-1.5 block text-sm font-medium"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={user.name || "আপনার নাম লিখুন"}
              className="h-9.5 w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 text-sm outline-none transition focus:border-[#078A43] focus:ring-1 focus:ring-[#078A43]"
            />

            <button
              type="submit"
              disabled={isUpdating || !name.trim()}
              className="mt-3.5 h-9.5 w-full rounded-lg bg-[#078A43] text-sm font-semibold text-white shadow-[0_3px_3px_rgba(0,0,0,0.2)] transition hover:bg-[#067638] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;