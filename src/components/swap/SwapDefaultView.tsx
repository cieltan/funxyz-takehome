import FilledButton from "../buttons/FilledButton"
import TokenSelectButton from "../buttons/TokenSelectButton"
import SwapInput from "../input/SwapInput"
import { ArrowDown } from "lucide-react"
import BasicNeuButton from "../buttons/BasicNeuButton"
import Gear from "../icons/Gear"
import { useState } from "react"
import { RootState } from "@/store"
import { useSelector } from "react-redux"

import { SELECT_TOKEN, SOURCE, SwapSide, TARGET } from "@/utils/const"
import { SwapContainerView } from "@/utils/const"

interface SwapDefaultViewProps {
    selectedSwapSide: SwapSide | null,
    setSelectedSwapSide: (swapSide: SwapSide) => void
    setView: (view: SwapContainerView) => void
}

const SwapDefaultView = ({ setSelectedSwapSide, setView }: SwapDefaultViewProps) => {
    const iconSize = 32
    const [firstInputType, setFirstInputType] = useState<SwapSide>(SOURCE)
    const [secondInputType, setSecondInputType] = useState<SwapSide>(TARGET)

    const firstInputToken = useSelector((state: RootState) => firstInputType === SOURCE ? state.swap.source : state.swap.target)
    const secondInputToken = useSelector((state: RootState) => secondInputType === TARGET ? state.swap.target : state.swap.source)

    return <>
        <div className="flex justify-end">
            <BasicNeuButton className="rounded-full">
                <Gear height={iconSize} width={iconSize} />
            </BasicNeuButton>
        </div>
        <div className="flex justify-around items-center gap-3 w-full">
            <SwapInput type={firstInputType} />
            <TokenSelectButton
                selectedToken={firstInputToken}
                onClick={() => {
                    setView(SELECT_TOKEN)
                    setSelectedSwapSide(firstInputType)
                }}
            />
        </div>
        <div className="flex self-center">
            <BasicNeuButton onClick={() => {
                setFirstInputType(secondInputType)
                setSecondInputType(firstInputType)
            }}>
                <ArrowDown height={iconSize} width={iconSize} />
            </BasicNeuButton>
        </div>
        <div className="flex justify-around items-center gap-3 w-full">
            <SwapInput type={secondInputType} />
            <TokenSelectButton
                selectedToken={secondInputToken}
                onClick={() => {
                    setView(SELECT_TOKEN)
                    setSelectedSwapSide(secondInputType)
                }}
            />
        </div>
        <FilledButton disabled={true}>
            <p className="text-xl sm:text-2xl font-extrabold text-inherit">SWAP</p>
        </FilledButton>
    </>
}

export default SwapDefaultView                  