import React from "react";
import { useQuery } from "react-query";
import DashboardShell from "@/components/DashboardShell";
import SiteTable from "@/components/SiteTable";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import SiteEmptyState from "@/components/SiteEmptyState";
import SiteTableHeader from "@/components/SiteTableHeader";
import { useAuth } from "@/lib/auth";
import { getSites } from "@/utils/fetcher";

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useQuery(["sites"], () => getSites(user.token), {
    enabled: Boolean(user),
  });

  const isPaidAccount = true;

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  if (data.sites.length) {
    return (
      <DashboardShell>
        <SiteTableHeader isPaidAccount={isPaidAccount} />
        <SiteTable sites={data.sites} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader isPaidAccount={isPaidAccount} />
      <SiteEmptyState />
    </DashboardShell>
  );
};
export default Dashboard;
