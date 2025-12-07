/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllMyTravelPlans } from "@/services/traveler/travelPlansManagement"; // API কল
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import TravelPlansFilter from "@/components/modules/Traveler/MyTravelPlans/TravelPlansFilter";
import TravelPlansTable from "@/components/modules/Traveler/MyTravelPlans/TravelPlansTable";
import { queryStringFormatter } from "@/lib/formatters";

const MyTravelPlansPage = async ({ searchParams }: { searchParams: any }) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const result = await getAllMyTravelPlans(queryString);
  const travelPlans = Array.isArray(result?.data?.data)
    ? result?.data?.data
    : [];
  const meta = result?.data?.meta;
  console.log("Travel Plans:", travelPlans, "Meta:", meta, result);
  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="My Travel Plans"
        description="Manage your travel plans"
      />
      <TravelPlansFilter />
      <TravelPlansTable travelPlans={travelPlans} />
      <TablePagination currentPage={meta?.page} totalPages={meta?.totalPages} />
    </div>
  );
};

export default MyTravelPlansPage;
