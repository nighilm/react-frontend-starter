import { Outlet } from "react-router-dom";

import AppHeader from "@/components/common/AppHeader";
import AppSidebar from "@/components/common/AppSidebar";
import PageContainer from "@/components/common/PageContainer";

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AppHeader />

      <div className="flex">
        <AppSidebar />

        <main className="min-w-0 flex-1">
          <PageContainer>
            <Outlet />
          </PageContainer>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
