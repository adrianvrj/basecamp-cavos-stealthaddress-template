"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SendStealthPaymentTab() {
    const [recipientAddress, setRecipientAddress] = useState("");
    const [metaAddress, setMetaAddress] = useState("");
    const [stealthAddress, setStealthAddress] = useState("");
    const [step, setStep] = useState<"initial" | "fetched" | "generated">("initial");

    const handleFetchMeta = () => {
        if (!recipientAddress) return;
        // Mocking an async fetch here...
        // const recipientMeta = await registry.get_stealth_meta_address(recipientAddress);
        // const metaAddress = decodeMetaAddress(
        //     recipientMeta.spending_pubkey_x,
        //     recipientMeta.spending_pubkey_y,
        //     recipientMeta.viewing_pubkey_x,
        //     recipientMeta.viewing_pubkey_y,
        //     recipientMeta.scheme_id
        // );

        setMetaAddress("0x5b3c...c19a (Mock Generated Destination)");
        setStep("fetched");
    };

    const handleGenerate = () => {
        // Mocking local address generation...
        // Generate stealth address
        // const result = generateStealthAddress(
        //     metaAddress,
        //     FACTORY_ADDRESS,
        //     ACCOUNT_CLASS_HASH
        //   );

        setStealthAddress("0x5b3c...c19a (Mock Generated Destination)");
        setStep("generated");
    };

    const handleDeployAndAnnounce = () => {
        // Deploy and announce stealth address
        // Deploy and send funds
        // await factory.deploy_stealth_account(
        //     result.stealthPubkey.x,
        //     result.stealthPubkey.y,
        //     salt
        //   );
        // TODO: Implement actual deployment and announcement
        // await registry.announce(
        //     0, // scheme_id
        //     result.ephemeralPubkey.x,
        //     result.ephemeralPubkey.y,
        //     result.stealthAddress,
        //     result.viewTag,
        //     0 // metadata
        //   );
        console.log("Deployed and announced stealth address: ", metaAddress);
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
                                {metaAddress}
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
                                    {stealthAddress}
                                </span>
                            </div>

                            <div className="flex justify-end">
                                <Button size="lg" onClick={handleDeployAndAnnounce} className="w-full sm:w-auto">
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
