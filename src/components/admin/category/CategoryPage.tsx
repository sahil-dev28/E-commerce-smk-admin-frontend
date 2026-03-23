import { useShowMeCategory } from "@/hooks/category/useShowMeCategory";
import { CategoryTable } from "./table/category-data-table";
import { categoriesColumns } from "./table/columns-table";

function CategoriesPage() {
  const showMeCategory = useShowMeCategory();
  return (
    <div className="flex-col w-full">
      <div className="flex items-center p-8">
        <h1 className="text-2xl font-extrabold">Categories /</h1>
      </div>

      <div className="mx-10 rounded-xl min-h-fit">
        <CategoryTable
          columns={categoriesColumns}
          data={showMeCategory.data?.categories || []}
        />
      </div>
    </div>
  );
}

export default CategoriesPage;
