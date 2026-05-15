'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
  subtitle?: string;
  gradient?: boolean;
}

export function StatCard({ title, value, change, icon, subtitle, gradient = false }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className={`glass-card glass-card-hover p-5 ${
        gradient ? 'gradient-border' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-[#94A3B8] font-medium">{title}</p>
          {subtitle && (
            <p className="text-xs text-[#94A3B8]/60 mt-0.5">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-[#1E2030] text-[#94A3B8]">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-end gap-3">
        <p className="text-2xl font-bold text-[#F8FAFC] number-display">{value}</p>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 mb-0.5 text-sm font-medium ${
              isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
