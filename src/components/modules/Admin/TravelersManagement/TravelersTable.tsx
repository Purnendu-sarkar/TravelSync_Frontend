"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { ITraveler } from "@/types/traveler.interface";
import { travelersColumns } from "./travelerColumns";

interface TravelersTableProps {
  travelers: ITraveler[];
}

const TravelersTable = ({ travelers }: TravelersTableProps) => {
  return (
    <>
      <ManagementTable
        data={travelers}
        columns={travelersColumns}
        getRowKey={(traveler) => traveler.id!}
        emptyMessage="No travelers found"
      />
    </>
  );
};
export default TravelersTable;
