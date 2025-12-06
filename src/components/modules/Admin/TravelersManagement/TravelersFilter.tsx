"use client";

import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

const TravelersFilter = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search travelers..."
        />
        <RefreshButton />
      </div>
      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="email" placeholder="Email" />
        <SelectFilter
          paramName="gender"
          placeholder="Gender"
          options={[
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
          ]}
        />
        <SelectFilter
          paramName="status"
          placeholder="Status"
          options={[
            { label: "Active", value: "ACTIVE" },
            { label: "Inactive", value: "INACTIVE" },
            { label: "Blocked", value: "BLOCKED" },
          ]}
        />
      </div>
    </div>
  );
};
export default TravelersFilter;
