const FooterPage = () => {
  return (
    <footer className="border-t border-[#DDE6DF] bg-white">
      <div className="container mx-auto flex min-h-14 flex-col items-center justify-center gap-2 px-4 py-4 text-center text-xs font-semibold leading-5 text-[#1D271F] sm:flex-row sm:justify-between sm:gap-4 sm:text-left sm:text-[14px] sm:py-3">
        <p>
          বাজার দর — প্রতিদিনের পণ্যের দামের এক নজরে।
        </p>

        <p>
          সকল দাম সপ্তাহ; বাজার ব্যবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;
