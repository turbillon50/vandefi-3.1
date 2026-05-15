'use client';

import React, { useState, useMemo } from 'react';
import {
  History,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  CheckCircle,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
} from 'lucide-react';
import { mockTransactions, formatUSD, formatTime, formatAddress } from '@/lib/mockData';
import { TransactionRow } from '@/components/TransactionRow';
import GlowButton from '@/components/GlowButton';

type FilterType = 'all' | 'send' | 'receive' | 'swap';
type StatusFilter = 'all' | 'confirmed' | 'pending' | 'failed';

const PAGE_SIZE = 5;

const typeFilters: { label: string; value: FilterType; icon: React.ReactNode; color: string }[] = [
  { label: 'All', value: 'all', icon: <History className="w-3.5 h-3.5" />, color: 'text-[#94A3B8]' },
  { label: 'Sent', value: 'send', icon: <ArrowUpRight className="w-3.5 h-3.5" />, color: 'text-[#EF4444]' },
  { label: 'Received', value: 'receive', icon: <ArrowDownLeft className="w-3.5 h-3.5" />, color: 'text-[#10B981]' },
  { label: 'Swaps', value: 'swap', icon: <RefreshCw className="w-3.5 h-3.5" />, color: 'text-[#3B82F6]' },
];

const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: 'All Status', value: 'all' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Failed', value: 'failed' },
];

export default function HistoryPage() {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return mockTransactions.filter((tx) => {
      if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
      if (statusFilter !== 'all' && tx.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          tx.tokenSymbol.toLowerCase().includes(q) ||
          tx.hash.toLowerCase().includes(q) ||
          tx.from.toLowerCase().includes(q) ||
          tx.to.toLowerCase().includes(q) ||
          (tx.toTokenSymbol && tx.toTokenSymbol.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [typeFilter, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (f: FilterType) => {
    setTypeFilter(f);
    setPage(1);
  };

  const handleStatusFilter = (f: StatusFilter) => {
    setStatusFilter(f);
    setPage(1);
  };

  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
  };

  // Summary stats
  const stats = useMemo(() => {
    const sends = mockTransactions.filter((t) => t.type === 'send');
    const receives = mockTransactions.filter((t) => t.type === 'receive');
    const swaps = mockTransactions.filter((t) => t.type === 'swap');
    const totalGas = mockTransactions.reduce((s, t) => s + (t.gasCostUsd || 0), 0);
    return { sends: sends.length, receives: receives.length, swaps: swaps.length, totalGas };
  }, []);

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F8FAFC] flex items-center gap-2">
            <History className="w-6 h-6 text-purple-400" />
            Transaction History
          </h1>
          <p className="text-[#94A3B8] mt-1">All your on-chain activity</p>
        </div>
        <GlowButton variant="secondary" size="sm">
          <Download className="w-4 h-4" />
          Export CSV
        </GlowButton>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Txns', value: mockTransactions.length, icon: <History className="w-4 h-4" />, color: 'text-purple-400' },
          { label: 'Sent', value: stats.sends, icon: <ArrowUpRight className="w-4 h-4" />, color: 'text-red-400' },
          { label: 'Received', value: stats.receives, icon: <ArrowDownLeft className="w-4 h-4" />, color: 'text-green-400' },
          { label: 'Gas Spent', value: formatUSD(stats.totalGas), icon: <CheckCircle className="w-4 h-4" />, color: 'text-[#94A3B8]' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#94A3B8] font-medium">{label}</span>
              <span className={color}>{icon}</span>
            </div>
            <p className="text-xl font-bold text-[#F8FAFC] number-display">{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1E2030]/60 border border-[#1E2030] focus-within:border-purple-500/40 transition-all">
            <Search className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by token, address, or hash..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-[#F8FAFC] placeholder-[#94A3B8] outline-none"
            />
            {search && (
              <button onClick={() => handleSearch('')} className="text-[#94A3B8] hover:text-[#F8FAFC]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#94A3B8]" />
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value as StatusFilter)}
              className="bg-[#1E2030] border border-[#1E2030] rounded-xl px-3 py-2 text-sm text-[#F8FAFC] outline-none focus:border-purple-500/40 cursor-pointer"
            >
              {statusFilters.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Type filters */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {typeFilters.map(({ label, value, icon, color }) => (
            <button
              key={value}
              onClick={() => handleFilter(value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                typeFilter === value
                  ? 'bg-purple-600/20 border border-purple-500/30 text-purple-400'
                  : `bg-[#1E2030]/60 border border-[#1E2030] ${color} hover:border-purple-500/20`
              }`}
            >
              {icon}
              {label}
              {value !== 'all' && (
                <span className="ml-1 text-xs opacity-60">
                  ({mockTransactions.filter((t) => t.type === value).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions table */}
      <div className="glass-card overflow-hidden">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <History className="w-12 h-12 text-[#1E2030] mb-4" />
            <p className="text-[#F8FAFC] font-semibold">No transactions found</p>
            <p className="text-sm text-[#94A3B8] mt-1">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full defi-table">
                <thead>
                  <tr className="border-b border-[#1E2030]">
                    <th className="py-3 px-4 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="py-3 px-4 text-right text-xs font-semibold text-[#94A3B8] uppercase tracking-wider hidden sm:table-cell">
                      Amount
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-semibold text-[#94A3B8] uppercase tracking-wider hidden md:table-cell">
                      Status
                    </th>
                    <th className="py-3 px-4 text-right text-xs font-semibold text-[#94A3B8] uppercase tracking-wider hidden lg:table-cell">
                      Time
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                      Explorer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((tx) => (
                    <TransactionRow key={tx.id} transaction={tx} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t border-[#1E2030]">
              <p className="text-sm text-[#94A3B8]">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} transactions
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-xl bg-[#1E2030] border border-[#1E2030] hover:border-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4 text-[#94A3B8]" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-xl text-sm font-medium transition-all ${
                      page === p
                        ? 'bg-purple-600 text-white'
                        : 'bg-[#1E2030] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E2030]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-xl bg-[#1E2030] border border-[#1E2030] hover:border-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile: compact list view */}
      <div className="md:hidden mt-4 space-y-2">
        {paginated.length === 0 ? null : paginated.map((tx) => (
          <div key={tx.id} className="glass-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl flex-shrink-0 ${
                  tx.type === 'send' ? 'bg-red-500/10 text-red-400' :
                  tx.type === 'receive' ? 'bg-green-500/10 text-green-400' :
                  'bg-blue-500/10 text-blue-400'
                }`}>
                  {tx.type === 'send' ? <ArrowUpRight className="w-4 h-4" /> :
                   tx.type === 'receive' ? <ArrowDownLeft className="w-4 h-4" /> :
                   <RefreshCw className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F8FAFC]">
                    {tx.type === 'swap' ? `${tx.tokenSymbol} → ${tx.toTokenSymbol}` : `${tx.type === 'send' ? 'Sent' : 'Received'} ${tx.tokenSymbol}`}
                  </p>
                  <p className="text-xs text-[#94A3B8] font-mono mt-0.5">{formatAddress(tx.hash, 6)}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-sm font-semibold ${
                  tx.type === 'receive' ? 'text-[#10B981]' : tx.type === 'send' ? 'text-[#EF4444]' : 'text-[#3B82F6]'
                }`}>
                  {tx.type === 'receive' ? '+' : tx.type === 'send' ? '-' : ''}{tx.amount} {tx.tokenSymbol}
                </p>
                <p className="text-xs text-[#94A3B8]">{formatUSD(tx.usdValue)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1E2030]">
              <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${
                tx.status === 'confirmed' ? 'badge-success' :
                tx.status === 'pending' ? 'badge-pending' : 'badge-error'
              }`}>
                {tx.status === 'confirmed' ? <CheckCircle className="w-3 h-3" /> :
                 tx.status === 'pending' ? <History className="w-3 h-3" /> :
                 <History className="w-3 h-3" />}
                {tx.status}
              </div>
              <span className="text-xs text-[#94A3B8]">{formatTime(tx.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

