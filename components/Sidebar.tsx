'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Zap,
  LayoutDashboard,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  History,
  Settings,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/send', label: 'Send', icon: ArrowUpRight },
  { href: '/receive', label: 'Receive', icon: ArrowDownLeft },
  { href: '/swap', label: 'Swap', icon: RefreshCw },
  { href: '/history', label: 'History', icon: History },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-[#111318] border-r border-[#1E2030] z-50">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-[#1E2030]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-xl text-gradient">VanDeFi</span>
            <p className="text-[10px] text-[#94A3B8] -mt-0.5">DeFi Wallet</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider px-3 mb-3">
            Navigation
          </p>
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/20'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E2030]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-purple-400' : 'text-[#94A3B8] group-hover:text-[#F8FAFC]'
                  }`}
                />
                <span className="font-medium text-sm">{label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-3 pb-6 border-t border-[#1E2030] pt-4">
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E2030] transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </Link>
          <div className="mt-4 mx-3 p-3 rounded-xl bg-gradient-to-r from-purple-600/10 to-blue-500/10 border border-purple-500/20">
            <p className="text-xs font-semibold text-[#F8FAFC] mb-1">New Feature</p>
            <p className="text-xs text-[#94A3B8]">Cross-chain bridging now available</p>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav md:hidden flex items-center justify-around px-2 py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                isActive ? 'text-purple-400' : 'text-[#94A3B8]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-purple-400" />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
