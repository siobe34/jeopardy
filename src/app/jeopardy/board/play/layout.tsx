export default function JeopardyPlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // max height of 95vh is very "magic numbery" and almost certainly breaks down in some cases
    // the 95vh is because the overall app grid is 5vh for the header and 95vh for the main content
    <div className="grid h-full max-h-[95vh] w-full grid-rows-[auto_1fr] overflow-hidden">
      {children}
    </div>
  );
}
