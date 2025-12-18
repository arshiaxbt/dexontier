'use client';

import { createConfig, http, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider as PrivyWagmiProvider } from '@privy-io/wagmi';
import { megaETH } from '../lib/chains';

export const config = createConfig({
    chains: [megaETH],
    transports: {
        [megaETH.id]: http(),
    },
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
            config={{
                loginMethods: ['wallet', 'google', 'twitter', 'discord'],
                appearance: {
                    theme: 'dark',
                    accentColor: '#676FFF',
                    logo: 'https://megaeth.com/logo.svg', // Placeholder
                },
                supportedChains: [megaETH],
            }}
        >
            <QueryClientProvider client={queryClient}>
                <PrivyWagmiProvider config={config}>
                    {children}
                </PrivyWagmiProvider>
            </QueryClientProvider>
        </PrivyProvider>
    );
}
