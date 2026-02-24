export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side */}
      <div className="hidden md:flex bg-brand-yellow items-center justify-center p-12">
        <div className="max-w-md space-y-3">
          <h1 className="text-5xl font-bold text-brand-graphite">WorkNotes</h1>
          <p className="text-xl text-brand-black">
            Capture ideas. Track progress. Build consistency.
          </p>
          <p className="text-lg text-brand-black opacity-80 ">
            A focused workspace for builders who value clarity and discipline.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-6 dark:bg-background bg-background">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
