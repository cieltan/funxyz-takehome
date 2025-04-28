import {
    getAssetErc20ByChainAndSymbol,
    getAssetPriceInfo,
} from '@funkit/api-base'
import { useState, useEffect } from 'react'

interface TokenData {
    tokenInfo: Awaited<ReturnType<typeof getAssetErc20ByChainAndSymbol>> | null;
    price: Awaited<ReturnType<typeof getAssetPriceInfo>> | null;
    loading: boolean;
    error: Error | null;
}

interface UseFunProps {
    chainId: string;
    symbol: string;
    tokenAddress: string;
    apiKey: string;
}

export const useFun = ({
    chainId,
    symbol,
    tokenAddress,
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
            try {
                const [tokenInfo, price] = await Promise.all([
                    getAssetErc20ByChainAndSymbol({
                        chainId,
                        symbol,
                        apiKey
                    }),
                    getAssetPriceInfo({
                        chainId,
                        assetTokenAddress: tokenAddress,
                        apiKey
                    })
                ]);

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
    }, [chainId, symbol, tokenAddress, apiKey]);

    return data;
}