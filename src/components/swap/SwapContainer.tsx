'use client'

import { useState } from "react"
import SwapDefaultView from "./SwapDefaultView";
import SwapSelectTokenView from "./SwapSelectTokenView";
import { SwapContainerView, SwapSide } from "@/utils/const"

const SwapContainer = () => {
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

    return (
        <div className="flex flex-col relative bg-background shadow-[0.8rem_0.8rem_1.4rem_var(--foreground),-0.2rem_-0.2rem_1.8rem_var(--white)] p-3 sm:p-4 md:p-6 rounded-lg gap-3 sm:gap-4 w-full">
            {renderView()}
        </div>
    )
}

export default SwapContainer