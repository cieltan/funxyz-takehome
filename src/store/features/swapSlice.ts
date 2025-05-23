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
  sourceAmount: string;
  targetAmount: string;
  slippage: number;
  loading: boolean;
  error: string | null;
}

const initialState: SwapState = {
  source: null,
  target: null,
  sourceAmount: '',
  targetAmount: '',
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
    setTokenSource: (state, action: PayloadAction<Erc20AssetInfo| null>) => {
      state.source = action.payload
    },
    setTokenTarget: (state, action: PayloadAction<Erc20AssetInfo| null>) => {
      state.target = action.payload
    },
    setSourcePriceData: (state, action: PayloadAction<PriceData| null>) => {
      state.sourcePriceData = action.payload
    },
    setTargetPriceData: (state, action: PayloadAction<PriceData| null>) => {
      state.targetPriceData = action.payload
    },
    updateSourceAmount: (state, action: PayloadAction<string>) => {
      state.sourceAmount = action.payload
    },
    updateTargetAmount: (state, action: PayloadAction<string>) => {
      state.targetAmount = action.payload
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
  },
});

export const {
  setTokenSource,
  setTokenTarget,
  setSourcePriceData,
  setTargetPriceData,
  updateSourceAmount,
  updateTargetAmount,
  setSlippage,
  setLoading,
  setError,
  resetSwapState,
} = swapSlice.actions;

export default swapSlice.reducer; 