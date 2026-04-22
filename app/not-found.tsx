import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono-meta text-gray-400 dark:text-gray-600 mb-4">404</p>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
        Not Found
      </h1>
      <p className="font-mono text-sm text-gray-400 dark:text-gray-600 mb-10">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="group inline-flex items-center gap-2 font-mono-meta text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
      >
        <ArrowLeft
          size={11}
          strokeWidth={1.5}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        Back to home
      </Link>
    </div>
  );
}
