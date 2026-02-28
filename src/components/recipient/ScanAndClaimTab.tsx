"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ScanAndClaimTab() {
    const [privateKey, setPrivateKey] = useState("");
    const [fromBlock, setFromBlock] = useState("");
    const [status, setStatus] = useState<"idle" | "scanning" | "error" | "success">("idle");

    const handleScan = () => {
        setStatus("scanning");
        // Mock the error to match the screenshot's red failure box
        setTimeout(() => {
            setStatus("error");
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Intro Card */}
            <Card className="border-amber-500/50 bg-amber-500/5 dark:border-amber-500/20 dark:bg-amber-500/10">
                <CardHeader>
                    <CardTitle className="text-amber-700 dark:text-amber-500">Scan Payments</CardTitle>
                    <CardDescription className="text-amber-900/80 dark:text-amber-200/70">
                        Use your private key to find stealth payments sent to you.
                        <br />
                        The scanner checks announcements and computes which addresses you control.
                    </CardDescription>
                </CardHeader>
            </Card>

            {/* Input Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">1</span>
                        Enter Your Private Key
                    </CardTitle>
                    <CardDescription>
                        Your spending private key is used to check which announcements are yours.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="privateKey">Your Spending Private Key</Label>
                        <Input
                            id="privateKey"
                            type="password"
                            placeholder="**********************************************"
                            value={privateKey}
                            onChange={(e) => {
                                setPrivateKey(e.target.value);
                                setStatus("idle");
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="fromBlock" className="text-zinc-500">From Block (optional, reduces scan time)</Label>
                        <Input
                            id="fromBlock"
                            placeholder="e.g. 5621500"
                            value={fromBlock}
                            onChange={(e) => {
                                setFromBlock(e.target.value);
                                setStatus("idle");
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button
                            onClick={handleScan}
                            className="w-fit bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                            disabled={!privateKey || status === "scanning"}
                        >
                            {status === "scanning" ? "Scanning..." : "Scan Announcements"}
                        </Button>

                        {status === "error" && (
                            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                                Scan failed: Failed to fetch
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Results Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">2</span>
                        Results
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex min-h-[100px] items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                        <span className="text-sm font-medium text-zinc-500">
                            {status === "idle" && "Waiting to scan..."}
                            {status === "scanning" && "Scanning..."}
                            {status === "error" && "No results."}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
