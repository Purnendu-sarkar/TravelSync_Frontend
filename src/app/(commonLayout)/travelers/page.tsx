/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPublicAllTravelers } from "@/services/user/user.service";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import TablePagination from "@/components/shared/TablePagination";
import TravelersFilter from "@/components/modules/Traveler/Travelers/TravelersFilter"; 
import TravelersGrid from "@/components/modules/Traveler/Travelers/TravelersGrid"; 
import { queryStringFormatter } from "@/lib/formatters";

const TravelersPage = async ({ searchParams }: { searchParams: any }) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const result = await getPublicAllTravelers(queryString);
  const travelers = result?.data?.data || [];
  const meta = result?.data?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return (
    <div className="container mx-auto mt-3 space-y-8">
      <div className="">
        <ManagementPageHeader
          title="Explore Travelers 🌍"
          description="Discover and connect with fellow travelers"
        >
          <RefreshButton size="default" showLabel />
        </ManagementPageHeader>
      </div>
      <TravelersFilter />
      {travelers.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">
            No travelers found. Try adjusting your search!
          </p>
        </div>
      ) : (
        <>
          <TravelersGrid travelers={travelers} />
          <div className="flex justify-center mt-8">
            <TablePagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TravelersPage;
