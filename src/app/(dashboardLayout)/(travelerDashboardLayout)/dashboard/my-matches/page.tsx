/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMySentRequests } from "@/services/traveler/travelPlansManagement";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";

import { queryStringFormatter } from "@/lib/formatters";
import MyMatchesFilter from "@/components/modules/Traveler/MyMatches/MyMatchesFilter";
import MyMatchesTable from "@/components/modules/Traveler/MyMatches/MyMatchesTable";

const MyMatchesPage = async ({ searchParams }: { searchParams: any }) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const result = await getMySentRequests(queryString);
  const requests = result?.data?.data || [];
  const meta = result?.data?.meta;

  return (
    <div className="container mx-auto py-8 px-4">
      <ManagementPageHeader
        title="My Matches"
        description="Track all travel buddy requests you've sent"
      />

      <div className="mt-6">
        <MyMatchesFilter />
      </div>

      <div className="mt-8">
        {requests.length === 0 ? (
          <div className="text-center py-16 bg-muted/30 rounded-xl">
            <p className="text-xl text-muted-foreground">
              You have not sent any travel buddy requests yet
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Go to <strong>Explore</strong> and find your perfect travel buddy!
            </p>
          </div>
        ) : (
          <>
            <MyMatchesTable requests={requests} />
            <div className="mt-8 flex justify-center">
              <TablePagination
                currentPage={meta?.page || 1}
                totalPages={meta?.totalPages || 1}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyMatchesPage;
