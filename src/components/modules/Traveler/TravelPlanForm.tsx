"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import {
  createTravelPlan,
  updateTravelPlanAction,
} from "@/services/traveler/travelPlansManagement";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ITravelPlan } from "@/types/travelPlan.interface";

interface TravelPlanFormProps {
  initialData?: Partial<ITravelPlan>;
  isEditMode?: boolean;
  onSuccess?: () => void;
}

const TravelPlanForm = ({
  initialData,
  isEditMode = false,
  onSuccess,
}: TravelPlanFormProps) => {
  const [state, formAction, isPending] = useActionState(
    isEditMode ? updateTravelPlanAction : createTravelPlan,
    null
  );

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(
          state.message || `${isEditMode ? "Updated" : "Created"} successfully!`
        );
        if (onSuccess) onSuccess();
      } else if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state, isEditMode, onSuccess]);

  return (
    <form action={formAction}>
      {isEditMode && initialData?.id && (
        <input type="hidden" name="id" value={initialData?.id} />
      )}
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Destination */}
          <Field>
            <FieldLabel htmlFor="destination">Destination</FieldLabel>
            <Input
              id="destination"
              name="destination"
              type="text"
              defaultValue={initialData?.destination}
              placeholder="e.g., Paris"
            />
            <InputFieldError field="destination" state={state} />
          </Field>
          {/* Start Date */}
          <Field>
            <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              defaultValue={initialData?.startDate?.split("T")[0] || ""}
            />
            <InputFieldError field="startDate" state={state} />
          </Field>

          {/* End Date */}
          <Field>
            <FieldLabel htmlFor="endDate">End Date</FieldLabel>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              defaultValue={initialData?.endDate?.split("T")[0] || ""}
            />
            <InputFieldError field="endDate" state={state} />
          </Field>

          {/* Budget */}
          <Field>
            <FieldLabel htmlFor="budget">Budget</FieldLabel>
            <Input
              id="budget"
              name="budget"
              type="number"
              defaultValue={initialData?.budget}
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
              defaultValue={initialData?.travelType || ""}
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
            defaultValue={initialData?.itinerary}
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
            defaultValue={initialData?.description}
            placeholder="Additional details..."
          />
          <InputFieldError field="description" state={state} />
        </Field>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? `${isEditMode ? "Updating" : "Creating"}...`
                : `${isEditMode ? "Update" : "Create"} Travel Plan`}
            </Button>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default TravelPlanForm;
