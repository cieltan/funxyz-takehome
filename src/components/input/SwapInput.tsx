import { ChangeEvent, useRef } from 'react';
import { SwapSides } from '@/utils/const';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { RootState } from '@/store';
import { formatLargeNumber } from '@/utils/formatNumber';
import { updateSourceAmount, updateTargetAmount } from '@/store/features/swapSlice';

interface SwapInputProps {
  type: typeof SwapSides[keyof typeof SwapSides];
}

const MAX_DECIMALS = 18

const getFontSize = (value: string) => {
    if (value.length > 15) return 'text-2xl'
    if (value.length > 10) return 'text-3xl'
    return 'text-4xl'
}

const SwapInput = ({ type }: SwapInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  
  const sourcePriceData = useAppSelector((state: RootState) => state.swap.sourcePriceData);
  const targetPriceData = useAppSelector((state: RootState) => state.swap.targetPriceData);
  const sourceAmount = useAppSelector((state: RootState) => state.swap.sourceAmount);
  const targetAmount = useAppSelector((state: RootState) => state.swap.targetAmount);
  
  const priceData = type === SwapSides.SOURCE ? sourcePriceData : targetPriceData;
  const amount = type === SwapSides.SOURCE ? sourceAmount : targetAmount;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    const isValidInput = /^\d*\.?\d*$/.test(value);
    if (!isValidInput) {
      return;
    }

    const decimalCount = (value.match(/\./g) || []).length;
    if (decimalCount > 1) {
      return;
    }

    if (value.length > MAX_DECIMALS) {
      return;
    }

    if (type === SwapSides.SOURCE) {
      dispatch(updateSourceAmount(value));
      if (sourcePriceData && targetPriceData) {
        const numericValue = Number(value);
        if (!isNaN(numericValue)) {
          const targetAmount = (numericValue * sourcePriceData.unitPrice) / targetPriceData.unitPrice;
          dispatch(updateTargetAmount(targetAmount.toString()));
        }
      }
    } else {
      dispatch(updateTargetAmount(value));
      if (sourcePriceData && targetPriceData) {
        const numericValue = Number(value);
        if (!isNaN(numericValue)) {
          const sourceAmount = (numericValue * targetPriceData.unitPrice) / sourcePriceData.unitPrice;
          dispatch(updateSourceAmount(sourceAmount.toString()));
        }
      }
    }
  }

  const renderValue = () => {
    if (!priceData) {
      return '-'
    }
    return `$${formatLargeNumber(priceData.unitPrice * Number(amount))}`
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <label className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {type === SwapSides.SOURCE ? 'SELL' : 'BUY'}
      </label>
      <div 
        className="flex items-center gap-2 shadow-[var(--shadow-default)] active:shadow-[var(--shadow-set)] p-4 rounded-xl cursor-text h-16 w-full min-w-[200px]" 
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          type="text"
          value={amount}
          onChange={handleInputChange}
          placeholder="0.00"
          className={`${getFontSize(amount)} focus:outline-none bg-transparent w-full h-full flex items-center min-w-0`}
        />
      </div>
      <label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {renderValue()}
      </label>
    </div>
  );
};

export default SwapInput;