import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import WorkForm from "@/components/admin/WorkForm";

export default function NewWorkPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 font-mono-meta text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors mb-6"
        >
          <ArrowLeft size={11} strokeWidth={1.5} />
          Dashboard
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">New Work</h1>
      </div>

      <WorkForm />
    </div>
  );
}
