'use client';

import React from 'react';

interface NetworkBadgeProps {
  name: string;
  color: string;
  size?: 'sm' | 'md';
  active?: boolean;
}

export function NetworkBadge({ name, color, size = 'md', active = false }: NetworkBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs gap-1.5' : 'px-3 py-1.5 text-sm gap-2';
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  return (
    <div
      className={`inline-flex items-center rounded-full border transition-all ${sizeClasses} ${
        active
          ? 'border-current/30 text-white bg-white/10'
          : 'border-[#1E2030] text-[#94A3B8] bg-[#111318]'
      }`}
      style={active ? { color } : undefined}
    >
      <span
        className={`rounded-full flex-shrink-0 ${dotSize} ${active ? 'animate-pulse' : ''}`}
        style={{ backgroundColor: color }}
      />
      <span className="font-medium">{name}</span>
    </div>
  );
}
