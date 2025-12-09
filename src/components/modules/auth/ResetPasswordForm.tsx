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
import { resetPassword } from "@/services/auth/auth.service";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const ResetPasswordForm = ({
  token,
  id,
  redirect,
}: {
  token?: string;
  id?: string;
  redirect?: string;
}) => {
  const [state, formAction, isPending] = useActionState(resetPassword, null);
  const [clientError, setClientError] = useState<string | null>(null);

  useEffect(() => {
    if (!state) return;

    // ❌ Error Toast
    if (!state.success && state.message) {
      toast.error(state.message);
    }

    // ✅ Success Toast + Redirect
    if (state.success) {
      toast.success(state.message || "Password reset successful ✅");

      setTimeout(() => {
        window.location.href = state.redirectTo || "/login";
      }, 1000); // 1s delay so user can see toast
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setClientError("Passwords do not match");
      return;
    }

    setClientError(null);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {token && <Input type="hidden" name="token" value={token} />}
      {id && <Input type="hidden" name="id" value={id} />}
      {redirect && <Input type="hidden" name="redirect" value={redirect} />}
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
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

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
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
              {isPending ? "Resetting..." : "Reset Password"}
            </Button>

            <FieldDescription className="px-6 text-center mt-4">
              Remember your password?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Back to Login
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default ResetPasswordForm;
