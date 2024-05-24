export default function JeopardyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-full overflow-hidden border-8 border-red-900">
      {children}
    </main>
  );
}
