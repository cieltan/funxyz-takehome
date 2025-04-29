'use client'

import { useEffect, useState } from "react"
import SwapDefaultView from "./SwapDefaultView";
import SwapSelectTokenView from "./SwapSelectTokenView";
import { SwapContainerView, SwapSide } from "@/utils/const"
import { setTokenSource, setTokenTarget } from "@/store/features/swapSlice";
import { setSourcePriceData } from "@/store/features/swapSlice";
import { setTargetPriceData } from "@/store/features/swapSlice";
import { useFun } from "../hooks/useFun";
import { Token } from "@/types/token";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";

const SwapContainer = () => {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    const sourceSymbol = searchParams.get('source') as Token | null;
    const targetSymbol = searchParams.get('target') as Token | null;
    const apiKey = process.env.NEXT_PUBLIC_FUNXYZ_API_KEY || '';

    const sourceData = useFun({ symbol: sourceSymbol, apiKey });
    const targetData = useFun({ symbol: targetSymbol, apiKey });


    const [view, setView] = useState<SwapContainerView>(SwapContainerView.DEFAULT);
    const [selectedSwapSide, setSelectedSwapSide] = useState<SwapSide | null>(null);
    const renderView = () => {
        switch (view) {
            case SwapContainerView.SELECT_TOKEN:
                return selectedSwapSide ? (
                    <SwapSelectTokenView
                        selectedSwapSide={selectedSwapSide}
                        setView={setView}
                    />
                ) : null;
            default:
                return (
                    <SwapDefaultView
                        selectedSwapSide={selectedSwapSide}
                        setSelectedSwapSide={setSelectedSwapSide}
                        setView={setView}
                    />
                );
        }
    }

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
        <div className="flex flex-col relative bg-background shadow-[0.8rem_0.8rem_1.4rem_var(--foreground),-0.2rem_-0.2rem_1.8rem_var(--white)] p-3 sm:p-4 md:p-6 rounded-lg gap-3 sm:gap-4 w-full">
            {renderView()}
        </div>
    )
}

export default SwapContainer