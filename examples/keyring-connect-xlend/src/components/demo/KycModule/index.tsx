"use client";

import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  KeyringConnect,
  ExtensionState,
} from "@keyringnetwork/keyring-connect-sdk";
import { Icon } from "./Icon";

interface KycModuleProps {
  activeTab: string;
}

/**
 * The `KycModule` component showcases how the KYC verification process with the Keyring Connect SDK can be implemented.
 * The `KycModule` is used in the `XLendAppInterface` component for demo purposes.
 *
 * @param {string} activeTab - The current active tab in the KYC verification process.
 * NOTE: We use `activeTab` to step through the KYC verification process for demo purposes.
 * In a production use case, the KYC verification process would progress automatically based on the user's actions.
 */
export function KycModule({ activeTab }: KycModuleProps) {
  const [isInstalled, setIsInstalled] = useState<boolean | undefined>(
    undefined
  );
  const [extensionState, setExtensionState] = useState<ExtensionState | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

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
  }, []);

  // LAUNCH THE EXTENSION
  const launchExtension = async () => {
    try {
      const exmapleConfig = {
        app_url: window.location.origin,
        name: "xLend",
        logo_url: `${window.location.origin}/xlend-icon.svg`,
        policy_id: 7, // Example policy ID
      };
      // NOTE: `KeyringConnect.launchExtension` takes care of checking if the extension is installed.
      // If the extension is not installed, the user will be redirected to the extension's install page.
      // The user gets redirected back to the app after the extension is installed.
      // If the extension is installed, the extension will be launched and the user can start the KYC verification process.
      await KeyringConnect.launchExtension(exmapleConfig);
    } catch (error) {
      console.error("Failed to launch extension:", error);
    }
  };

  // CHECK VERIFICATION STATUS
  const checkStatus = async () => {
    setIsLoading(true);
    try {
      // The `extensionState.user.credential_status` can be used to check if the user has a valid credential.
      // NOTE: The `credential_status` is only available if the user has completed the KYC verification process was launched through the `launchExtension` function.
      // The recommended approach is to fetch the credential status directly from chain via an RPC call, and display the status to the user independently of the `extensionState.user?.credential_status`.
      const state = await KeyringConnect.getExtensionState();
      setExtensionState(state);
    } catch (error) {
      console.error("Failed to check status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const MainCtaButton = ({ isVerified }: { isVerified: boolean }) => {
    return (
      <Button
        className="w-full mt-6"
        disabled={!isVerified}
        variant={isVerified ? "default" : "secondary"}
      >
        {isVerified ? "Lend" : "Complete KYC to continue"}
      </Button>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "install":
        return (
          <>
            <h3 className="font-medium text-gray-900">
              KYC Verification Required
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Install the Keyring extension to complete identity verification.
            </p>
            <Button
              className="mt-3"
              onClick={launchExtension}
              disabled={isLoading}
            >
              Install Extension
            </Button>
            <div className="mt-2 text-xs text-gray-500">
              Status: {isInstalled ? "Installed" : "Not Installed"}
            </div>
          </>
        );
      case "start":
        return (
          <>
            <h3 className="font-medium text-gray-900">
              Complete KYC Verification
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Verify your identity to access lending features.
            </p>
            <Button
              className="mt-3"
              onClick={launchExtension}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              Start Verification
            </Button>
          </>
        );
      case "progress":
        return (
          <>
            <h3 className="font-medium text-gray-900">
              Verification In Progress
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              We&apos;re verifying your identity. This may take a few minutes.
            </p>
            <div className="flex gap-2 mt-3">
              <Button onClick={checkStatus} disabled={isLoading}>
                {isLoading ? (
                  <Loader className="h-4 w-4 mr-2 animate-spin " />
                ) : null}
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
          </>
        );
      case "completed":
        return (
          <>
            <h3 className="font-medium text-gray-900">Verification Complete</h3>
            <p className="text-sm text-gray-600 mt-1">
              Your identity has been verified. You can now access all platform
              features.
            </p>
            {extensionState?.user && (
              <div className="mt-2 text-xs text-gray-500">
                Wallet Address: {extensionState.user.wallet_address}
                ...
              </div>
            )}
            <div className="flex items-center gap-1 mt-4 text-xs">
              <span className="font-medium">Provided by Keyring</span>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div
        className={`p-6 border rounded-lg ${
          activeTab === "completed"
            ? "bg-green-50 border-green-200"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-start gap-4">
          <Icon activeTab={activeTab} />

          {/* Content based on the active tab */}
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
      <MainCtaButton isVerified={activeTab === "completed"} />
    </>
  );
}
