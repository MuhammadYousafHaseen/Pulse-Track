import { Suspense } from "react";
import AdminDashboardWrapper from "@/components/admin-dashboard/dashboard/admin-dashboard-wrapper";

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div>Loading admin dashboard...</div>}>
      <AdminDashboardWrapper />
    </Suspense>
  );
}