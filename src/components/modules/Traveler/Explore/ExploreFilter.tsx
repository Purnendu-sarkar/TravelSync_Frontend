"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";
const travelTypes = ["ADVENTURE", "LEISURE", "BUSINESS", "FAMILY", "SOLO"];
export default function ExploreFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };
  return (
   <Suspense>
     <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border space-y-4">
      <h3 className="font-semibold text-lg">Find Your Perfect Match</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Label>Destination</Label>
          <Input
            placeholder="e.g. Bali, Tokyo"
            defaultValue={searchParams.get("destination") || ""}
            onChange={(e) => updateSearchParams("destination", e.target.value)}
          />
        </div>
        <div>
          <Label>Travel Type</Label>
          <Select
            value={searchParams.get("travelType") || "all"}
            onValueChange={(v) => updateSearchParams("travelType", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All+</SelectItem>
              {travelTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Min Budget</Label>
            <Input
              type="number"
              placeholder="0"
              defaultValue={searchParams.get("minBudget") || ""}
              onChange={(e) => updateSearchParams("minBudget", e.target.value)}
            />
          </div>
          <div>
            <Label>Max Budget</Label>
            <Input
              type="number"
              placeholder="5000"
              defaultValue={searchParams.get("maxBudget") || ""}
              onChange={(e) => updateSearchParams("maxBudget", e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label>Interests (coming soon)</Label>
          <Input placeholder="Beach, Hiking..." disabled />
        </div>
      </div>
    </div>
   </Suspense>
  );
}