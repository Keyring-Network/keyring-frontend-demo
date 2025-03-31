import { KycModule } from "@/components/demo/KycModule/index";
import { AppHeader } from "./AppHeader";
import { LendingFormMock } from "./LendingFormMock";
import { Card, CardContent } from "@/components/ui/card";
import { LendingTabsMock } from "./LendingTabsMock";

interface XLendAppInterfaceProps {
  activeTab: string;
}

export function XLendAppInterface({ activeTab }: XLendAppInterfaceProps) {
  return (
    <div className="bg-blue-100/50 min-h-[700px]">
      <AppHeader />
      <div className="flex justify-center items-center py-8 px-4">
        <div className="w-full max-w-xl">
          <Card className="bg-white rounded-xl shadow-lg overflow-hidden">
            <CardContent className="p-4 pb-0">
              <LendingTabsMock />
              <LendingFormMock activeTab={activeTab} />

              {/* KYC Module - The main focus of the demo */}
              <KycModule activeTab={activeTab} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
