import { useShowMeSize } from "@/hooks/size/useShowMeSize";
import { sizesColumns } from "./table/column-table";
import { SizeTable } from "./table/size-data-table";

function SizePage() {
  const showMeSize = useShowMeSize();
  return (
    <div className="flex-col w-full">
      <div className="flex items-center p-8">
        <h1 className="text-2xl font-extrabold">Sizes /</h1>
      </div>

      <div className="mx-10 rounded-xl min-h-fit">
        <SizeTable columns={sizesColumns} data={showMeSize.data?.sizes || []} />
      </div>
    </div>
  );
}

export default SizePage;
