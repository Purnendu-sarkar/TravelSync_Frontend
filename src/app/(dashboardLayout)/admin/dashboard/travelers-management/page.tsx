/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllTravelers } from "@/services/admin/travelersManagement"; // API কল
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import TravelersFilter from "@/components/modules/Admin/TravelersManagement/TravelersFilter";
import TravelersTable from "@/components/modules/Admin/TravelersManagement/TravelersTable";
import { queryStringFormatter } from "@/lib/formatters";

const TravelersManagementPage = async ({
  searchParams,
}: {
  searchParams: any;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const result = await getAllTravelers(queryString);
  const travelers = Array.isArray(result?.data?.data) ? result?.data?.data : [];
  const meta = result?.data?.meta;
  console.log("Travelers:", travelers, "Meta:", meta, result);
  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Travelers Management"
        description="Manage all travelers"
      />
      <TravelersFilter />
      <TravelersTable travelers={travelers} />
      <TablePagination currentPage={meta?.page} totalPages={meta?.totalPages} />
    </div>
  );
};
export default TravelersManagementPage;
