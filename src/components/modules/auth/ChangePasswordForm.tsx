/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/services/auth/auth.service";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const ChangePasswordForm = () => {
  const [state, formAction, isPending] = useActionState(changePassword, null);
  const [clientError, setClientError] = useState<string | null>(null);

  useEffect(() => {
    if (!state) return;

    // ❌ Error Toast
    if (!state.success && state.message) {
      toast.error(state.message);
    }

    // ✅ Success Toast + Redirect to Dashboard
    if (state.success) {
      toast.success(state.message || "Password changed successfully ✅");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setClientError("New passwords do not match");
      return;
    }

    setClientError(null);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Old Password */}
          <Field>
            <FieldLabel htmlFor="oldPassword">Old Password</FieldLabel>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Enter old password"
              autoComplete="current-password"
            />
            <InputFieldError field="oldPassword" state={state as any} />
          </Field>

          {/* New Password */}
          <Field>
            <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              autoComplete="new-password"
            />
            <InputFieldError field="newPassword" state={state as any} />
          </Field>

          {/* Confirm New Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">
              Confirm New Password
            </FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              autoComplete="new-password"
            />
            <InputFieldError field="confirmPassword" state={state as any} />
          </Field>
        </div>

        {clientError && (
          <p className="text-red-500 text-sm mt-2">{clientError}</p>
        )}

        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Changing..." : "Change Password"}
            </Button>

            <FieldDescription className="px-6 text-center mt-4">
              <a href="/dashboard" className="text-blue-600 hover:underline">
                Back to Dashboard
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default ChangePasswordForm;
