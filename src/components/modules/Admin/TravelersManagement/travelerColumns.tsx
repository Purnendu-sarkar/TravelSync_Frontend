"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { ITraveler } from "@/types/traveler.interface";

export const travelersColumns: Column<ITraveler>[] = [
  {
    header: "Traveler",
    accessor: (traveler) => (
      <UserInfoCell
        name={traveler.name ?? "N/A"}
        email={traveler.email}
        photo={traveler.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Gender",
    accessor: (traveler) => (
      <span className="text-sm capitalize">
        {traveler.gender?.toLowerCase() || "N/A"}
      </span>
    ),
  },
  {
    header: "Address",
    accessor: (traveler) => (
      <span className="text-sm">{traveler.address || "N/A"}</span>
    ),
  },
  {
    header: "Status",
    accessor: (traveler) => (
      <StatusBadgeCell email={traveler.email} status={traveler.status} />
    ),
  },
  {
    header: "Joined",
    accessor: (traveler) => <DateCell date={traveler.createdAt} />,
    sortKey: "createdAt",
  },
];
