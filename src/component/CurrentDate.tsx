"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => {
  return () => {};
};

const getSnapshot = () => {
  return new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
};

const getServerSnapshot = () => "";

const CurrentDate = () => {
  const date = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return (
    <span className="text-[14px] leading-5 font-medium text-[#05893E]">
      {date || "তারিখ লোড হচ্ছে..."}
    </span>
  );
};

export default CurrentDate;
