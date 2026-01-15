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
import { isValidRedirectForRole } from "@/lib/auth-utils";
import { loginUser } from "@/services/auth/loginUser";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Login successful!");

      let targetRoute = state.defaultRoute;

      // need password change?
      if (state.needPasswordChange) {
        if (
          state.redirectTo &&
          isValidRedirectForRole(state.redirectTo, state.role)
        ) {
          router.push(`/reset-password?redirect=${state.redirectTo}`);
        } else {
          router.push("/reset-password");
        }
        return;
      }

      // normal redirect
      if (
        state.redirectTo &&
        isValidRedirectForRole(state.redirectTo, state.role)
      ) {
        targetRoute = state.redirectTo;
      }

      router.push(`${targetRoute}?loggedIn=true`);
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  // Auto-fill and submit for demo login
  const handleDemoLogin = (email: string, password: string) => {
    if (!formRef.current) return;

    const emailInput = formRef.current.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const passwordInput = formRef.current.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;

    if (emailInput && passwordInput) {
      emailInput.value = email;
      passwordInput.value = password;

      // Trigger form submission
      formRef.current.requestSubmit();
    }
  };

  return (
    <form ref={formRef} action={formAction}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              //   required
            />

            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              //   required
            />
            <InputFieldError field="password" state={state} />
          </Field>
        </div>

        {/* Demo Buttons – Only show in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                handleDemoLogin(
                  process.env.NEXT_PUBLIC_DEMO_USER_EMAIL || "",
                  process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD || ""
                )
              }
              disabled={isPending}
            >
              Login as User
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                handleDemoLogin(
                  process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL || "",
                  process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || ""
                )
              }
              disabled={isPending}
            >
              Login as Admin
            </Button>
          </div>
        )}

        <FieldGroup className="mt-6">
          <Field>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <FieldDescription className="px-6 text-center mt-4">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </FieldDescription>
            <FieldDescription className="px-6 text-center">
              <a
                href="/forget-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
