import React from "react";
import { useQuery } from "react-query";
import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import SiteTable from "@/components/SiteTable";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import { getSites } from "@/utils/fetcher";

const Dashboard = () => {
  const { data } = useQuery(["sites"], getSites);
  const sites = data?.sites;

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {sites.length ? <SiteTable sites={sites} /> : <EmptyState />}
    </DashboardShell>
  );
};
export default Dashboard;
