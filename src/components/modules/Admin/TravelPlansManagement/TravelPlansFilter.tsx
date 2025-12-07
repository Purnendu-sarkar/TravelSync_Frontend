"use client";

import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

const TravelPlansFilter = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search travel plans..."
        />
        <RefreshButton />
      </div>
      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="destination" placeholder="Destination" />
        <SelectFilter
          paramName="travelType"
          placeholder="Travel Type"
          options={[
            { label: "Adventure", value: "ADVENTURE" },
            { label: "Leisure", value: "LEISURE" },
            { label: "Business", value: "BUSINESS" },
            { label: "Family", value: "FAMILY" },
            { label: "Solo", value: "SOLO" },
          ]}
        />
        <SearchFilter paramName="budget" placeholder="Budget" />
      </div>
    </div>
  );
};

export default TravelPlansFilter;
