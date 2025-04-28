import { SELECT_TOKEN, SwapSide, SwapSides } from "@/utils/const"

import { SwapContainerView } from "@/utils/const"
import FilledButton from "../buttons/FilledButton"
import TokenSelectButton from "../buttons/TokenSelectButton"
import SwapInput from "../input/SwapInput"
import { ArrowDown } from "lucide-react"
import BasicNeuButton from "../buttons/BasicNeuButton"
import Gear from "../icons/Gear"

interface SwapDefaultViewProps {
    selectedSwapSide: SwapSide | null,
    setSelectedSwapSide: (swapSide: SwapSide) => void
    setView: (view: SwapContainerView) => void
}

const SwapDefaultView = ({ selectedSwapSide, setSelectedSwapSide, setView }: SwapDefaultViewProps) => {
    const iconSize = 32

    return <div className="flex flex-col relative bg-background shadow-[0.8rem_0.8rem_1.4rem_var(--foreground),-0.2rem_-0.2rem_1.8rem_var(--white)] p-3 sm:p-4 md:p-6 rounded-lg gap-3 sm:gap-4 w-full">
        <div className="flex justify-end">
            <BasicNeuButton className="rounded-full">
                <Gear height={iconSize} width={iconSize} />
            </BasicNeuButton>
        </div>
        <div className="flex justify-around items-center gap-3 w-full">
            <SwapInput type={SwapSides.SOURCE} />
            <TokenSelectButton
                selectedToken={null}
                onClick={() => {
                    setView(SELECT_TOKEN)
                    setSelectedSwapSide(SwapSides.SOURCE)
                }}
            />
        </div>
        <div className="flex self-center">
            <BasicNeuButton>
                <ArrowDown height={iconSize} width={iconSize} />
            </BasicNeuButton>
        </div>
        <div className="flex justify-around items-center gap-3 w-full">
            <SwapInput type={SwapSides.TARGET} />
            <TokenSelectButton
                selectedToken={null}
                onClick={() => {
                    setView(SELECT_TOKEN)
                    setSelectedSwapSide(SwapSides.TARGET)
                }}
            />
        </div>
        <FilledButton disabled={true}>
            <p className="text-xl sm:text-2xl font-extrabold text-inherit">SWAP</p>
        </FilledButton>
    </div>
}

export default SwapDefaultView                  