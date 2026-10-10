import { LogOut } from "lucide-react";

import { useLogout } from "@/features/auth/use-logout";
import MobileNavigation from "@/components/common/MobileNavigation";

function AppHeader() {
  const { logout, isLoggingOut } = useLogout();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <MobileNavigation />

          <span className="truncate text-lg font-semibold tracking-tight text-slate-900">Web application</span>
        </div>

        <button
          type="button"
          onClick={() => logout()}
          disabled={isLoggingOut}
          className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut size={16} aria-hidden="true" />
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
