'use client'

import { useEffect } from "react";
import SwapContainer from "@/components/swap/SwapContainer";
import { useSearchParams } from "next/navigation";

const Home = () => {
  const searchParams = useSearchParams()

  useEffect(() => {
  }, [searchParams])

  const fetchData = async () => {
    // const tokenInfo = await getAssetErc20ByChainAndSymbol({
    //   chainId: '1',
    //   symbol: 'USDC',
    //   apiKey: process.env.NEXT_PUBLIC_FUNXYZ_API_KEY as string
    // })
    // console.log(tokenInfo)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex  bg-background justify-center items-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 pb-12 sm:pb-16 md:pb-20 gap-4 sm:gap-8 md:gap-12 lg:gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl row-start-2 items-center sm:items-start">
        <SwapContainer />
      </main>
    </div>
  );
}

export default Home
