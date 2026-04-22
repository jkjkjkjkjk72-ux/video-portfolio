export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[var(--background)]">
      {children}
    </div>
  );
}
