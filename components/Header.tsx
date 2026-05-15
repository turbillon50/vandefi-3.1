'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Zap, Bell, ChevronDown } from 'lucide-react';
import { networks } from '@/lib/mockData';

export function Header() {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [networkOpen, setNetworkOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#1E2030] bg-[#0A0B0F]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Logo - mobile only (desktop shows in sidebar) */}
        <Link href="/" className="flex items-center gap-2 md:hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-gradient">VanDeFi</span>
        </Link>

        {/* Page title placeholder on desktop */}
        <div className="hidden md:block" />

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Network Selector */}
          <div className="relative">
            <button
              onClick={() => setNetworkOpen(!networkOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111318] border border-[#1E2030] hover:border-purple-500/30 transition-all text-sm"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: selectedNetwork.color }}
              />
              <span className="hidden sm:block text-[#94A3B8]">{selectedNetwork.name}</span>
              <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
            </button>

            {networkOpen && (
              <div className="absolute right-0 mt-2 w-44 glass-card border border-[#1E2030] rounded-xl shadow-xl z-50 py-1 animate-fade-in">
                {networks.map((net) => (
                  <button
                    key={net.id}
                    onClick={() => {
                      setSelectedNetwork(net);
                      setNetworkOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#1E2030] transition-colors text-sm text-left"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: net.color }}
                    />
                    <span className={selectedNetwork.id === net.id ? 'text-purple-400' : 'text-[#94A3B8]'}>
                      {net.name}
                    </span>
                    {selectedNetwork.id === net.id && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl bg-[#111318] border border-[#1E2030] hover:border-purple-500/30 transition-all">
            <Bell className="w-4 h-4 text-[#94A3B8]" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-purple-500" />
          </button>

          {/* Wallet Connect */}
          <ConnectButton
            showBalance={false}
            chainStatus="none"
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
          />
        </div>
      </div>
    </header>
  );
}
