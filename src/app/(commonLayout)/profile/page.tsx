import { getMySubscriptionStatus } from "@/services/subscription/subscription";
import { Badge } from "@/components/ui/badge"; // Assuming you have Badge component

const ProfilePage = async () => {
  const status = await getMySubscriptionStatus();
  console.log(status.data);

  return (
    <div>
      {/* Other profile info */}
      {status.success && status.data.isVerified && (
        <Badge variant="outline" className="bg-green-500 text-white">
          Verified
        </Badge>
      )}
    </div>
  );
};

export default ProfilePage;
