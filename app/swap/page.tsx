'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
  ArrowUpDown,
  ChevronDown,
  Settings,
  Info,
  AlertTriangle,
  Loader2,
  CheckCircle,
  RefreshCw,
  Search,
  X,
} from 'lucide-react';
import { mockTokens, formatUSD } from '@/lib/mockData';
import { Token } from '@/lib/mockData';
import GlowButton from '@/components/GlowButton';

const SLIPPAGE_OPTIONS = [0.1, 0.5, 1.0];

function TokenSelector({
  selectedToken,
  onSelect,
  excludeId,
  label,
  amount,
  onAmountChange,
  readOnly = false,
  usdValue,
  balance,
}: {
  selectedToken: Token;
  onSelect: (token: Token) => void;
  excludeId?: string;
  label: string;
  amount: string;
  onAmountChange?: (v: string) => void;
  readOnly?: boolean;
  usdValue: number;
  balance?: number;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      mockTokens.filter(
        (t) =>
          t.id !== excludeId &&
          (t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.symbol.toLowerCase().includes(search.toLowerCase()))
      ),
    [search, excludeId]
  );

  return (
    <div className="p-4 rounded-xl bg-[#1E2030]/60 border border-[#1E2030] space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#94A3B8]">{label}</span>
        {balance !== undefined && (
          <span className="text-xs text-[#94A3B8]">
            Balance: {balance.toFixed(4)} {selectedToken.symbol}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Token button */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#111318] border border-[#1E2030] hover:border-purple-500/30 transition-all flex-shrink-0"
          >
            <div className="relative w-6 h-6 rounded-full overflow-hidden bg-[#1E2030]">
              <Image src={selectedToken.logo} alt={selectedToken.symbol} fill className="object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold" style={{ color: selectedToken.color }}>
                {selectedToken.symbol.slice(0, 2)}
              </div>
            </div>
            <span className="font-semibold text-sm text-[#F8FAFC]">{selectedToken.symbol}</span>
            <ChevronDown className={`w-3 h-3 text-[#94A3B8] transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <div className="absolute top-full left-0 mt-2 w-56 glass-card border border-[#1E2030] rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
              <div className="p-2 border-b border-[#1E2030]">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#1E2030]/60">
                  <Search className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent text-xs text-[#F8FAFC] placeholder-[#94A3B8] outline-none"
                    autoFocus
                  />
                  {search && <button onClick={() => setSearch('')}><X className="w-3 h-3 text-[#94A3B8]" /></button>}
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto py-1">
                {filtered.map((token) => (
                  <button
                    key={token.id}
                    onClick={() => { onSelect(token); setOpen(false); setSearch(''); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-[#1E2030] transition-colors ${
                      token.id === selectedToken.id ? 'bg-purple-600/10' : ''
                    }`}
                  >
                    <div className="relative w-6 h-6 rounded-full overflow-hidden bg-[#1E2030] flex-shrink-0">
                      <Image src={token.logo} alt={token.symbol} fill className="object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold" style={{ color: token.color }}>
                        {token.symbol.slice(0, 2)}
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-semibold text-[#F8FAFC]">{token.symbol}</p>
                      <p className="text-[10px] text-[#94A3B8]">{token.name}</p>
                    </div>
                    <p className="text-xs text-[#94A3B8]">{token.balance.toFixed(3)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Amount input */}
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={onAmountChange ? (e) => onAmountChange(e.target.value) : undefined}
          readOnly={readOnly}
          className={`flex-1 bg-transparent text-2xl font-bold text-[#F8FAFC] outline-none number-display text-right ${
            readOnly ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          min="0"
          step="any"
        />
      </div>

      {usdValue > 0 && (
        <p className="text-xs text-[#94A3B8] text-right">{formatUSD(usdValue)}</p>
      )}
    </div>
  );
}

export default function SwapPage() {
  const [fromToken, setFromToken] = useState<Token>(mockTokens[0]); // ETH
  const [toToken, setToToken] = useState<Token>(mockTokens[1]);   // USDC
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Simulated exchange rate
  const exchangeRate = useMemo(() => {
    if (!fromToken || !toToken) return 0;
    return fromToken.price / toToken.price;
  }, [fromToken, toToken]);

  const toAmount = useMemo(() => {
    if (!fromAmount || isNaN(parseFloat(fromAmount))) return '';
    return (parseFloat(fromAmount) * exchangeRate * (1 - 0.003)).toFixed(toToken.decimals > 6 ? 6 : 2);
  }, [fromAmount, exchangeRate, toToken]);

  const fromUSD = fromAmount ? parseFloat(fromAmount) * fromToken.price : 0;
  const toUSD = toAmount ? parseFloat(toAmount) * toToken.price : 0;

  const priceImpact = fromUSD > 10000 ? 2.4 : fromUSD > 1000 ? 0.8 : 0.12;
  const canSwap = fromAmount !== '' && parseFloat(fromAmount) > 0 && parseFloat(fromAmount) <= fromToken.balance;

  const handleFlip = useCallback(() => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
  }, [fromToken, toToken, toAmount]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 800));
    setRefreshing(false);
  };

  const handleSwap = async () => {
    if (!canSwap) return;
    setSwapping(true);
    await new Promise((r) => setTimeout(r, 2500));
    setSwapping(false);
    setSwapped(true);
    setFromAmount('');
    setTimeout(() => setSwapped(false), 5000);
  };

  const minimumReceived = toAmount
    ? (parseFloat(toAmount) * (1 - slippage / 100)).toFixed(4)
    : '0';

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F8FAFC] flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-blue-400" />
          Swap Tokens
        </h1>
        <p className="text-[#94A3B8] mt-1">Instantly exchange tokens at the best rates</p>
      </div>

      {swapped && (
        <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3 animate-slide-up">
          <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[#10B981]">Swap Submitted!</p>
            <p className="text-xs text-[#94A3B8]">Your swap is being processed.</p>
          </div>
        </div>
      )}

      <div className="glass-card p-5 space-y-3">
        {/* Header with settings */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#F8FAFC]">Exchange</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-lg hover:bg-[#1E2030] transition-colors"
            >
              <RefreshCw className={`w-4 h-4 text-[#94A3B8] ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`p-1.5 rounded-lg transition-colors ${
                settingsOpen ? 'bg-purple-600/20 text-purple-400' : 'hover:bg-[#1E2030] text-[#94A3B8]'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slippage settings */}
        {settingsOpen && (
          <div className="p-4 rounded-xl bg-[#1E2030]/60 border border-[#1E2030] animate-slide-up">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-4 h-4 text-[#94A3B8]" />
              <p className="text-sm font-medium text-[#F8FAFC]">Slippage Tolerance</p>
            </div>
            <div className="flex gap-2">
              {SLIPPAGE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSlippage(opt)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    slippage === opt
                      ? 'bg-purple-600 text-white'
                      : 'bg-[#111318] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E2030]'
                  }`}
                >
                  {opt}%
                </button>
              ))}
              <input
                type="number"
                placeholder="Custom"
                value={SLIPPAGE_OPTIONS.includes(slippage) ? '' : slippage}
                onChange={(e) => setSlippage(parseFloat(e.target.value) || 0.5)}
                className="w-20 defi-input px-2 py-2 text-sm text-center"
                step="0.1"
                min="0.01"
                max="50"
              />
            </div>
            <p className="text-xs text-[#94A3B8] mt-2 flex items-center gap-1">
              <Info className="w-3 h-3" />
              Your transaction will revert if the price changes unfavorably by more than this percentage.
            </p>
          </div>
        )}

        {/* From token */}
        <TokenSelector
          selectedToken={fromToken}
          onSelect={setFromToken}
          excludeId={toToken.id}
          label="From"
          amount={fromAmount}
          onAmountChange={setFromAmount}
          usdValue={fromUSD}
          balance={fromToken.balance}
        />

        {/* Flip button */}
        <div className="flex justify-center">
          <button
            onClick={handleFlip}
            className="w-10 h-10 rounded-xl bg-[#1E2030] border border-[#1E2030] hover:border-purple-500/30 hover:bg-purple-600/10 flex items-center justify-center transition-all hover:rotate-180 duration-300"
          >
            <ArrowUpDown className="w-4 h-4 text-[#94A3B8]" />
          </button>
        </div>

        {/* To token */}
        <TokenSelector
          selectedToken={toToken}
          onSelect={setToToken}
          excludeId={fromToken.id}
          label="To (estimated)"
          amount={toAmount}
          readOnly
          usdValue={toUSD}
        />

        {/* Rate display */}
        {fromAmount && toAmount && (
          <div className="flex items-center justify-between px-1 text-xs text-[#94A3B8] animate-fade-in">
            <span>
              1 {fromToken.symbol} = {exchangeRate.toFixed(fromToken.price > 1000 ? 4 : 2)} {toToken.symbol}
            </span>
            <button onClick={handleRefresh} className="flex items-center gap-1 hover:text-purple-400 transition-colors">
              <RefreshCw className="w-3 h-3" />
              Refresh
            </button>
          </div>
        )}

        {/* Price impact warning */}
        {fromAmount && parseFloat(fromAmount) > 0 && (
          <div
            className={`flex items-center justify-between p-3 rounded-xl text-sm ${
              priceImpact > 2
                ? 'bg-red-500/10 border border-red-500/20'
                : priceImpact > 1
                ? 'bg-yellow-500/10 border border-yellow-500/20'
                : 'bg-[#1E2030]/60 border border-[#1E2030]'
            } animate-fade-in`}
          >
            <div className="flex items-center gap-2">
              {priceImpact > 1 ? (
                <AlertTriangle className={`w-4 h-4 ${priceImpact > 2 ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`} />
              ) : (
                <Info className="w-4 h-4 text-[#94A3B8]" />
              )}
              <span className="text-[#94A3B8]">Price Impact</span>
            </div>
            <span
              className={`font-semibold ${
                priceImpact > 2 ? 'text-[#EF4444]' : priceImpact > 1 ? 'text-[#F59E0B]' : 'text-[#10B981]'
              }`}
            >
              -{priceImpact.toFixed(2)}%
            </span>
          </div>
        )}

        {/* Route & details */}
        {fromAmount && toAmount && (
          <div className="p-4 rounded-xl bg-[#1E2030]/40 border border-[#1E2030] space-y-2.5 animate-slide-up">
            <div className="flex justify-between text-xs">
              <span className="text-[#94A3B8]">Route</span>
              <span className="text-[#F8FAFC] font-medium">
                {fromToken.symbol} → {toToken.symbol}
                <span className="text-purple-400 ml-1">(Uniswap V3)</span>
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#94A3B8]">Slippage</span>
              <span className="text-[#F8FAFC]">{slippage}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#94A3B8]">Minimum Received</span>
              <span className="text-[#F8FAFC]">{minimumReceived} {toToken.symbol}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#94A3B8]">Network Fee</span>
              <span className="text-[#F8FAFC]">~$8.23</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#94A3B8]">Protocol Fee</span>
              <span className="text-[#F8FAFC]">0.30%</span>
            </div>
          </div>
        )}

        {/* Swap button */}
        <GlowButton
          fullWidth
          size="lg"
          disabled={!canSwap || swapping}
          onClick={handleSwap}
        >
          {swapping ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Swapping...
            </>
          ) : !fromAmount || parseFloat(fromAmount) === 0 ? (
            'Enter an amount'
          ) : parseFloat(fromAmount) > fromToken.balance ? (
            'Insufficient balance'
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Swap {fromToken.symbol} for {toToken.symbol}
            </>
          )}
        </GlowButton>

        <p className="text-center text-xs text-[#94A3B8]">
          Powered by Uniswap V3 • Best rate across DEXs
        </p>
      </div>
    </div>
  );
}
