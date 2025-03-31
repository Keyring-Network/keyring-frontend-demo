"use client";

import { ArrowRight } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { KeyringLogo } from "./keyring-logo";

export function Header() {
  return (
    <header className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <KeyringLogo dark />
        <Badge>Connect Demo</Badge>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => {
            window.open(
              "https://www.npmjs.com/package/@keyringnetwork/keyring-connect-sdk",
              "_blank"
            );
          }}
        >
          Explore the Docs <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
