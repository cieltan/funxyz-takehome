import { useState, ChangeEvent, useRef } from 'react';
import { SwapSides } from '@/utils/const';

interface SwapInputProps {
  type: typeof SwapSides[keyof typeof SwapSides];
}

const SwapInput = ({ type }: SwapInputProps) => {
  const [amount, setAmount] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-4">
      <label className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {type === SwapSides.SOURCE ? 'SELL' : 'BUY'}
      </label>
      <div 
        className="flex items-center gap-2 shadow-[var(--shadow-default)] active:shadow-[var(--shadow-set)] p-4 rounded-xl cursor-text" 
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          type="text"
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
          placeholder="0.00"
          className="text-4xl focus:outline-none bg-transparent w-full"
        />
      </div>
      <label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {"Value: $0.00"}
      </label>
    </div>
  );
};

export default SwapInput;