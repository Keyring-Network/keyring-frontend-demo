import { ShieldCheck, Blocks, UserIcon } from "lucide-react";

export function Icon({ activeTab }: { activeTab: string }) {
  const renderIcon = () => {
    switch (activeTab) {
      case "install":
        return (
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Blocks className="h-6 w-6 text-gray-500" />
          </div>
        );
      case "start":
        return (
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-gray-500" />
          </div>
        );
      case "progress":
        return (
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin border-blue-500"></div>
            <UserIcon className="h-6 w-6 text-gray-500" />
          </div>
        );
      case "completed":
        return (
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-green-600" />
          </div>
        );
    }
  };

  return <div className="flex-shrink-0">{renderIcon()}</div>;
}
