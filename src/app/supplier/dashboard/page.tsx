import { Suspense } from "react";
import { DashboardClient } from "./dashboard-client";
import { getDashboardStatsAction } from "@/actions/supplier/dashboard/get-dashboard-stats-action";
import { getSupplierLeadsAction } from "@/actions/supplier/dashboard/get-supplier-leads-action";

interface SearchParams {
  search?: string;
  page?: string;
}

interface DashboardPageProps {
  searchParams: Promise<SearchParams>;
}

async function DashboardData({ searchParams }: DashboardPageProps) {
  const searchParamsData = await searchParams;

  const searchQuery = searchParamsData.search;
  const page = parseInt(searchParamsData.page || "1");

  // Fetch data on server
  const [statsResult, leadsResult] = await Promise.all([
    getDashboardStatsAction(),
    getSupplierLeadsAction(searchQuery, page, 50)
  ]);

  return (
    <DashboardClient 
      initialStats={statsResult}
      initialLeads={leadsResult.leads}
      initialTotal={leadsResult.total}
      initialSearchQuery={searchQuery || ""}
    />
  );
}

function DashboardLoading() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="h-8 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default function SupplierDashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#000000]">Tableau de bord</h1>
          <p className="text-gray-600 mt-2">
            Suivez vos performances et gérez vos leads efficacement
          </p>
        </div>
        
        <Suspense fallback={<DashboardLoading />}>
          <DashboardData searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
