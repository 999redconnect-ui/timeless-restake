'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { ShieldCheck, ChevronDown, Sparkles, Layers } from 'lucide-react';

export default function Home() {
  const { isConnected, address } = useAccount();
  const [activeProtocol, setActiveProtocol] = useState<'symbiotic' | 'eigenlayer'>('eigenlayer');
  const [tab, setTab] = useState<'restake' | 'withdraw'>('restake');
  const [amount, setAmount] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<string>('stETH');

  const { writeContract, isPending } = useWriteContract();

  const handleAction = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    // Example contract call logic for restaking
    /*
    writeContract({
      address: '0xYourVaultContractAddress',
      abi: VaultABI,
      functionName: 'restake',
      args: [parseEther(amount), address],
    });
    */
  };

  return (
    <div className="min-h-screen bg-[#060D08] text-gray-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Navigation Bar */}
      <header className="border-b border-emerald-900/30 px-8 py-4 flex items-center justify-between bg-[#08120B]">
        <div className="flex items-center space-x-10">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-2 bg-emerald-500 rounded-sm"></div>
            <span className="text-xl font-bold tracking-wider text-white">Timeless</span>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm text-gray-400 font-medium">
            <a href="#" className="hover:text-emerald-400 transition-colors">Discover</a>
            <a href="#" className="text-emerald-400 font-semibold border-b-2 border-emerald-500 pb-1">Restake</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Portfolio</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Rewards</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Earn</a>
          </nav>
        </div>
        <div>
          <ConnectButton chainStatus="icon" showBalance={false} />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center items-center p-6 relative overflow-hidden">
        {/* Ambient Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-950/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-lg bg-[#0A160E] border border-emerald-900/40 rounded-2xl p-6 shadow-2xl relative z-10 backdrop-blur-md">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-white">Restake</h1>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                <ShieldCheck className="w-3 h-3" />
                <span>Audited</span>
              </span>
            </div>
          </div>

          {/* Protocol Switcher (Symbiotic vs EigenLayer) */}
          <div className="grid grid-cols-2 gap-2 bg-[#050B07] p-1.5 rounded-xl border border-emerald-900/30 mb-6">
            <button
              onClick={() => setActiveProtocol('symbiotic')}
              className={`py-2.5 rounded-lg font-bold text-sm transition-all ${
                activeProtocol === 'symbiotic'
                  ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              SYMBIOTIC
            </button>
            <button
              onClick={() => setActiveProtocol('eigenlayer')}
              className={`py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center space-x-1 ${
                activeProtocol === 'eigenlayer'
                  ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Layers className="w-4 h-4 mr-1" />
              EigenLayer
            </button>
          </div>

          {/* Restake / Withdraw Tabs & Limit */}
          <div className="flex items-center justify-between mb-4 border-b border-emerald-900/30 pb-3">
            <div className="flex space-x-6">
              <button
                onClick={() => setTab('restake')}
                className={`text-sm font-semibold relative pb-3 transition-colors ${
                  tab === 'restake' ? 'text-emerald-400' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Restake
                {tab === 'restake' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />}
              </button>
              <button
                onClick={() => setTab('withdraw')}
                className={`text-sm font-semibold relative pb-3 transition-colors ${
                  tab === 'withdraw' ? 'text-emerald-400' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Withdraw
                {tab === 'withdraw' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />}
              </button>
            </div>
            <div className="text-right text-xs text-gray-400">
              <span>TVL / Limit</span>
              <div className="font-semibold text-emerald-400">374.81 | 10000 ETH</div>
            </div>
          </div>

          {/* Input Box */}
          <div className="bg-[#050B07] border border-emerald-900/30 rounded-xl p-4 mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Enter Amount</span>
              <span>Balance: 0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-2xl font-semibold text-white focus:outline-none w-full mr-2"
              />
              <button className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-2 py-1 rounded font-bold hover:bg-emerald-900/50 mr-2">
                MAX
              </button>
              <button className="flex items-center space-x-1 bg-[#0A160E] border border-emerald-900/50 px-3 py-1.5 rounded-lg text-sm font-semibold text-white">
                <span>{selectedToken}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Receive Display */}
          <div className="bg-[#050B07] border border-emerald-900/30 rounded-xl p-4 mb-6 flex items-center justify-between">
            <span className="text-xs text-gray-400">Receive</span>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-white">{amount || '0'}</span>
              <span className="text-sm font-bold text-emerald-400">ultraETH</span>
            </div>
          </div>

          {/* Main Action Button */}
          {!isConnected ? (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-950/50"
                >
                  Connect Wallet
                </button>
              )}
            </ConnectButton.Custom>
          ) : (
            <button
              onClick={handleAction}
              disabled={isPending}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
            >
              {isPending ? 'Processing...' : tab === 'restake' ? 'Restake' : 'Withdraw'}
            </button>
          )}

          {/* Metrics & Multipliers Card */}
          <div className="mt-6 border border-emerald-900/30 rounded-xl p-4 bg-[#050B07]/50 space-y-4">
            <div className="grid grid-cols-4 gap-2 text-center text-xs pb-3 border-b border-emerald-900/30">
              <div>
                <div className="text-gray-400 mb-1">APR</div>
                <div className="font-bold text-emerald-400 text-sm">3.2%</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">TVL</div>
                <div className="font-bold text-white text-sm">374.81 ETH</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Restaking APR</div>
                <div className="font-bold text-gray-300 text-sm">TBD</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Timeless Fees</div>
                <div className="font-bold text-white text-sm">0%</div>
              </div>
            </div>

            {/* Points & Incentives Badges */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-[#0A160E] border border-emerald-900/40 p-2.5 rounded-lg flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-gray-400 text-[10px]">Timeless Points</div>
                  <div className="font-bold text-white">Up to 5X</div>
                </div>
              </div>
              <div className="bg-[#0A160E] border border-emerald-900/40 p-2.5 rounded-lg flex items-center space-x-2">
                <div className="w-4 h-4 bg-emerald-500/20 text-emerald-400 rounded flex items-center justify-center font-bold text-[10px]">L</div>
                <div>
                  <div className="text-gray-400 text-[10px]">EigenLayer Points</div>
                  <div className="font-bold text-white">1X</div>
                </div>
              </div>
              <div className="bg-[#0A160E] border border-emerald-900/40 p-2.5 rounded-lg flex items-center space-x-2">
                <div className="w-4 h-4 text-emerald-400 shrink-0 font-bold">💎</div>
                <div>
                  <div className="text-gray-400 text-[10px]">More Points</div>
                  <div className="font-bold text-white">Up to 10X</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}