'use client'

import SwapContainer from "@/components/swap/SwapContainer";
import { Suspense, useCallback } from "react";

const Home = () => {

  const renderFallback = useCallback(() => {
    return (
      <div className="flex flex-col relative bg-background shadow-[0.8rem_0.8rem_1.4rem_var(--foreground),-0.2rem_-0.2rem_1.8rem_var(--white)] p-3 sm:p-4 md:p-6 rounded-lg gap-3 sm:gap-4 w-full" />
    )
  }, [])

  return (
    <div className="flex  bg-background justify-center items-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 pb-12 sm:pb-16 md:pb-20 gap-4 sm:gap-8 md:gap-12 lg:gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl row-start-2 items-center sm:items-start">
        <Suspense fallback={renderFallback()}>
          <SwapContainer />
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
