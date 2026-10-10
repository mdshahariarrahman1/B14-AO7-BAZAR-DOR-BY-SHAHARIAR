"use client";

import React from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SiRefinedgithub } from "react-icons/si";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignInPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(
      formData.entries(),
    );

    console.log(data);

    const { data: resData, error } = await signIn.email({
      email: data.email as string,
      password: data.password as string,
      callbackURL: "/",
    });

    if (error) {
      console.error("Sign In Error:", error);
      toast.error(error.message || "সাইন ইন করা যায়নি");
      return;
    }

    console.log("Sign In Success:", resData);

    toast.success("সফলভাবে সাইন ইন হয়েছে!");

    router.push("/");
    router.refresh();
  };

  return (
    <main className="min-h-[75vh] bg-[#F0F5F0] px-4 py-10 text-[#252D26]">
      <div className="mx-auto w-full max-w-110">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">সাইন ইন</h1>

          <p className="mt-1 text-sm text-[#758078]">
            বিস্তারিত নাম, বাজারের তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন
          </p>
        </div>

        {/* Sign In Card */}
        <div className="rounded-2xl border border-[#DFE7DF] bg-[#FAFCFA] p-5.5">
          <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "সঠিক ইমেইল অ্যাড্রেস লিখুন";
                }

                return null;
              }}
              className="flex w-full flex-col gap-1.5"
            >
              <Label className="text-sm font-medium">ইমেইল</Label>

              <Input
                placeholder="you@example.com"
                className="h-9.5 w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 text-sm outline-none focus:border-[#078A43]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type="password"
              minLength={8}
              validate={(value) => {
                if (value.length < 8) {
                  return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                }

                if (!/[A-Z]/.test(value)) {
                  return "অন্তত একটি ইংরেজি বড় হাতের অক্ষর দিন";
                }

                if (!/[0-9]/.test(value)) {
                  return "অন্তত একটি সংখ্যা দিন";
                }

                return null;
              }}
              className="flex w-full flex-col gap-1.5"
            >
              <Label className="text-sm font-medium">পাসওয়ার্ড</Label>

              <Input
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="h-9.5 w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 text-sm outline-none focus:border-[#078A43]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Forgot Password */}
            <div className="-mt-2 flex w-full justify-end">
              <Link
                href="/sign-up"
                className="text-xs text-[#078A43] hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="h-12 w-full cursor-pointer rounded-lg bg-[#078A43] text-sm font-semibold text-white shadow-[0_3px_3px_rgba(0,0,0,0.2)] transition-colors duration-300 hover:bg-[#067638]"
            >
              সাইন ইন
            </Button>
          </Form>

          {/* Divider */}
          <div className="my-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#DFE7DF]" />
            <span className="text-xs text-[#657067]">অথবা</span>
            <div className="h-px flex-1 bg-[#DFE7DF]" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="secondary"
              className="flex h-9.5 min-w-0 cursor-pointer items-center rounded-lg border border-[#DFE7DF] bg-transparent px-2 text-[14px] font-semibold text-[#252D26] transition-colors hover:bg-[#F0F5F0]"
              onPress={() => {
                alert("Google authentication এখনো যুক্ত করা হয়নি");
              }}
            >
              <p className="text-base font-bold pr-1.5">
                <FcGoogle />
              </p>
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="flex h-9.5 min-w-0 cursor-pointer items-center rounded-lg border border-[#DFE7DF] bg-transparent px-2 text-[14px] font-semibold text-[#252D26] transition-colors hover:bg-[#F0F5F0]"
              onPress={() => {
                alert("GitHub authentication এখনো যুক্ত করা হয়নি");
              }}
            >
              <p className="text-base font-bold pr-1.5">
                <SiRefinedgithub />
              </p>
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-4 text-center text-xs text-[#657067]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-[#078A43] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-[#758078] transition-colors hover:text-[#078A43]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
