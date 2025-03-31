import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, Wallet } from "lucide-react";

export function AppHeader() {
  return (
    <div className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Image src="/xlend-logo.svg" alt="xLend" width={89.39} height={22.78} />
        <div className="flex items-center gap-6 ml-4">
          <span className="font-medium">Lend</span>
          <span className="font-medium">Borrow</span>
          <span className="font-medium">Portfolio</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="rounded-full bg-blue-500 text-white border-blue-500 flex items-center gap-2"
        >
          Select Network
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="rounded-full border-blue-500 text-blue-500 flex items-center gap-2"
        >
          <Wallet className="h-4 w-4" />
          Connect wallet
        </Button>
      </div>
    </div>
  );
}
