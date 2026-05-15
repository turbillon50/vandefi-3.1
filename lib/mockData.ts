export interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  balance: number;
  value: number;
  change24h: number;
  decimals: number;
  address: string;
  color: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'approve';
  token: string;
  tokenSymbol: string;
  amount: number;
  usdValue: number;
  from: string;
  to: string;
  hash: string;
  status: 'confirmed' | 'pending' | 'failed';
  timestamp: number;
  gasUsed?: number;
  gasCostUsd?: number;
  toToken?: string;
  toTokenSymbol?: string;
  toAmount?: number;
}

export interface PortfolioDataPoint {
  date: string;
  value: number;
  eth: number;
  btc: number;
  other: number;
}

export const mockTokens: Token[] = [
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
    price: 3842.15,
    balance: 2.4851,
    value: 9550.23,
    change24h: 3.42,
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000',
    color: '#627EEA',
  },
  {
    id: 'usd-coin',
    symbol: 'USDC',
    name: 'USD Coin',
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    price: 1.00,
    balance: 4250.00,
    value: 4250.00,
    change24h: 0.01,
    decimals: 6,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    color: '#2775CA',
  },
  {
    id: 'wrapped-bitcoin',
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png',
    price: 67243.80,
    balance: 0.08431,
    value: 5670.15,
    change24h: 2.18,
    decimals: 8,
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    color: '#F7931A',
  },
  {
    id: 'matic-network',
    symbol: 'MATIC',
    name: 'Polygon',
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png',
    price: 0.8734,
    balance: 1820.50,
    value: 1589.64,
    change24h: -1.23,
    decimals: 18,
    address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    color: '#8247E5',
  },
  {
    id: 'uniswap',
    symbol: 'UNI',
    name: 'Uniswap',
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
    price: 11.42,
    balance: 89.3,
    value: 1019.81,
    change24h: -2.87,
    decimals: 18,
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    color: '#FF007A',
  },
  {
    id: 'chainlink',
    symbol: 'LINK',
    name: 'Chainlink',
    logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png',
    price: 18.67,
    balance: 42.15,
    value: 786.94,
    change24h: 5.61,
    decimals: 18,
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    color: '#375BD2',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    type: 'receive',
    token: 'ethereum',
    tokenSymbol: 'ETH',
    amount: 0.5,
    usdValue: 1921.08,
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    hash: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4',
    status: 'confirmed',
    timestamp: Date.now() - 1000 * 60 * 15,
    gasUsed: 21000,
    gasCostUsd: 2.45,
  },
  {
    id: 'tx2',
    type: 'swap',
    token: 'usd-coin',
    tokenSymbol: 'USDC',
    amount: 500,
    usdValue: 500,
    from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    hash: '0x4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5',
    status: 'confirmed',
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    gasUsed: 145000,
    gasCostUsd: 8.23,
    toToken: 'ethereum',
    toTokenSymbol: 'ETH',
    toAmount: 0.13,
  },
  {
    id: 'tx3',
    type: 'send',
    token: 'usd-coin',
    tokenSymbol: 'USDC',
    amount: 250,
    usdValue: 250,
    from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    to: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
    hash: '0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6',
    status: 'confirmed',
    timestamp: Date.now() - 1000 * 60 * 60 * 5,
    gasUsed: 21000,
    gasCostUsd: 1.87,
  },
  {
    id: 'tx4',
    type: 'receive',
    token: 'chainlink',
    tokenSymbol: 'LINK',
    amount: 42.15,
    usdValue: 786.94,
    from: '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8',
    to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    hash: '0x6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7',
    status: 'confirmed',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    gasUsed: 21000,
    gasCostUsd: 2.15,
  },
  {
    id: 'tx5',
    type: 'swap',
    token: 'matic-network',
    tokenSymbol: 'MATIC',
    amount: 500,
    usdValue: 436.70,
    from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    hash: '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8',
    status: 'confirmed',
    timestamp: Date.now() - 1000 * 60 * 60 * 36,
    gasUsed: 178000,
    gasCostUsd: 10.45,
    toToken: 'uniswap',
    toTokenSymbol: 'UNI',
    toAmount: 38.2,
  },
  {
    id: 'tx6',
    type: 'send',
    token: 'ethereum',
    tokenSymbol: 'ETH',
    amount: 0.25,
    usdValue: 960.54,
    from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    to: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    hash: '0x8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',
    status: 'confirmed',
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    gasUsed: 21000,
    gasCostUsd: 3.21,
  },
  {
    id: 'tx7',
    type: 'receive',
    token: 'wrapped-bitcoin',
    tokenSymbol: 'WBTC',
    amount: 0.08431,
    usdValue: 5670.15,
    from: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    hash: '0x9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0',
    status: 'confirmed',
    timestamp: Date.now() - 1000 * 60 * 60 * 72,
    gasUsed: 21000,
    gasCostUsd: 4.56,
  },
  {
    id: 'tx8',
    type: 'send',
    token: 'matic-network',
    tokenSymbol: 'MATIC',
    amount: 200,
    usdValue: 174.68,
    from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    to: '0x8888f1f195AFa192CfeE860698584c030f4c9dB1',
    hash: '0xa0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1',
    status: 'pending',
    timestamp: Date.now() - 1000 * 60 * 5,
    gasUsed: 21000,
    gasCostUsd: 1.23,
  },
  {
    id: 'tx9',
    type: 'swap',
    token: 'ethereum',
    tokenSymbol: 'ETH',
    amount: 0.1,
    usdValue: 384.22,
    from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    to: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    hash: '0xb1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',
    status: 'failed',
    timestamp: Date.now() - 1000 * 60 * 60 * 96,
    gasUsed: 95000,
    gasCostUsd: 6.78,
    toToken: 'usd-coin',
    toTokenSymbol: 'USDC',
    toAmount: 0,
  },
  {
    id: 'tx10',
    type: 'receive',
    token: 'uniswap',
    tokenSymbol: 'UNI',
    amount: 50.1,
    usdValue: 572.14,
    from: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    hash: '0xc2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3',
    status: 'confirmed',
    timestamp: Date.now() - 1000 * 60 * 60 * 120,
    gasUsed: 21000,
    gasCostUsd: 2.89,
  },
];

// Generate 30 days of portfolio history
function generatePortfolioHistory(): PortfolioDataPoint[] {
  const points: PortfolioDataPoint[] = [];
  const baseValue = 20000;
  const now = Date.now();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const trend = (29 - i) * 100;
    const noise = (Math.random() - 0.5) * 1500;
    const value = baseValue + trend + noise;

    const ethPct = 0.45 + (Math.random() - 0.5) * 0.05;
    const btcPct = 0.25 + (Math.random() - 0.5) * 0.03;
    const otherPct = 1 - ethPct - btcPct;

    points.push({
      date: dateStr,
      value: Math.max(value, 15000),
      eth: value * ethPct,
      btc: value * btcPct,
      other: value * otherPct,
    });
  }

  return points;
}

export const portfolioHistory = generatePortfolioHistory();

export const totalPortfolioValue = mockTokens.reduce((sum, token) => sum + token.value, 0);

export const portfolioChange24h = 2.47;

export const walletAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

export const donutChartData = mockTokens.map((token) => ({
  name: token.symbol,
  value: token.value,
  color: token.color,
}));

export const formatAddress = (address: string, chars = 4): string => {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
};

export const formatNumber = (num: number, decimals = 2): string => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(decimals)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(decimals)}K`;
  }
  return num.toFixed(decimals);
};

export const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatTime = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export const networks = [
  { id: 1, name: 'Ethereum', symbol: 'ETH', color: '#627EEA' },
  { id: 137, name: 'Polygon', symbol: 'MATIC', color: '#8247E5' },
  { id: 42161, name: 'Arbitrum', symbol: 'ETH', color: '#28A0F0' },
  { id: 10, name: 'Optimism', symbol: 'ETH', color: '#FF0420' },
];

export const gasOptions = [
  { label: 'Slow', gwei: 15, time: '~5 min', costUsd: 1.23 },
  { label: 'Medium', gwei: 22, time: '~2 min', costUsd: 1.82 },
  { label: 'Fast', gwei: 35, time: '~30 sec', costUsd: 2.89 },
];
