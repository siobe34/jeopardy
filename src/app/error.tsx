"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="flex flex-col items-center justify-start">
      <div className="space-y-8 pt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          Yikes, something went wrong!
        </h2>
        <p>{error.message}</p>
      </div>
    </main>
  );
}
