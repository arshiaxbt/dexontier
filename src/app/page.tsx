'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { ArrowDown, Settings, ChevronDown, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { login, authenticated, user, logout } = usePrivy();
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [activeTab, setActiveTab] = useState<'swap' | 'liquidity'>('swap');

  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');

  return (
    <main className="main-container">
      <nav className="navbar">
        <div className="logo">DEXONTIER</div>
        <div className="nav-actions">
          {authenticated ? (
            <button className="token-select" onClick={() => logout()}>
              <Wallet size={16} />
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
            </button>
          ) : (
            <button className="swap-btn" style={{ marginTop: 0, padding: '0.6rem 1.2rem' }} onClick={() => login()}>
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dex-card"
      >
        <div className="tab-group">
          <button
            className={`tab-btn ${activeTab === 'swap' ? 'active' : ''}`}
            onClick={() => setActiveTab('swap')}
          >
            Swap
          </button>
          <button
            className={`tab-btn ${activeTab === 'liquidity' ? 'active' : ''}`}
            onClick={() => setActiveTab('liquidity')}
          >
            Liquidity
          </button>
          <div style={{ flex: 1 }} />
          <Settings size={20} className="tab-btn" style={{ color: '#666' }} />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'swap' ? (
            <motion.div
              key="swap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              <div className="input-group">
                <div className="input-row">
                  <span style={{ color: '#999', fontSize: '0.9rem' }}>You sell</span>
                </div>
                <div className="input-row" style={{ marginTop: '0.5rem' }}>
                  <input
                    type="number"
                    placeholder="0"
                    className="token-input"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                  />
                  <div className="token-select">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#627EEA' }} />
                    ETH <ChevronDown size={16} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', marginTop: '0.5rem', color: '#666', fontSize: '0.8rem' }}>
                  Balance: {balance?.formatted?.slice(0, 6)} ETH
                </div>
              </div>

              <div className="swap-divider">
                <div className="swap-icon-container">
                  <ArrowDown size={18} />
                </div>
              </div>

              <div className="input-group">
                <div className="input-row">
                  <span style={{ color: '#999', fontSize: '0.9rem' }}>You buy</span>
                </div>
                <div className="input-row" style={{ marginTop: '0.5rem' }}>
                  <input
                    type="number"
                    placeholder="0"
                    className="token-input"
                    value={buyAmount}
                    readOnly
                  />
                  <div className="token-select">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#FF007A' }} />
                    DEX <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <button className="swap-btn" disabled={!authenticated}>
                {authenticated ? 'Swap' : 'Connect Wallet to Swap'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="liquidity"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div style={{ padding: '1rem', textAlign: 'center', color: '#999' }}>
                <p>Provide liquidity to earn 0.3% of all trades on this pair.</p>
                <button className="swap-btn" style={{ width: '100%', marginTop: '2rem' }}>
                  Add Liquidity
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div style={{ marginTop: '2rem', color: '#444', fontSize: '0.8rem', textAlign: 'center' }}>
        Built on MegaETH • Chain ID 4326
      </div>
    </main>
  );
}
