"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createTravelPlan } from "@/services/traveler/travelPlansManagement";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const TravelPlanForm = () => {
  const [state, formAction, isPending] = useActionState(createTravelPlan, null);

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "Travel plan created successfully!");
      } else if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Destination */}
          <Field>
            <FieldLabel htmlFor="destination">Destination</FieldLabel>
            <Input
              id="destination"
              name="destination"
              type="text"
              placeholder="e.g., Paris"
            />
            <InputFieldError field="destination" state={state} />
          </Field>
          {/* Start Date */}
          <Field>
            <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
            <Input id="startDate" name="startDate" type="date" />
            <InputFieldError field="startDate" state={state} />
          </Field>
          {/* End Date */}
          <Field>
            <FieldLabel htmlFor="endDate">End Date</FieldLabel>
            <Input id="endDate" name="endDate" type="date" />
            <InputFieldError field="endDate" state={state} />
          </Field>
          {/* Budget */}
          <Field>
            <FieldLabel htmlFor="budget">Budget</FieldLabel>
            <Input
              id="budget"
              name="budget"
              type="number"
              placeholder="e.g., 5000"
              step="0.01"
            />
            <InputFieldError field="budget" state={state} />
          </Field>
          {/* Travel Type */}
          <Field>
            <FieldLabel htmlFor="travelType">Travel Type</FieldLabel>
            <select
              id="travelType"
              name="travelType"
              className="border p-2 rounded w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Select Travel Type
              </option>
              <option value="ADVENTURE">Adventure</option>
              <option value="LEISURE">Leisure</option>
              <option value="BUSINESS">Business</option>
              <option value="FAMILY">Family</option>
              <option value="SOLO">Solo</option>
            </select>
            <InputFieldError field="travelType" state={state} />
          </Field>
        </div>
        {/* Itinerary */}
        <Field className="mt-4">
          <FieldLabel htmlFor="itinerary">Itinerary</FieldLabel>
          <textarea
            id="itinerary"
            name="itinerary"
            className="border p-2 rounded w-full"
            rows={4}
            placeholder="Detailed plan..."
          />
          <InputFieldError field="itinerary" state={state} />
        </Field>
        {/* Description */}
        <Field className="mt-4">
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <textarea
            id="description"
            name="description"
            className="border p-2 rounded w-full"
            rows={4}
            placeholder="Additional details..."
          />
          <InputFieldError field="description" state={state} />
        </Field>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating Plan..." : "Create Travel Plan"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default TravelPlanForm;
