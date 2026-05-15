'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Copy,
  CheckCircle,
  Share2,
  ArrowDownLeft,
  Download,
  ExternalLink,
} from 'lucide-react';
import { walletAddress, networks } from '@/lib/mockData';
import { NetworkBadge } from '@/components/NetworkBadge';
import GlowButton from '@/components/GlowButton';

export default function ReceivePage() {
  const [copied, setCopied] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'VanDeFi Wallet Address',
        text: `My wallet address: ${walletAddress}`,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <div className="max-w-lg mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F8FAFC] flex items-center gap-2">
          <ArrowDownLeft className="w-6 h-6 text-green-400" />
          Receive Tokens
        </h1>
        <p className="text-[#94A3B8] mt-1">Share your address to receive crypto</p>
      </div>

      {/* Network Selector */}
      <div className="glass-card p-4 mb-4">
        <p className="text-sm font-medium text-[#94A3B8] mb-3">Select Network</p>
        <div className="flex flex-wrap gap-2">
          {networks.map((net) => (
            <button
              key={net.id}
              onClick={() => setSelectedNetwork(net)}
              className="transition-transform hover:scale-105 active:scale-95"
            >
              <NetworkBadge
                name={net.name}
                color={net.color}
                active={selectedNetwork.id === net.id}
              />
            </button>
          ))}
        </div>
      </div>

      {/* QR Code Card */}
      <div className="glass-card p-6 mb-4">
        <div className="flex flex-col items-center">
          {/* QR Code */}
          <div className="p-4 bg-white rounded-2xl shadow-xl shadow-black/20 mb-6 relative">
            <QRCodeSVG
              value={walletAddress}
              size={200}
              bgColor="#ffffff"
              fgColor="#0A0B0F"
              level="M"
              includeMargin={false}
            />
            {/* Center logo overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg">
                <span className="text-white text-xs font-bold">VD</span>
              </div>
            </div>
          </div>

          {/* Network indicator */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: selectedNetwork.color }}
            />
            <span className="text-sm text-[#94A3B8]">
              {selectedNetwork.name} Network
            </span>
          </div>

          {/* Address display */}
          <div className="w-full p-4 rounded-xl bg-[#1E2030]/60 border border-[#1E2030] mb-4">
            <p className="text-xs text-[#94A3B8] mb-2 font-medium">Wallet Address</p>
            <p className="font-mono text-sm text-[#F8FAFC] break-all leading-relaxed">
              {walletAddress}
            </p>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border transition-all font-medium text-sm ${
              copied
                ? 'border-green-500/30 bg-green-500/10 text-[#10B981]'
                : 'border-[#1E2030] bg-[#1E2030]/60 text-[#94A3B8] hover:border-purple-500/30 hover:text-[#F8FAFC]'
            }`}
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copied to clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Address
              </>
            )}
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <GlowButton variant="secondary" onClick={handleShare} fullWidth>
          <Share2 className="w-4 h-4" />
          Share
        </GlowButton>
        <GlowButton variant="secondary" fullWidth onClick={() => {
          const canvas = document.querySelector('canvas');
          if (canvas) {
            const link = document.createElement('a');
            link.download = 'vandefi-address-qr.png';
            link.href = canvas.toDataURL();
            link.click();
          }
        }}>
          <Download className="w-4 h-4" />
          Save QR
        </GlowButton>
      </div>

      {/* Info card */}
      <div className="glass-card p-5 space-y-4">
        <h3 className="font-semibold text-[#F8FAFC]">How to receive</h3>
        <div className="space-y-3">
          {[
            {
              step: '1',
              title: 'Share your address',
              desc: 'Copy your wallet address or show the QR code to the sender',
            },
            {
              step: '2',
              title: 'Select correct network',
              desc: 'Make sure the sender uses the same network as you selected above',
            },
            {
              step: '3',
              title: 'Await confirmation',
              desc: 'Transactions typically confirm within a few minutes',
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-purple-400">{step}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#F8FAFC]">{title}</p>
                <p className="text-xs text-[#94A3B8] mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explorer link */}
      <a
        href={`https://etherscan.io/address/${walletAddress}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 text-sm text-[#94A3B8] hover:text-purple-400 transition-colors py-2"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        View on Etherscan
      </a>
    </div>
  );
}
