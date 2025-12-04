import LogoutButton from "@/components/shared/LogoutButton";
import { getCookie } from "@/services/auth/tokenHandlers";
import React from "react";

export const dynamic = "force-dynamic";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const accessToken = await getCookie("accessToken");
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          {accessToken && <LogoutButton />}
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CommonDashboardLayout;
