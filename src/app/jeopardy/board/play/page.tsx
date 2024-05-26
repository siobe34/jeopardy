import { type SearchParams } from "@/lib/global-types";

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  console.log(searchParams.id);
  return (
    // max height of 95vh is very "magic numbery" and almost certainly breaks down in some cases
    // oh and the 95vh is because the overall app grid is 5vh for the header and 95vh for the main content
    <div className="grid h-full max-h-[95vh] w-full overflow-hidden border-8 border-fuchsia-600">
      Board Id: {searchParams.id}
    </div>
  );
}
