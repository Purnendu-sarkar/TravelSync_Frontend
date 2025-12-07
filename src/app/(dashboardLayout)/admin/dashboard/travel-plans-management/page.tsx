/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllTravelPlans } from "@/services/admin/travelPlansManagement";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import TravelPlansFilter from "@/components/modules/Admin/TravelPlansManagement/TravelPlansFilter";
import TravelPlansTable from "@/components/modules/Admin/TravelPlansManagement/TravelPlansTable";
import { queryStringFormatter } from "@/lib/formatters";

const TravelPlansManagementPage = async ({
  searchParams,
}: {
  searchParams: any;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const result = await getAllTravelPlans(queryString);
  const travelPlans = Array.isArray(result?.data?.data)
    ? result?.data?.data
    : [];
  const meta = result?.data?.meta;
  console.log("Travel Plans:", travelPlans, "Meta:", meta, result);

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Travel Plans Management"
        description="Manage all travel plans"
      />
      <TravelPlansFilter />
      <TravelPlansTable travelPlans={travelPlans} />
      <TablePagination currentPage={meta?.page} totalPages={meta?.totalPages} />
    </div>
  );
};

export default TravelPlansManagementPage;
