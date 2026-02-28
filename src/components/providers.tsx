"use client";

import { CavosProvider } from '@cavos/react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CavosProvider
            config={{
                appId: process.env.NEXT_PUBLIC_CAVOS_APP_ID ?? "",
                network: 'sepolia',
                paymasterApiKey: process.env.NEXT_PUBLIC_PAYMASTER_API_KEY ?? "",
            }}
        >
            {children}
        </CavosProvider>
    );
}
