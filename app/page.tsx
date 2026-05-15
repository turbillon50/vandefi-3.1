'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  CreditCard,
  TrendingUp,
  Wallet,
  Activity,
  DollarSign,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  mockTokens,
  mockTransactions,
  portfolioHistory,
  donutChartData,
  totalPortfolioValue,
  portfolioChange24h,
  formatUSD,
} from '@/lib/mockData';
import { TokenCard } from '@/components/TokenCard';
import { TransactionRow } from '@/components/TransactionRow';
import { StatCard } from '@/components/StatCard';
import GlowButton from '@/components/GlowButton';

const quickActions = [
  { label: 'Send', icon: ArrowUpRight, href: '/send', color: 'from-red-600/20 to-red-500/10 border-red-500/20 text-red-400' },
  { label: 'Receive', icon: ArrowDownLeft, href: '/receive', color: 'from-green-600/20 to-green-500/10 border-green-500/20 text-green-400' },
  { label: 'Swap', icon: RefreshCw, href: '/swap', color: 'from-blue-600/20 to-blue-500/10 border-blue-500/20 text-blue-400' },
  { label: 'Buy', icon: CreditCard, href: '#', color: 'from-purple-600/20 to-purple-500/10 border-purple-500/20 text-purple-400' },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 border border-[#1E2030]">
        <p className="text-sm text-[#94A3B8]">{payload[0].name}</p>
        <p className="text-sm font-bold text-[#F8FAFC]">{formatUSD(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

const ChartTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 border border-[#1E2030]">
        <p className="text-xs text-[#94A3B8] mb-1">{label}</p>
        <p className="text-sm font-bold text-[#F8FAFC]">{formatUSD(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [chartPeriod, setChartPeriod] = useState<'7D' | '30D' | '90D'>('30D');
  const recentTransactions = mockTransactions.slice(0, 5);

  const chartData =
    chartPeriod === '7D'
      ? portfolioHistory.slice(-7)
      : chartPeriod === '30D'
      ? portfolioHistory
      : portfolioHistory;

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Portfolio Value Hero */}
      <div className="glass-card gradient-border p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-[#94A3B8] text-sm font-medium mb-2 flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Total Portfolio Value
            </p>
            <div className="flex items-end gap-4">
              <h1 className="text-4xl md:text-5xl font-bold text-[#F8FAFC] number-display">
                {formatUSD(totalPortfolioValue)}
              </h1>
              <div
                className={`flex items-center gap-1 mb-1 px-2.5 py-1 rounded-lg text-sm font-semibold ${
                  portfolioChange24h >= 0
                    ? 'bg-green-500/15 text-[#10B981]'
                    : 'bg-red-500/15 text-[#EF4444]'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                +{portfolioChange24h}% today
              </div>
            </div>
            <p className="text-[#94A3B8] text-sm mt-2">
              +{formatUSD(totalPortfolioValue * (portfolioChange24h / 100))} today
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map(({ label, icon: Icon, href, color }) => (
              <Link key={label} href={href}>
                <div
                  className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-gradient-to-br border cursor-pointer hover:scale-105 active:scale-95 transition-all ${color}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-semibold">{label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="24h Change"
          value={`+${formatUSD(totalPortfolioValue * 0.0247)}`}
          change={portfolioChange24h}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <StatCard
          title="Total Tokens"
          value={String(mockTokens.length)}
          subtitle="Across all chains"
          icon={<Activity className="w-4 h-4" />}
        />
        <StatCard
          title="Transactions"
          value={String(mockTransactions.length)}
          subtitle="Last 30 days"
          icon={<RefreshCw className="w-4 h-4" />}
        />
        <StatCard
          title="Best Performer"
          value="LINK"
          change={5.61}
          icon={<DollarSign className="w-4 h-4" />}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-[#F8FAFC]">Portfolio Performance</h2>
              <p className="text-sm text-[#94A3B8]">Historical value over time</p>
            </div>
            <div className="flex gap-1 bg-[#1E2030] rounded-xl p-1">
              {(['7D', '30D', '90D'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setChartPeriod(period)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    chartPeriod === period
                      ? 'bg-purple-600 text-white'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2030" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                interval={chartPeriod === '7D' ? 0 : 6}
              />
              <YAxis
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#7C3AED"
                strokeWidth={2}
                fill="url(#portfolioGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="glass-card p-6">
          <div className="mb-6">
            <h2 className="font-semibold text-[#F8FAFC]">Allocation</h2>
            <p className="text-sm text-[#94A3B8]">Portfolio distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={donutChartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {donutChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {donutChartData.map((item) => {
              const pct = ((item.value / totalPortfolioValue) * 100).toFixed(1);
              return (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-[#94A3B8]">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-[#F8FAFC]">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-[#1E2030]">
          <div>
            <h2 className="font-semibold text-[#F8FAFC]">Token Holdings</h2>
            <p className="text-sm text-[#94A3B8]">{mockTokens.length} assets</p>
          </div>
          <Link href="/send">
            <GlowButton size="sm">
              <ArrowUpRight className="w-4 h-4" />
              Send
            </GlowButton>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full defi-table">
            <thead>
              <tr className="border-b border-[#1E2030]">
                <th className="py-3 px-4 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Asset
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Balance
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-[#94A3B8] uppercase tracking-wider hidden sm:table-cell">
                  Price
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-[#94A3B8] uppercase tracking-wider hidden md:table-cell">
                  24h
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {mockTokens.map((token) => (
                <TokenCard key={token.id} token={token} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-[#1E2030]">
          <div>
            <h2 className="font-semibold text-[#F8FAFC]">Recent Transactions</h2>
            <p className="text-sm text-[#94A3B8]">Last 5 activities</p>
          </div>
          <Link href="/history">
            <GlowButton variant="secondary" size="sm">
              View All
            </GlowButton>
          </Link>
        </div>
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
              {recentTransactions.map((tx) => (
                <TransactionRow key={tx.id} transaction={tx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
