'use client';

import React from 'react';
import Image from 'next/image';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Token, formatUSD } from '@/lib/mockData';

interface TokenCardProps {
  token: Token;
  onClick?: () => void;
  compact?: boolean;
}

export function TokenCard({ token, onClick, compact = false }: TokenCardProps) {
  const isPositive = token.change24h >= 0;

  if (compact) {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#1E2030]/50 hover:bg-[#1E2030] border border-transparent hover:border-purple-500/20 transition-all text-left"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#1E2030] flex-shrink-0">
          <Image
            src={token.logo}
            alt={token.symbol}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center text-xs font-bold"
            style={{ color: token.color }}
          >
            {token.symbol.slice(0, 2)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-[#F8FAFC]">{token.symbol}</p>
          <p className="text-xs text-[#94A3B8] truncate">{token.name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-[#F8FAFC]">{formatUSD(token.value)}</p>
          <p className="text-xs text-[#94A3B8]">{token.balance.toFixed(4)}</p>
        </div>
      </button>
    );
  }

  return (
    <tr
      className="border-b border-[#1E2030]/50 hover:bg-purple-600/5 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#1E2030] flex-shrink-0">
            <Image
              src={token.logo}
              alt={token.symbol}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center text-xs font-bold"
              style={{ color: token.color }}
            >
              {token.symbol.slice(0, 2)}
            </div>
          </div>
          <div>
            <p className="font-semibold text-[#F8FAFC]">{token.name}</p>
            <p className="text-sm text-[#94A3B8]">{token.symbol}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-right">
        <p className="font-medium text-[#F8FAFC] number-display">
          {token.balance < 0.001
            ? token.balance.toFixed(8)
            : token.balance < 1
            ? token.balance.toFixed(6)
            : token.balance.toFixed(4)}
        </p>
        <p className="text-xs text-[#94A3B8]">{token.symbol}</p>
      </td>
      <td className="py-4 px-4 text-right hidden sm:table-cell">
        <p className="font-medium text-[#F8FAFC] number-display">{formatUSD(token.price)}</p>
      </td>
      <td className="py-4 px-4 text-right hidden md:table-cell">
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium ${
            isPositive
              ? 'bg-green-500/10 text-[#10B981]'
              : 'bg-red-500/10 text-[#EF4444]'
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {isPositive ? '+' : ''}
          {token.change24h.toFixed(2)}%
        </div>
      </td>
      <td className="py-4 px-4 text-right">
        <p className="font-semibold text-[#F8FAFC] number-display">{formatUSD(token.value)}</p>
      </td>
    </tr>
  );
}
