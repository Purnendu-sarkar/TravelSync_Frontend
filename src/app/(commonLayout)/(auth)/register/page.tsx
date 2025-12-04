import RegisterForm from "@/components/modules/auth/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Create Traveler Account</CardTitle>
            <CardDescription>
              Join Travel Sync & Meetup Platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
