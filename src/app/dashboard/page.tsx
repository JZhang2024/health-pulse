import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { Navigation } from "@/components/ui/Navigation";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
        <Navigation />
        <div className="min-h-screen backdrop-blur-sm py-4 sm:py-8 px-3 sm:px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-4 sm:mb-6"></div>
                {/* Remove grid in favor of flex column layout */}
                <DashboardClient />
            </div>
        </div>
    </div>
);
}
