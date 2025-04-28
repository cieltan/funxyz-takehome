
import { Token } from '@/types/token';
import BasicNeuButton from './BasicNeuButton';

interface TokenSelectButtonProps {
  selectedToken: any | null;
  onClick: () => void;
}

const TokenSelectButton = ({ selectedToken, onClick }: TokenSelectButtonProps) => {

  const renderContent = () => {
    if (selectedToken) {
      return <span className="text-sm font-extrabold">{selectedToken.symbol}</span>
    }
    return <span className="text-sm font-extrabold">SELECT TOKEN</span>
  }
  return (
    <>
      <BasicNeuButton
        onClick={onClick}
        className='h-min'
      >
        {renderContent()}
      </BasicNeuButton>
    </>
  );
};

export default TokenSelectButton; 