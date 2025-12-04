"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createTraveler } from "@/services/auth/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(createTraveler, null);

  useEffect(() => {
    if (state?.success === false && state?.message) {
      toast.error(state.message);
    }

    if (state?.success === true) {
      toast.success("Traveler account created successfully!");
    }
  }, [state]);

  return (
    <form action={formAction} encType="multipart/form-data">
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input name="name" placeholder="John Doe" required />
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input name="email" type="email" required />
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel>Password</FieldLabel>
          <Input name="password" type="password" required />
        </Field>

        {/* Confirm Password */}
        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <Input name="confirmPassword" type="password" required />
        </Field>

        {/* Gender */}
        <Field>
          <FieldLabel>Gender</FieldLabel>
          <select
            name="gender"
            required
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </Field>

        {/* Location */}
        <Field>
          <FieldLabel>Location</FieldLabel>
          <Input name="location" required />
        </Field>

        {/* Profile Photo */}
        <Field className="md:col-span-2">
          <FieldLabel>Profile Photo</FieldLabel>
          <Input name="file" type="file" required />
        </Field>

        {/* Submit */}
        <Field className="md:col-span-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Traveler Account"}
          </Button>

          <FieldDescription className="text-center mt-2">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 underline">
              Login
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
