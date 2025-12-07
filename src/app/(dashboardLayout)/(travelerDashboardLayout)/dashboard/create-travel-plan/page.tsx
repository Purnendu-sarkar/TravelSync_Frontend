import TravelPlanForm from "@/components/modules/Traveler/TravelPlanForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreateTravelPlanPage = () => {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Create New Travel Plan</CardTitle>
            <CardDescription>
              Plan your next adventure with Travel Sync
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TravelPlanForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTravelPlanPage;
