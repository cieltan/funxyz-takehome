'use client'

import { useEffect } from "react";
import SwapContainer from "@/components/swap/SwapContainer";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setTokenSource, setTokenTarget, setSourcePriceData, setTargetPriceData } from "@/store/features/swapSlice";
import { useFun } from "@/components/hooks/useFun";
import { Token } from "@/types/token";

const Home = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const sourceSymbol = searchParams.get('source') as Token | null;
  const targetSymbol = searchParams.get('target') as Token | null;
  const apiKey = process.env.NEXT_PUBLIC_FUNXYZ_API_KEY || '';

  const sourceData = useFun({ symbol: sourceSymbol, apiKey });
  const targetData = useFun({ symbol: targetSymbol, apiKey });

  useEffect(() => {
    if (sourceData.tokenInfo && sourceData.price) {
      dispatch(setTokenSource(sourceData.tokenInfo));
      dispatch(setSourcePriceData(sourceData.price));
    }
  }, [sourceData, dispatch]);

  useEffect(() => {
    if (targetData.tokenInfo && targetData.price) {
      dispatch(setTokenTarget(targetData.tokenInfo));
      dispatch(setTargetPriceData(targetData.price));
    }
  }, [targetData, dispatch]);

  return (
    <div className="flex  bg-background justify-center items-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 pb-12 sm:pb-16 md:pb-20 gap-4 sm:gap-8 md:gap-12 lg:gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl row-start-2 items-center sm:items-start">
        <SwapContainer />
      </main>
    </div>
  );
};

export default Home;
