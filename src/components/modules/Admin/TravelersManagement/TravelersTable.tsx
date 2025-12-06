"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { ITraveler } from "@/types/traveler.interface";
import { travelersColumns } from "./travelerColumns";
import { useState } from "react";
import TravelerViewDetailDialog from "./TravelerViewDetailDialog";

interface TravelersTableProps {
  travelers: ITraveler[];
}

const TravelersTable = ({ travelers }: TravelersTableProps) => {
  const [viewingTraveler, setViewingTraveler] = useState<ITraveler | null>(
    null
  );

  const handleView = (traveler: ITraveler) => {
    setViewingTraveler(traveler);
  };

  return (
    <>
      <ManagementTable
        data={travelers}
        columns={travelersColumns}
        onView={handleView}
        getRowKey={(traveler) => traveler.id!}
        emptyMessage="No travelers found"
      />

      <TravelerViewDetailDialog
        open={!!viewingTraveler}
        onClose={() => setViewingTraveler(null)}
        traveler={viewingTraveler}
      />
    </>
  );
};
export default TravelersTable;
