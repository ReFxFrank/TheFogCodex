import type { Metadata } from "next";
import { requireStaff, listReports } from "@/lib/staff";
import { EmptyState } from "@/components/app/empty-state";
import { StaffReportRow } from "@/components/app/staff-report-row";

export const metadata: Metadata = { title: "Staff — Reports" };

export default async function StaffReportsPage() {
  if (!(await requireStaff("moderator"))) return null;
  const reports = await listReports();

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display text-lg font-semibold text-ink">Reports</h2>
        <p className="text-sm text-ink-3">
          {reports.length} open {reports.length === 1 ? "report" : "reports"} from the community.
        </p>
      </div>

      {reports.length === 0 ? (
        <EmptyState
          title="Nothing to review"
          message="No open reports. Flagged builds and comments will show up here."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {reports.map((r) => (
            <StaffReportRow key={r.id} report={r} />
          ))}
        </div>
      )}
    </div>
  );
}
