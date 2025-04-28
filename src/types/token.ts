export const USDC = 'USDC';
export const USDT = 'USDT';
export const ETH = 'ETH';
export const WBTC = 'WBTC';

export const TOKENS_SYMBOL = {
  USDC,
  USDT,
  ETH,
  WBTC
} as const;

export type Token = typeof TOKENS_SYMBOL[keyof typeof TOKENS_SYMBOL];

export const CHAIN_IDS = {
  ETHEREUM: 1,
  POLYGON: 137,
  BASE: 8453
} as const;

export type ChainId = typeof CHAIN_IDS[keyof typeof CHAIN_IDS];

export const TOKEN_CHAIN_MAP: Record<Token, ChainId> = {
  [USDC]: CHAIN_IDS.ETHEREUM,
  [USDT]: CHAIN_IDS.POLYGON,
  [ETH]: CHAIN_IDS.BASE,
  [WBTC]: CHAIN_IDS.ETHEREUM
};

export type TokenAmount = {
  token: Token;
  amount: string;
};

export type ChainToken = {
  token: Token;
  chainId: ChainId;
};

export function isToken(value: string): value is Token {
  return Object.values(TOKENS_SYMBOL).includes(value as Token);
}


export function isChainId(value: number): value is ChainId {
  return Object.values(CHAIN_IDS).includes(value as ChainId);
}