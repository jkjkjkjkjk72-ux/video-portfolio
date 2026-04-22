import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-6">
      <div className="mb-10 text-center">
        <p className="font-mono-meta text-gray-400 dark:text-gray-600 mb-2">Admin</p>
        <h1 className="text-2xl font-bold tracking-tight">Studio</h1>
      </div>
      <LoginForm />
    </div>
  );
}
