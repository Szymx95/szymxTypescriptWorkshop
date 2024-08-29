const networks = {
	base: "base",
	mainnet: "mainnet",
	arbitrum: "arbitrum",
	optimism: "optimism",
} as const;

type Network = (typeof networks)[keyof typeof networks];

type TokenConfig = {
	name: string;
	decimals: number;
	addresses: Partial<Record<Network, string>>;
};

const assetsConfig = {
	DAI: {
		name: "Dai Stablecoin",
		decimals: 18,
		addresses: {
			[networks.mainnet]: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
		},
	},
	USDC: {
		name: "USD Coin",
		decimals: 6,
		addresses: {
			[networks.base]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
			[networks.mainnet]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
			[networks.arbitrum]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
			[networks.optimism]: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
		},
	},
	USDbC: {
		name: "USD Base Coin",
		decimals: 6,
		addresses: {
			[networks.base]: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
		},
	},
	"USDC.e": {
		name: "Bridged USD Coin",
		decimals: 6,
		addresses: {
			[networks.arbitrum]: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
		},
	},
	USDT: {
		name: "Tether USD",
		decimals: 6,
		addresses: {
			[networks.mainnet]: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
			[networks.arbitrum]: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
			[networks.optimism]: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
		},
	},
	WETH: {
		name: "Wrapped Ether",
		decimals: 18,
		addresses: {
			[networks.mainnet]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
			[networks.base]: "0x4200000000000000000000000000000000000006",
			[networks.arbitrum]: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
			[networks.optimism]: "0x4200000000000000000000000000000000000006",
		},
	},
} as const satisfies Record<string, TokenConfig>;

export type AssetsConfig = typeof assetsConfig;

/*
type TokensInNetwork = {
    base: "USDC" | "USDbC" | "WETH";
    mainnet: "DAI" | "USDC" | "USDT" | "WETH";
    arbitrum: "USDC" | "USDC.e" | "USDT" | "WETH";
    optimism: "USDC" | "USDT" | "WETH";
}

*/

type TokensInNetwork = 
