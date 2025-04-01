import { motion } from "framer-motion";
import { Code, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KeyringConnectModule } from "@/components/demo/KeyringConnectModule/index";
import { generateModuleCode } from "@/lib/codeGenerator";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/atom-one-dark.css";

interface CodeOverlayProps {
  activeTab: string;
  copied: boolean;
  copyToClipboard: () => void;
}

export function CodeOverlay({
  activeTab,
  copied,
  copyToClipboard,
}: CodeOverlayProps) {
  // Register TypeScript language for syntax highlighting
  hljs.registerLanguage("typescript", typescript);

  const code = generateModuleCode(activeTab);

  const highlightedCode = hljs.highlight(code, {
    language: "typescript",
  }).value;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
        {/* Left side - Isolated Module */}
        <motion.div
          className="border rounded-xl shadow-md overflow-hidden bg-white p-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium mb-4">
            Keyring Connect Module Preview
          </h3>

          {/* Isolated Keyring Connect Module */}
          <KeyringConnectModule activeTab={activeTab} />
        </motion.div>

        {/* Right side - Code */}
        <motion.div
          className="border rounded-xl shadow-md overflow-hidden bg-gray-950 text-gray-100"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-gray-400" />
              <span className="font-medium">KeyringConnectModule.tsx</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="p-4 overflow-auto max-h-[600px] font-mono text-sm">
            <pre className="whitespace-pre-wrap">
              <code
                className="language-typescript"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </pre>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
