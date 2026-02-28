"use client";

import { useCavos } from '@cavos/react';
import { Button } from '@/components/ui/button';

export function ConnectedWallet() {
    const { user, walletStatus } = useCavos();

    return (
        <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {user?.id ? `${user.id.slice(0, 6)}...${user.id.slice(-4)}` : 'Connected'}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {walletStatus.isReady ? 'Wallet Ready' : 'Setting up...'}
                </span>
            </div>
            <Button variant="outline" size="sm" onClick={() => alert("Example TX sent!")}>
                Send Example TX
            </Button>
        </div>
    );
}
