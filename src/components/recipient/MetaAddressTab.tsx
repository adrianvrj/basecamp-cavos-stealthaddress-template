"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MetaAddressTab() {
    const [keysGenerated, setKeysGenerated] = useState(false);
    const [keys, setKeys] = useState<{
        spendingX: string;
        spendingY: string;
        viewingX: string;
        viewingY: string;
        schemeId: string;
    }[]>([]);
    const [metaAddress, setMetaAddress] = useState<string>("");
    
    const generateKeys = () => {
        // generate spending and viewing keys
        // const spendingKey = generatePrivateKey();
        // const viewingKey = generatePrivateKey();

        // the spendingX is the first part of the pubKey of the spending privKey
        // the spendingY is the second part of the pubKey of the spending privKey
        // the viewingX and the viewingY follow same pattern

        setKeys([
            {
                spendingX: "0x6652f2e73d807509af5cf1464b1863b80da70356faf807077b88c97ea453e5b",
                spendingY: "0x972a0146dbdc25b2cea7ba3b0d303a282597f7218e34d12cc04df63262e3dc",
                viewingX: "0x25d22d4ba952a5b0cdf078ab9af5c085940343329b4ed561a97bca0758dc135",
                viewingY: "0x3a0ea87a65bac29ddbeee73ff0c72bed74e8d719dd383a9984329b81602acfa",
                schemeId: "1",
            },
        ]);
        setKeysGenerated(true);
        console.log("Generated keys: ", keys);
    };

    const generateMetaAddress = () => {
        // generate meta address
        // set meta address
        // TODO: Implement actual meta address generation
        setMetaAddress("0x5b3c...c19a (Mock Generated Destination)");
        console.log("Generated meta address: ", metaAddress);
    };

    const registerKeys = () => {
        // register keys onchain
        // TODO: Implement actual keys registration
        // encode the meta address
        // await registry.register_stealth_meta_address(
        //   encoded.spendingX,
        //   encoded.spendingY,
        //   encoded.viewingX,
        //   encoded.viewingY,
        //   encoded.schemeId
        // );
        console.log("Registered keys: ", keys);
    };

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
                            <Button size="lg" onClick={() => {generateKeys()}}>
                                Generate Keys
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="rounded-md bg-zinc-950 p-4">
                                <pre className="overflow-x-auto text-sm text-zinc-50">
                                    <code>{JSON.stringify(keys, null, 2)}</code>
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
                                    
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                                <Button variant="outline" onClick={() => {generateMetaAddress()}}>Generate Meta-Address</Button>
                                <Button onClick={() => {registerKeys()}}>Register Your Keys Onchain</Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
