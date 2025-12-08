/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMatchedTravelPlans } from "@/services/traveler/travelPlansManagement";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import TablePagination from "@/components/shared/TablePagination";
import MatchesFilter from "@/components/modules/Traveler/Explore/ExploreFilter";
import MatchesGrid from "@/components/modules/Traveler/Explore/ExploreGrid";
import { queryStringFormatter } from "@/lib/formatters";
const ExplorePage = async ({ searchParams }: { searchParams: any }) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const result = await getMatchedTravelPlans(queryString);
  const matches = result?.data?.data || [];
  const meta = result?.data?.meta;
  return (
    <div className="container mx-auto mt-3 space-y-8">
      <div className="">
        <ManagementPageHeader
          title="Find Matches ✨"
          description="Find travel buddies with similar plans"
        >
          <RefreshButton size="default" showLabel />
        </ManagementPageHeader>
      </div>
      <MatchesFilter />
      {matches.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">
            No matches found yet. Try adjusting your filters!
          </p>
        </div>
      ) : (
        <>
          <MatchesGrid matches={matches} />
          <div className="flex justify-center mt-8">
            <TablePagination
              currentPage={meta?.page || 1}
              totalPages={meta?.totalPages || 1}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default ExplorePage;