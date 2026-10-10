
const LoadingPage =()=> {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center bg-[#F0F5F1]">
      <div className="text-4xl animate-pulse">🛒</div>

      <h2 className="mt-3 text-2xl font-bold text-[#1D271F]">
        বাজার দর
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        একটু অপেক্ষা করুন...
      </p>

      <div className="mt-5 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#05893E]" />
      
      <p className="mt-3 text-sm text-[#05893E]">
        তথ্য লোড হচ্ছে
      </p>
    </div>
  );
}

export default LoadingPage;