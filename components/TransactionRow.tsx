'use client';

import React from 'react';
import {
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import { Transaction, formatUSD, formatTime, formatAddress } from '@/lib/mockData';

interface TransactionRowProps {
  transaction: Transaction;
  compact?: boolean;
}

const typeConfig = {
  send: {
    icon: ArrowUpRight,
    label: 'Sent',
    color: 'text-[#EF4444]',
    bg: 'bg-red-500/10',
    sign: '-',
  },
  receive: {
    icon: ArrowDownLeft,
    label: 'Received',
    color: 'text-[#10B981]',
    bg: 'bg-green-500/10',
    sign: '+',
  },
  swap: {
    icon: RefreshCw,
    label: 'Swap',
    color: 'text-[#3B82F6]',
    bg: 'bg-blue-500/10',
    sign: '',
  },
  approve: {
    icon: CheckCircle,
    label: 'Approved',
    color: 'text-[#F59E0B]',
    bg: 'bg-yellow-500/10',
    sign: '',
  },
};

const statusConfig = {
  confirmed: {
    icon: CheckCircle,
    label: 'Confirmed',
    className: 'badge-success',
  },
  pending: {
    icon: Clock,
    label: 'Pending',
    className: 'badge-pending',
  },
  failed: {
    icon: XCircle,
    label: 'Failed',
    className: 'badge-error',
  },
};

export function TransactionRow({ transaction, compact = false }: TransactionRowProps) {
  const type = typeConfig[transaction.type];
  const status = statusConfig[transaction.status];
  const TypeIcon = type.icon;
  const StatusIcon = status.icon;

  const description =
    transaction.type === 'swap'
      ? `${transaction.tokenSymbol} → ${transaction.toTokenSymbol}`
      : `${type.label} ${transaction.tokenSymbol}`;

  const amountDisplay =
    transaction.type === 'swap'
      ? `${transaction.amount} ${transaction.tokenSymbol}`
      : `${type.sign}${transaction.amount} ${transaction.tokenSymbol}`;

  const explorerUrl = `https://etherscan.io/tx/${transaction.hash}`;

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1E2030]/50 transition-colors">
        <div className={`p-2 rounded-xl ${type.bg} ${type.color} flex-shrink-0`}>
          <TypeIcon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#F8FAFC] truncate">{description}</p>
          <p className="text-xs text-[#94A3B8]">{formatTime(transaction.timestamp)}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className={`text-sm font-semibold ${type.color} number-display`}>
            {amountDisplay}
          </p>
          <p className="text-xs text-[#94A3B8]">{formatUSD(transaction.usdValue)}</p>
        </div>
      </div>
    );
  }

  return (
    <tr className="border-b border-[#1E2030]/50 hover:bg-purple-600/5 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${type.bg} ${type.color} flex-shrink-0`}>
            <TypeIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium text-[#F8FAFC]">{description}</p>
            <p className="text-xs text-[#94A3B8] mt-0.5 font-mono">
              {formatAddress(transaction.from)} → {formatAddress(transaction.to)}
            </p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-right hidden sm:table-cell">
        <p className={`font-semibold number-display ${type.color}`}>{amountDisplay}</p>
        <p className="text-xs text-[#94A3B8]">{formatUSD(transaction.usdValue)}</p>
      </td>
      <td className="py-4 px-4 text-center hidden md:table-cell">
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${status.className}`}>
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </div>
      </td>
      <td className="py-4 px-4 text-right hidden lg:table-cell">
        <p className="text-sm text-[#94A3B8]">{formatTime(transaction.timestamp)}</p>
        {transaction.gasCostUsd && (
          <p className="text-xs text-[#94A3B8]/60">Gas: {formatUSD(transaction.gasCostUsd)}</p>
        )}
      </td>
      <td className="py-4 px-4 text-center">
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#94A3B8] hover:text-purple-400 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">View</span>
        </a>
      </td>
    </tr>
  );
}
