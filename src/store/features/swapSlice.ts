import { Erc20AssetInfo } from '@funkit/api-base';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type PriceData = {
  amount: number;
  total: number;
  unitPrice: number;
}

interface SwapState {
  source: Erc20AssetInfo | null;
  sourcePriceData: PriceData | null;
  target: Erc20AssetInfo | null;
  targetPriceData: PriceData | null;
  slippage: number;
  loading: boolean;
  error: string | null;
}

const initialState: SwapState = {
  source: null,
  target: null,
  slippage: 0.5, // Default 0.5%
  loading: false,
  error: null,
  sourcePriceData: null,
  targetPriceData: null,  
};

export const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setTokenSource: (state, action: PayloadAction<Erc20AssetInfo>) => {
      state.source = action.payload
    },
    setTokenTarget: (state, action: PayloadAction<Erc20AssetInfo>) => {
      state.target = action.payload
    },
    setSourcePriceData: (state, action: PayloadAction<PriceData>) => {
      state.sourcePriceData = action.payload
    },
    setTargetPriceData: (state, action: PayloadAction<PriceData>) => {
      state.targetPriceData = action.payload
    },
    setSlippage: (state, action: PayloadAction<number>) => {
      state.slippage = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetSwapState: (state) => {
      return initialState;
    },
  },
});

export const {
  setTokenSource,
  setTokenTarget,
  setSourcePriceData,
  setTargetPriceData,
  setSlippage,
  setLoading,
  setError,
  resetSwapState,
} = swapSlice.actions;

export default swapSlice.reducer; 