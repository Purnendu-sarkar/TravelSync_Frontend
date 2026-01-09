/* eslint-disable @typescript-eslint/no-explicit-any */
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import SearchFilter from "@/components/shared/SearchFilter";

import { queryStringFormatter } from "@/lib/formatters";
import { getMyGivenReviews } from "@/services/review/review.service";
import MyGivenReviewsTable from "@/components/modules/Traveler/MyReviews/MyGivenReviewsTable";

const MyReviewsPage = async ({ searchParams }: { searchParams: any }) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const result = await getMyGivenReviews(queryString);
  const reviews = Array.isArray(result?.data?.reviews)
    ? result?.data?.reviews
    : [];
  const meta = result?.data?.meta || { page: 1, totalPages: 1 };

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="My Given Reviews"
        description="Manage the reviews you've given to others"
      />
      <SearchFilter placeholder="Search by destination or comment..." />
      <MyGivenReviewsTable reviews={reviews} />
      <TablePagination currentPage={meta.page} totalPages={meta.totalPages} />
    </div>
  );
};

export default MyReviewsPage;
