import FilledButton from "../buttons/FilledButton"
import TokenSelectButton from "../buttons/TokenSelectButton"
import SwapInput from "../input/SwapInput"
import { ArrowDown } from "lucide-react"
import BasicNeuButton from "../buttons/BasicNeuButton"
import Gear from "../icons/Gear"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"

import { SOURCE, TARGET } from "@/utils/const"
import { SELECT_TOKEN, SwapSide } from "@/utils/const"
import { SwapContainerView } from "@/utils/const"
import { setSourcePriceData, setTargetPriceData, setTokenSource, setTokenTarget, updateSourceAmount, updateTargetAmount } from "@/store/features/swapSlice"
import { Token } from "@/types/token"

interface SwapDefaultViewProps {
    selectedSwapSide: SwapSide | null,
    setSelectedSwapSide: (swapSide: SwapSide) => void
    setView: (view: SwapContainerView) => void
}

const SwapDefaultView = ({ setSelectedSwapSide, setView }: SwapDefaultViewProps) => {
    const iconSize = 32
    const dispatch = useDispatch()

    const sourceToken = useSelector((state: RootState) => state.swap.source)
    const targetToken = useSelector((state: RootState) => state.swap.target)
    const sourcePriceData = useSelector((state: RootState) => state.swap.sourcePriceData)
    const targetPriceData = useSelector((state: RootState) => state.swap.targetPriceData)
    const sourceAmount = useSelector((state: RootState) => state.swap.sourceAmount)
    const targetAmount = useSelector((state: RootState) => state.swap.targetAmount)

    const setSelectTokenView = (swapSide: SwapSide) => {
        setView(SELECT_TOKEN)
        setSelectedSwapSide(swapSide)
    }

    return <>
        <div className="flex justify-end">
            <BasicNeuButton className="rounded-full">
                <Gear height={iconSize} width={iconSize} />
            </BasicNeuButton>
        </div>
        <div className="flex justify-around items-center gap-3 w-full">
            <SwapInput type={SOURCE} />
            <TokenSelectButton
                selectedToken={sourceToken?.symbol as Token}
                onClick={() => {
                    setSelectTokenView(SOURCE)
                }}
            />
        </div>
        <div className="flex self-center">
            <BasicNeuButton onClick={() => {
                dispatch(setTokenSource(targetToken))
                dispatch(setTokenTarget(sourceToken))
                dispatch(setSourcePriceData(targetPriceData))
                dispatch(setTargetPriceData(sourcePriceData))
                dispatch(updateSourceAmount(targetAmount))
                dispatch(updateTargetAmount(sourceAmount))
            }}>
                <ArrowDown height={iconSize} width={iconSize} />
            </BasicNeuButton>
        </div>
        <div className="flex justify-around items-center gap-3 w-full">
            <SwapInput type={TARGET} />
            <TokenSelectButton
                selectedToken={targetToken?.symbol as Token}
                onClick={() => {
                    setSelectTokenView(TARGET)
                }}
            />
        </div>
        <FilledButton disabled={true}>
            <p className="text-xl sm:text-2xl font-extrabold text-inherit">SWAP</p>
        </FilledButton>
    </>
}

export default SwapDefaultView                  