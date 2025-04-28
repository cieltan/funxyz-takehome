import {
    getAssetErc20ByChainAndSymbol,
    getAssetPriceInfo,
} from '@funkit/api-base'
import { useState, useEffect } from 'react'
import { TOKEN_CHAIN_MAP, Token } from '@/types/token'

interface TokenData {
    tokenInfo: Awaited<ReturnType<typeof getAssetErc20ByChainAndSymbol>> | null;
    price: Awaited<ReturnType<typeof getAssetPriceInfo>> | null;
    loading: boolean;
    error: Error | null;
}

interface UseFunProps {
    symbol: Token | null;
    apiKey: string;
}

export const useFun = ({
    symbol,
    apiKey
}: UseFunProps): TokenData => {
    const [data, setData] = useState<TokenData>({
        tokenInfo: null,
        price: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!symbol || !(symbol in TOKEN_CHAIN_MAP)) {
                setData({
                    tokenInfo: null,
                    price: null,
                    loading: false,
                    error: null
                });
                return;
            }

            try {
                const chainId = TOKEN_CHAIN_MAP[symbol];
                const tokenInfo = await getAssetErc20ByChainAndSymbol({
                    chainId: chainId.toString(),
                    symbol,
                    apiKey
                });

                const price = await getAssetPriceInfo({
                    chainId: chainId.toString(),
                    assetTokenAddress: tokenInfo.address,
                    apiKey
                });

                setData({
                    tokenInfo,
                    price,
                    loading: false,
                    error: null
                });
            } catch (error) {
                setData(prev => ({
                    ...prev,
                    loading: false,
                    error: error instanceof Error ? error : new Error('An error occurred')
                }));
            }
        };

        fetchData();
    }, [symbol, apiKey]);

    return data;
}