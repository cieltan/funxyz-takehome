import { SwapContainerView, SwapSides } from "@/utils/const"
import { Token, TOKEN_CHAIN_MAP, TOKENS_SYMBOL } from "@/types/token"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setTokenSource, setTokenTarget, setLoading, setError, setSourcePriceData, setTargetPriceData, updateTargetAmount, updateSourceAmount } from "@/store/features/swapSlice"
import { ArrowLeft } from "lucide-react"
import BasicNeuButton from "../buttons/BasicNeuButton"
import { getAssetErc20ByChainAndSymbol, getAssetPriceInfo } from "@funkit/api-base"
import { RootState } from "@/store"

interface SwapSelectTokenViewProps {
    selectedSwapSide: typeof SwapSides[keyof typeof SwapSides]
    setView: (view: SwapContainerView) => void
}

const SwapSelectTokenView = ({ selectedSwapSide, setView }: SwapSelectTokenViewProps) => {
    const dispatch = useAppDispatch()
    const source = useAppSelector((state: RootState) => state.swap.source)
    const target = useAppSelector((state: RootState) => state.swap.target)
    const sourcePriceData = useAppSelector((state: RootState) => state.swap.sourcePriceData)
    const targetPriceData = useAppSelector((state: RootState) => state.swap.targetPriceData)

    const checkIfTokenIsSelected = (token: Token) => {
        if (selectedSwapSide === SwapSides.SOURCE) {
            return source?.symbol === token
        }
        return target?.symbol === token
    }

    const handleTokenSelect = async (token: Token) => {
        try {
            const isSelected = checkIfTokenIsSelected(token)
            if (isSelected) {
                dispatch(setTokenSource(target))
                dispatch(setTokenTarget(source))
                dispatch(setSourcePriceData(targetPriceData))
                dispatch(setTargetPriceData(sourcePriceData))
                return
            } else {
                if (selectedSwapSide === SwapSides.SOURCE) {
                    dispatch(setTokenSource(null))
                    dispatch(setSourcePriceData(null))
                    if (source !== null) dispatch(updateSourceAmount(''))
                } else {
                    dispatch(setTokenTarget(null))
                    dispatch(setTargetPriceData(null))
                    if (target !== null) dispatch(updateTargetAmount(''))
                }
            }
            dispatch(setLoading(true))
            const chainId = TOKEN_CHAIN_MAP[token]
            const apiKey = process.env.NEXT_PUBLIC_FUNXYZ_API_KEY
            if (!apiKey) {
                throw new Error('FUN API key not found')
            }

            const tokenData = await getAssetErc20ByChainAndSymbol({
                chainId: chainId.toString(),
                symbol: token,
                apiKey
            })

            const priceData = await getAssetPriceInfo({
                chainId: chainId.toString(),
                assetTokenAddress: tokenData.address,
                apiKey
            })


            if (selectedSwapSide === SwapSides.SOURCE) {
                dispatch(setTokenSource(tokenData))
                dispatch(setSourcePriceData(priceData))
            } else {
                dispatch(setTokenTarget(tokenData))
                dispatch(setTargetPriceData(priceData))
            }

            dispatch(setLoading(false))
            setView(SwapContainerView.DEFAULT)
        } catch (error) {
            dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch token information'))
            dispatch(setLoading(false))
        }
    }

    return (
        <>
            <div className="flex items-center gap-4 mb-4">
                <BasicNeuButton
                    onClick={() => setView(SwapContainerView.DEFAULT)}
                    className="rounded-full p-2"
                >
                    <ArrowLeft className="h-6 w-6" />
                </BasicNeuButton>
                <h2 className="text-2xl font-bold">Select Token</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.values(TOKENS_SYMBOL).map((token) => (
                    <BasicNeuButton
                        key={token}
                        onClick={() => handleTokenSelect(token)}
                        className="p-4 text-center"
                    >
                        <span className="text-lg font-bold">{token}</span>
                    </BasicNeuButton>
                ))}
            </div>
        </>
    )
}

export default SwapSelectTokenView
