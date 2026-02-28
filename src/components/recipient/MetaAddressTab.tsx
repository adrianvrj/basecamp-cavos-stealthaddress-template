"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MOCK_KEYS = {
    spendingX: "0x6652f2e73d807509af5cf1464b1863b80da70356faf807077b88c97ea453e5b",
    spendingY: "0x972a0146dbdc25b2cea7ba3b0d303a282597f7218e34d12cc04df63262e3dc",
    viewingX: "0x25d22d4ba952a5b0cdf078ab9af5c085940343329b4ed561a97bca0758dc135",
    viewingY: "0x3a0ea87a65bac29ddbeee73ff0c72bed74e8d719dd383a9984329b81602acfa",
    schemeId: "1",
};

export function MetaAddressTab() {
    const [keysGenerated, setKeysGenerated] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Generate your keys and register them on-chain</CardTitle>
                    <CardDescription>
                        Create local spending and viewing keys to derive your stealth meta-address.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    {!keysGenerated ? (
                        <div className="flex justify-center py-8">
                            <Button size="lg" onClick={() => setKeysGenerated(true)}>
                                Generate Keys
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="rounded-md bg-zinc-950 p-4">
                                <pre className="overflow-x-auto text-sm text-zinc-50">
                                    <code>{JSON.stringify(MOCK_KEYS, null, 2)}</code>
                                </pre>
                            </div>

                            <div className="rounded-md border border-amber-500/50 bg-amber-500/5 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
                                <h4 className="mb-2 text-sm font-semibold text-amber-900 dark:text-amber-500">
                                    SAVE YOUR PRIVATE KEY!
                                </h4>
                                <p className="mb-3 text-xs text-amber-800 dark:text-amber-200/70">
                                    You need it to claim payments. It will not be shown again.
                                </p>
                                <div className="break-all rounded bg-white/50 px-3 py-2 font-mono text-xs text-amber-950 dark:bg-black/50 dark:text-amber-200">
                                    0x60162666d7d84fb01c8881ad22fce8250e6227af050af1abb5b142ac7fc3d3e
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                                <Button variant="outline">Generate Meta-Address</Button>
                                <Button>Register Your Keys Onchain</Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
