"use client";

import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import RefreshButton from "@/components/shared/RefreshButton";

const MyMatchesFilter = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <SearchFilter
        paramName="searchTerm"
        placeholder="Search by destination or name..."
      />
      <SelectFilter
        paramName="status"
        placeholder="Filter by status"
        options={[
          { label: "Pending", value: "PENDING" },
          { label: "Accepted", value: "ACCEPTED" },
          { label: "Rejected", value: "REJECTED" },
        ]}
      />
      <RefreshButton />
    </div>
  );
};

export default MyMatchesFilter;
