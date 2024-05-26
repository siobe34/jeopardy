export default function JeopardyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-start">{children}</main>
  );
}
