import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, LogOut } from "lucide-react";
import WorksTable from "@/components/admin/WorksTable";
import { logoutAction } from "@/app/admin/actions";

export default function DashboardPage() {
  const auth = cookies().get("admin_auth");
  if (auth?.value !== "true") redirect("/admin");

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <p className="font-mono-meta text-gray-400 dark:text-gray-600 mb-1">Admin</p>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/works/new"
            className="inline-flex items-center gap-2 font-mono-meta border border-gray-900 dark:border-gray-100 px-4 py-2.5 hover:bg-gray-900 hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all duration-200"
          >
            <Plus size={13} strokeWidth={2} />
            New Work
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 font-mono-meta text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors px-3 py-2.5"
              title="Log out"
            >
              <LogOut size={13} strokeWidth={1.5} />
              Logout
            </button>
          </form>
        </div>
      </div>

      {/* Works table */}
      <WorksTable />

      {/* Back to site */}
      <div className="mt-10">
        <Link
          href="/"
          className="font-mono-meta text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-xs"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
