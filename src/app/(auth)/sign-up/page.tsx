"use client";

import React from "react";
import type { FormEvent } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SiRefinedgithub } from "react-icons/si";
import { toast } from "react-toastify";
import { authClient, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    );

    if (name.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      toast.error("সঠিক ইমেইল অ্যাড্রেস লিখুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("অন্তত একটি ইংরেজি বড় হাতের অক্ষর দিন");
      return;
    }

    if (!/[0-9]/.test(password)) {
      toast.error("অন্তত একটি সংখ্যা দিন");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    try {
      const { data, error } = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        console.error("Sign Up Error:", error);
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      console.log("Sign Up Success:", data);
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");

      router.replace("/sign-in");
      router.refresh();
    } catch (err) {
      console.error("Sign Up Exception:", err);
      toast.error("সার্ভারের সঙ্গে সংযোগ করা যায়নি");
    }
  };

  const handelGoogleSignUp = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        console.error("Google Sign Up Error:", error);
        toast.error(error.message || "Google দিয়ে সাইন আপ করা যায়নি");
        return;
      }

      console.log("Google Sign Up Success:", data);
    } catch (err) {
      console.error("Google Sign Up Exception:", err);
      toast.error("Google authentication ব্যর্থ হয়েছে");
    }
  };

  const handelGitHubSignUp = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        console.error("GitHub Sign Up Error:", error);
        toast.error(error.message || "GitHub দিয়ে সাইন আপ করা যায়নি");
        return;
      }

      console.log("GitHub Sign Up Success:", data);
    } catch (err) {
      console.error("GitHub Sign Up Exception:", err);
      toast.error("GitHub authentication ব্যর্থ হয়েছে");
    }
  };

  return (
    <main className="min-h-[60vh] bg-[#F0F5F0] px-3 py-6 text-[#252D26] sm:px-4 sm:py-10">
      <div className="mx-auto w-full max-w-110">

        {/* Heading */}
        <div className="mb-5 text-center sm:mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-1 text-sm leading-6 text-[#758078]">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দেখুন
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="rounded-2xl border border-[#DFE7DF] bg-[#FAFCFA] p-4 sm:p-5.5">
          <Form
            className="flex w-full flex-col gap-4"
            onSubmit={onSubmit}
          >
            {/* Name */}
            <TextField
              isRequired
              name="name"
              className="flex w-full flex-col gap-1.5"
              validate={(value) => {
                if (!value.trim()) {
                  return "আপনার নাম লিখুন";
                }

                if (value.trim().length < 2) {
                  return "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
                }

                return null;
              }}
            >
              <Label className="text-sm font-medium">নাম</Label>

              <Input
                name="name"
                placeholder="যেমন: রহিম উদ্দিন"
                className="h-10 w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 text-sm outline-none focus:border-[#078A43]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="flex w-full flex-col gap-1.5"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "সঠিক ইমেইল অ্যাড্রেস লিখুন";
                }

                return null;
              }}
            >
              <Label className="text-sm font-medium">ইমেইল</Label>

              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="h-10 w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 text-sm outline-none focus:border-[#078A43]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type="password"
              minLength={8}
              className="flex w-full flex-col gap-1.5"
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
            >
              <Label className="text-sm font-medium">পাসওয়ার্ড</Label>

              <Input
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="h-10 w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 text-sm outline-none focus:border-[#078A43]"
              />

              <Description className="text-xs leading-5 text-[#758078]">
                কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা
              </Description>

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Confirm Password */}
            <TextField
              isRequired
              name="confirmPassword"
              type="password"
              className="flex w-full flex-col gap-1.5"
              validate={(value) => {
                if (!value) {
                  return "আবার পাসওয়ার্ড লিখুন";
                }

                return null;
              }}
            >
              <Label className="text-sm font-medium">
                পাসওয়ার্ড নিশ্চিত করুন
              </Label>

              <Input
                name="confirmPassword"
                type="password"
                placeholder="আবার লিখুন"
                className="h-10 w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 text-sm outline-none focus:border-[#078A43]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-0.5 h-11 w-full cursor-pointer rounded-lg bg-[#078A43] text-sm font-semibold text-white shadow-[0_3px_3px_rgba(0,0,0,0.2)] transition-colors duration-300 hover:bg-[#067638] sm:h-12"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Button>
          </Form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#DFE7DF]" />
            <span className="text-xs text-[#657067]">অথবা</span>
            <div className="h-px flex-1 bg-[#DFE7DF]" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              onPress={handelGoogleSignUp}
              className="flex h-10 w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#DFE7DF] bg-transparent px-2 text-xs font-semibold text-[#252D26] transition-colors hover:bg-[#F0F5F0] sm:text-sm"
            >
              <FcGoogle className="shrink-0 text-base" />
              <span>Google দিয়ে চালিয়ে যান</span>
            </Button>

            <Button
              type="button"
              variant="secondary"
              onPress={handelGitHubSignUp}
              className="flex h-10 w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#DFE7DF] bg-transparent px-2 text-xs font-semibold text-[#252D26] transition-colors hover:bg-[#F0F5F0] sm:text-sm"
            >
              <SiRefinedgithub className="shrink-0 text-base" />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </Button>
          </div>

          {/* Sign In Link */}
          <p className="mt-4 text-center text-xs leading-5 text-[#657067]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-[#078A43] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-5 text-center sm:mt-6">
          <Link
            className="text-sm text-[#758078] transition-colors hover:text-[#078A43]"
            href="/"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
