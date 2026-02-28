"use client";

import { useCavos } from '@cavos/react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export function ConnectedWallet() {
    const { user, execute, walletStatus } = useCavos();

    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');

    const handleSend = async () => {
        if (!walletStatus.isReady) {
            console.log('Wallet not ready yet');
            return;
        }

        try {
            const txHash = await execute({
                contractAddress: '0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7', // ETH Token Address
                entrypoint: 'transfer',
                calldata: [recipientAddress, amount, '0'], // recipient, amount_low, amount_high
            });

            console.log('Transaction hash:', txHash);
            alert(`Example TX sent! Hash: ${txHash}`);
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed!');
        }
    };

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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        Send Example TX
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-4">
                    <DropdownMenuLabel className="px-0 pb-4">
                        <div className="text-base">Send Tokens</div>
                        <div className="text-xs font-normal text-zinc-500">Test your wallet by sending a transaction.</div>
                    </DropdownMenuLabel>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="address">Recipient Address</Label>
                            <Input
                                id="address"
                                placeholder="0x..."
                                value={recipientAddress}
                                onChange={(e) => setRecipientAddress(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="amount">Amount (wei)</Label>
                            <Input
                                id="amount"
                                placeholder="1000"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleSend} className="mt-2 w-full" disabled={!walletStatus.isReady || !recipientAddress || !amount}>
                            Execute Transaction
                        </Button>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
