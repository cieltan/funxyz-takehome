'use client'

import { useState } from "react"
import SwapDefaultView from "./SwapDefaultView";
import { SwapContainerView, SwapSide } from "@/utils/const"

const SwapContainer = () => {
    const [view, setView] = useState<SwapContainerView>(SwapContainerView.DEFAULT);
    const [selectedSwapSide, setSelectedSwapSide] = useState<SwapSide | null>(null);

    const renderView = () => {
        switch (view) {
            case SwapContainerView.SELECT_TOKEN:
                return <div>SELECT TOKEN</div>
            default:
                return <SwapDefaultView selectedSwapSide={selectedSwapSide} setSelectedSwapSide={setSelectedSwapSide} setView={setView} />
        }
    }

    return renderView()

}

export default SwapContainer