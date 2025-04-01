"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { UserIcon, Loader, ShieldCheck, Blocks } from "lucide-react";
import { generateModuleCode } from "@/lib/codeGenerator";
import { ViewModeToggle } from "@/components/demo/ViewModeToggle";
import { StepNavigation } from "@/components/demo/StepNavigation";
import { BrowserFrame } from "@/components/demo/BrowserFrame";
import { XLendAppInterface } from "@/components/demo/XLendAppInterface/index";
import { CodeOverlay } from "@/components/demo/CodeOverlay";

// Verification process steps
const VERIFICATION_STEPS = [
  { id: "install", label: "Install Extension", icon: Blocks },
  { id: "start", label: "Start Verification", icon: UserIcon },
  { id: "progress", label: "In Progress", icon: Loader },
  { id: "completed", label: "Verified", icon: ShieldCheck },
];

export default function KeyringConnectDemo() {
  const [activeTab, setActiveTab] = useState<
    "install" | "start" | "progress" | "completed"
  >("install");
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  // Function to copy code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateModuleCode(activeTab));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <StepNavigation
        steps={VERIFICATION_STEPS}
        activeTab={activeTab}
        setActiveTab={(id: string) =>
          setActiveTab(id as "install" | "start" | "progress" | "completed")
        }
      />

      <div className="flex justify-between items-center">
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      {/* Content Area with Preview and Code Overlay */}
      <div className="relative">
        {/* Preview Mode - Full xLend UI */}
        <div
          className={`border rounded-xl shadow-md overflow-hidden bg-white transition-all duration-300 ${
            viewMode === "code" ? "blur-sm" : ""
          }`}
        >
          <BrowserFrame
            icon="/xlend-icon.svg"
            title="xLend"
            url="https://app.xlend.io/1/simple/lend/ETH"
          />

          {/* xLend App Interface */}
          <XLendAppInterface activeTab={activeTab} />
        </div>

        {/* Code Mode Overlay */}
        <AnimatePresence>
          {viewMode === "code" && (
            <CodeOverlay
              activeTab={activeTab}
              copied={copied}
              copyToClipboard={copyToClipboard}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
