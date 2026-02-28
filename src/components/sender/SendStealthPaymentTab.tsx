"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SendStealthPaymentTab() {
    const [recipientAddress, setRecipientAddress] = useState("");
    const [step, setStep] = useState<"initial" | "fetched" | "generated">("initial");

    // Mock data for UI demonstrations
    const MOCK_STEALTH_ADDRESS = "0x5b3c...c19a (Mock Generated Destination)";

    const handleFetchMeta = () => {
        if (!recipientAddress) return;
        // Mocking an async fetch here...
        setStep("fetched");
    };

    const handleGenerate = () => {
        // Mocking local address generation...
        setStep("generated");
    };

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>SEND STEALTH PAYMENTS</CardTitle>
                    <CardDescription>
                        Enter a recipient's normal wallet address to securely derive a one-time stealth destination.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="recipient">Recipient Normal Address</Label>
                        <div className="flex gap-2">
                            <Input
                                id="recipient"
                                placeholder="0x..."
                                value={recipientAddress}
                                onChange={(e) => {
                                    setRecipientAddress(e.target.value);
                                    setStep("initial"); // reset flow on input change
                                }}
                            />
                            <Button onClick={handleFetchMeta} disabled={!recipientAddress}>
                                Fetch Recipient Meta
                            </Button>
                        </div>
                    </div>

                    {step === "fetched" && (
                        <div className="flex flex-col gap-4 rounded-md border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                ✓ Meta address successfully found on registry!
                            </p>
                            <Button onClick={handleGenerate} variant="secondary" className="w-fit">
                                Generate Stealth Address
                            </Button>
                        </div>
                    )}

                    {step === "generated" && (
                        <div className="flex flex-col gap-6 rounded-md border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-zinc-500">Generated Stealth Destination:</span>
                                <span className="font-mono text-sm text-zinc-900 dark:text-zinc-50">
                                    {MOCK_STEALTH_ADDRESS}
                                </span>
                            </div>

                            <div className="flex justify-end">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Deploy + Announce
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
