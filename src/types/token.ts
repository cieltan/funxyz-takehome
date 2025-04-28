export const TOKENS = {
  USDC: 'USDC',
  USDT: 'USDT',
  ETH: 'ETH',
  WBTC: 'WBTC'
} as const;

export type Token = typeof TOKENS[keyof typeof TOKENS];

export const CHAIN_IDS = {
  ETHEREUM: 1,
  POLYGON: 137,
  BASE: 8453
} as const;

export type ChainId = typeof CHAIN_IDS[keyof typeof CHAIN_IDS];

export const TOKEN_CHAIN_MAP: Record<Token, ChainId> = {
  [TOKENS.USDC]: CHAIN_IDS.ETHEREUM,
  [TOKENS.USDT]: CHAIN_IDS.POLYGON,
  [TOKENS.ETH]: CHAIN_IDS.BASE,
  [TOKENS.WBTC]: CHAIN_IDS.ETHEREUM
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
  return Object.values(TOKENS).includes(value as Token);
}


export function isChainId(value: number): value is ChainId {
  return Object.values(CHAIN_IDS).includes(value as ChainId);
}