import SubscriptionPlans from "@/components/modules/subscription/subscription-plans";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SubscriptionPage = () => {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Subscribe to Premium</CardTitle>
            <CardDescription>
              Get verified and access premium features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionPlans />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPage;
