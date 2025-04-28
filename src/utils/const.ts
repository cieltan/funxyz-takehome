export const SOURCE = "SOURCE"
export const TARGET = "TARGET"

export const SwapSides = {
    SOURCE,
    TARGET,
  } as const;  
export type SwapSide = keyof typeof SwapSides;


export const DEFAULT = "DEFAULT"
export const SELECT_TOKEN = "SELECT_TOKEN"
export const SETTINGS = "SETTINGS"

export const SwapContainerView = {
    DEFAULT,
    SELECT_TOKEN,
    SETTINGS,
} as const;

export type SwapContainerView = keyof typeof SwapContainerView;