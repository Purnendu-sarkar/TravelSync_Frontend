import { getMyProfile } from "@/services/user/user.service";
import MyProfile from "@/components/modules/MyProfile/MyProfile";

const MyProfilePage = async () => {
  const result = await getMyProfile();
  if (!result.success) {
    return <div>{result.message}</div>;
  }

  return (
    <div className="container mx-auto mt-3 space-y-8">
      <MyProfile profile={result.data} />
    </div>
  );
};

export default MyProfilePage;
