import ChangePasswordForm from "@/components/modules/auth/ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Change Password</h1>
          <p className="text-muted-foreground">
            Enter your old and new password to update
          </p>
        </div>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
