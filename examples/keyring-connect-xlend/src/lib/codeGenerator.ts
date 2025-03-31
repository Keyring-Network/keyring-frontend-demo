export function generateModuleCode(activeTab: string): string {
  const commonImports = `
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  KeyringConnect,
  ExtensionState,
} from "@keyringnetwork/keyring-connect-sdk";
import { Icon } from "./Icon";`;

  const stateSetup = `
  const [isInstalled, setIsInstalled] = useState<boolean | undefined>(undefined);
  const [extensionState, setExtensionState] = useState<ExtensionState | null>(null);
  const [isLoading, setIsLoading] = useState(false);`;

  const extensionCheck = `
  // CHECK IF EXTENSION IS INSTALLED
  useEffect(() => {
    const checkExtension = async () => {
      try {
        const installed = await KeyringConnect.isKeyringConnectInstalled();
        setIsInstalled(installed);

        if (installed) {
          // If installed, get the current state
          const state = await KeyringConnect.getExtensionState();
          setExtensionState(state);
        }
      } catch (error) {
        console.error("Failed to check extension:", error);
      }
    };

    checkExtension();
  }, []);`;

  const launchExtensionFunction = `
  // LAUNCH THE EXTENSION
  const launchExtension = async () => {
    try {
      const exmapleConfig = {
        app_url: window.location.origin,
        name: "xLend",
        logo_url: \`\${window.location.origin}/xlend-icon.svg\`,
        policy_id: 7, // Example policy ID
      };
      await KeyringConnect.launchExtension(exmapleConfig);
    } catch (error) {
      console.error("Failed to launch extension:", error);
    }
  };`;

  const checkStatusFunction = `
  // CHECK VERIFICATION STATUS
  const checkStatus = async () => {
    setIsLoading(true);
    try {
      const state = await KeyringConnect.getExtensionState();
      setExtensionState(state);
    } catch (error) {
      console.error("Failed to check status:", error);
    } finally {
      setIsLoading(false);
    }
  };`;

  // Generate the specific content for the current tab
  let tabSpecificContent = "";

  if (activeTab === "install") {
    tabSpecificContent = `
    return (
      <div className="p-6 border rounded-lg bg-white border-gray-200">
        <div className="flex items-start gap-4">
          <Icon activeTab="install" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">KYC Verification Required</h3>
            <p className="text-sm text-gray-600 mt-1">
              Install the Keyring extension to complete identity verification.
            </p>
            <Button className="mt-3" onClick={launchExtension} disabled={isLoading}>
              Install Extension
            </Button>
            <div className="mt-2 text-xs text-gray-500">
              Status: {isInstalled ? "Installed" : "Not Installed"}
            </div>
          </div>
        </div>
      </div>
    );`;
  } else if (activeTab === "start") {
    tabSpecificContent = `
    return (
      <div className="p-6 border rounded-lg bg-white border-gray-200">
        <div className="flex items-start gap-4">
          <Icon activeTab="start" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Complete KYC Verification</h3>
            <p className="text-sm text-gray-600 mt-1">
              Verify your identity to access lending features.
            </p>
            <Button className="mt-3" onClick={launchExtension} disabled={isLoading}>
              {isLoading ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : null}
              Start Verification
            </Button>
          </div>
        </div>
      </div>
    );`;
  } else if (activeTab === "progress") {
    tabSpecificContent = `
    return (
      <div className="p-6 border rounded-lg bg-white border-gray-200">
        <div className="flex items-start gap-4">
          <Icon activeTab="progress" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Verification In Progress</h3>
            <p className="text-sm text-gray-600 mt-1">
              We're verifying your identity. This may take a few minutes.
            </p>
            <div className="flex gap-2 mt-3">
              <Button onClick={checkStatus} disabled={isLoading}>
                {isLoading ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : null}
                Check Status
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
            {extensionState?.user?.wallet_address ? (
              <>
                <div className="mt-2 text-xs text-gray-500">
                  Wallet Address: {extensionState.user?.wallet_address}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Credential Status: {extensionState.user?.credential_status}
                </div>
              </>
            ) : (
              <div className="mt-2 text-xs text-gray-500">
                Credential Status: unknown
              </div>
            )}
          </div>
        </div>
      </div>
    );`;
  } else if (activeTab === "completed") {
    tabSpecificContent = `
    return (
      <div className="p-6 border rounded-lg bg-green-50 border-green-200">
        <div className="flex items-start gap-4">
          <Icon activeTab="completed" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Verification Complete</h3>
            <p className="text-sm text-gray-600 mt-1">
              Your identity has been verified. You can now access all platform features.
            </p>
            {extensionState?.user && (
              <div className="mt-2 text-xs text-gray-500">
                Wallet Address: {extensionState.user.wallet_address}...
              </div>
            )}
            <div className="flex items-center gap-1 mt-4 text-xs">
              <span className="font-medium">Provided by Keyring</span>
            </div>
          </div>
        </div>
      </div>
    );`;
  }

  // Assemble the complete component code
  return `${commonImports}

export function KycModule({ activeTab }: { activeTab: string }) {
  ${stateSetup}

  ${extensionCheck}

  ${launchExtensionFunction}

  ${checkStatusFunction}

  ${tabSpecificContent}
}`;
}
