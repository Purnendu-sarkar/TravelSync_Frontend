"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";

export default function TravelersFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
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
        <h3 className="font-semibold text-lg">Search Travelers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Name or Address</Label>
            <Input
              placeholder="e.g. John, New York"
              defaultValue={searchParams.get("searchTerm") || ""}
              onChange={(e) => updateSearchParams("searchTerm", e.target.value)}
            />
          </div>
          {/* Can add more filters like gender if backend supports */}
        </div>
      </div>
    </Suspense>
  );
}
