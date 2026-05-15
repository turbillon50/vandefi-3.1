'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Search,
  ChevronDown,
  X,
  ArrowUpRight,
  Info,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { mockTokens, gasOptions, formatUSD } from '@/lib/mockData';
import { Token } from '@/lib/mockData';
import GlowButton from '@/components/GlowButton';

type GasSpeed = 'Slow' | 'Medium' | 'Fast';

export default function SendPage() {
  const [selectedToken, setSelectedToken] = useState<Token>(mockTokens[0]);
  const [tokenSearchOpen, setTokenSearchOpen] = useState(false);
  const [tokenSearch, setTokenSearch] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedGas, setSelectedGas] = useState<GasSpeed>('Medium');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const filteredTokens = useMemo(
    () =>
      mockTokens.filter(
        (t) =>
          t.name.toLowerCase().includes(tokenSearch.toLowerCase()) ||
          t.symbol.toLowerCase().includes(tokenSearch.toLowerCase())
      ),
    [tokenSearch]
  );

  const usdValue = amount ? parseFloat(amount) * selectedToken.price : 0;
  const gasOption = gasOptions.find((g) => g.label === selectedGas)!;
  const isValidAddress = recipient.startsWith('0x') && recipient.length === 42;
  const isValidAmount = amount !== '' && parseFloat(amount) > 0 && parseFloat(amount) <= selectedToken.balance;

  const canSend = isValidAddress && isValidAmount;

  const handleMaxAmount = () => {
    setAmount(selectedToken.balance.toString());
  };

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    setError('');
    // Simulate transaction
    await new Promise((r) => setTimeout(r, 2500));
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const ensDisplay = isValidAddress ? null : recipient.endsWith('.eth') ? recipient : null;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F8FAFC] flex items-center gap-2">
          <ArrowUpRight className="w-6 h-6 text-purple-400" />
          Send Tokens
        </h1>
        <p className="text-[#94A3B8] mt-1">Transfer tokens to any address</p>
      </div>

      {/* Success message */}
      {sent && (
        <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3 animate-slide-up">
          <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[#10B981]">Transaction Submitted!</p>
            <p className="text-xs text-[#94A3B8]">Your transaction has been broadcast to the network.</p>
          </div>
        </div>
      )}

      <div className="glass-card p-6 space-y-6">
        {/* Token Selector */}
        <div>
          <label className="block text-sm font-medium text-[#94A3B8] mb-2">Token</label>
          <div className="relative">
            <button
              onClick={() => setTokenSearchOpen(!tokenSearchOpen)}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#1E2030]/60 border border-[#1E2030] hover:border-purple-500/30 transition-all text-left"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#1E2030] flex-shrink-0">
                <Image
                  src={selectedToken.logo}
                  alt={selectedToken.symbol}
                  fill
                  className="object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: selectedToken.color }}>
                  {selectedToken.symbol.slice(0, 2)}
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#F8FAFC]">{selectedToken.symbol}</p>
                <p className="text-xs text-[#94A3B8]">
                  Balance: {selectedToken.balance.toFixed(4)} ({formatUSD(selectedToken.value)})
                </p>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform ${tokenSearchOpen ? 'rotate-180' : ''}`} />
            </button>

            {tokenSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-card border border-[#1E2030] rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                <div className="p-3 border-b border-[#1E2030]">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1E2030]/60 border border-[#1E2030]">
                    <Search className="w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      placeholder="Search tokens..."
                      value={tokenSearch}
                      onChange={(e) => setTokenSearch(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-[#F8FAFC] placeholder-[#94A3B8] outline-none"
                      autoFocus
                    />
                    {tokenSearch && (
                      <button onClick={() => setTokenSearch('')}>
                        <X className="w-3.5 h-3.5 text-[#94A3B8]" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-56 overflow-y-auto py-1">
                  {filteredTokens.map((token) => (
                    <button
                      key={token.id}
                      onClick={() => {
                        setSelectedToken(token);
                        setTokenSearchOpen(false);
                        setAmount('');
                        setTokenSearch('');
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1E2030] transition-colors ${
                        token.id === selectedToken.id ? 'bg-purple-600/10' : ''
                      }`}
                    >
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#1E2030] flex-shrink-0">
                        <Image src={token.logo} alt={token.symbol} fill className="object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: token.color }}>
                          {token.symbol.slice(0, 2)}
                        </div>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-[#F8FAFC] text-sm">{token.symbol}</p>
                        <p className="text-xs text-[#94A3B8]">{token.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#F8FAFC]">{token.balance.toFixed(4)}</p>
                        <p className="text-xs text-[#94A3B8]">{formatUSD(token.value)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recipient */}
        <div>
          <label className="block text-sm font-medium text-[#94A3B8] mb-2">Recipient Address</label>
          <div className="relative">
            <input
              type="text"
              placeholder="0x... or ENS name (e.g. vitalik.eth)"
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                setError('');
              }}
              className="defi-input w-full px-4 py-3 pr-10 text-sm"
            />
            {recipient && (
              <button
                onClick={() => setRecipient('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-[#94A3B8] hover:text-[#F8FAFC]" />
              </button>
            )}
          </div>
          {ensDisplay && (
            <p className="mt-1.5 text-xs text-purple-400 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              ENS name detected — will resolve on send
            </p>
          )}
          {recipient && !isValidAddress && !ensDisplay && (
            <p className="mt-1.5 text-xs text-[#EF4444] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Invalid address format
            </p>
          )}
          {isValidAddress && (
            <p className="mt-1.5 text-xs text-[#10B981] flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Valid Ethereum address
            </p>
          )}
        </div>

        {/* Amount */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-[#94A3B8]">Amount</label>
            <button
              onClick={handleMaxAmount}
              className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              MAX: {selectedToken.balance.toFixed(4)} {selectedToken.symbol}
            </button>
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="defi-input w-full px-4 py-3 pr-24 text-lg font-semibold number-display"
              min="0"
              max={selectedToken.balance}
              step="any"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className="text-sm font-semibold text-[#94A3B8]">{selectedToken.symbol}</span>
            </div>
          </div>
          {amount && (
            <p className="mt-1.5 text-xs text-[#94A3B8]">
              ≈ {formatUSD(usdValue)}
            </p>
          )}
          {amount && parseFloat(amount) > selectedToken.balance && (
            <p className="mt-1.5 text-xs text-[#EF4444] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Insufficient balance
            </p>
          )}
        </div>

        {/* Gas Fee */}
        <div>
          <label className="block text-sm font-medium text-[#94A3B8] mb-3">Network Fee</label>
          <div className="grid grid-cols-3 gap-3">
            {gasOptions.map((gas) => (
              <button
                key={gas.label}
                onClick={() => setSelectedGas(gas.label as GasSpeed)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedGas === gas.label
                    ? 'border-purple-500/50 bg-purple-600/10 text-purple-400'
                    : 'border-[#1E2030] bg-[#1E2030]/40 text-[#94A3B8] hover:border-purple-500/20'
                }`}
              >
                <p className="text-sm font-semibold">{gas.label}</p>
                <p className="text-xs mt-0.5">{gas.time}</p>
                <p className="text-xs mt-1 font-medium">{formatUSD(gas.costUsd)}</p>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#94A3B8]">
            <Info className="w-3 h-3" />
            Gas price: {gasOption.gwei} Gwei
          </div>
        </div>

        {/* Transaction Summary */}
        {canSend && (
          <div className="p-4 rounded-xl bg-[#1E2030]/50 border border-[#1E2030] space-y-3 animate-slide-up">
            <p className="text-sm font-semibold text-[#F8FAFC]">Transaction Summary</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Sending</span>
                <span className="text-[#F8FAFC] font-medium">{amount} {selectedToken.symbol}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">USD Value</span>
                <span className="text-[#F8FAFC]">{formatUSD(usdValue)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Network Fee</span>
                <span className="text-[#F8FAFC]">{formatUSD(gasOption.costUsd)}</span>
              </div>
              <div className="border-t border-[#1E2030] pt-2 flex justify-between text-sm font-semibold">
                <span className="text-[#94A3B8]">Total</span>
                <span className="text-[#F8FAFC]">{formatUSD(usdValue + gasOption.costUsd)}</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
            <p className="text-sm text-[#EF4444]">{error}</p>
          </div>
        )}

        {/* Send Button */}
        <GlowButton
          fullWidth
          size="lg"
          disabled={!canSend || sending}
          onClick={handleSend}
        >
          {sending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <ArrowUpRight className="w-4 h-4" />
              {canSend ? `Send ${amount} ${selectedToken.symbol}` : 'Enter details to send'}
            </>
          )}
        </GlowButton>

        {!canSend && (
          <p className="text-center text-xs text-[#94A3B8]">
            Connect your wallet and fill in all fields to send
          </p>
        )}
      </div>
    </div>
  );
}
