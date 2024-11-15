import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { Navigation } from "@/components/ui/Navigation";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      <Navigation />
      <div className="min-h-screen backdrop-blur-sm py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <DashboardClient />
          </div>
        </div>
      </div>
    </div>
  );
}
