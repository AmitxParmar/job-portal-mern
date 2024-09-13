import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  return (
    <Tabs defaultValue="account" className="">
      <TabsList>
        <TabsTrigger value="personal-details">Personal Infomation</TabsTrigger>
        <TabsTrigger value="professional-details">
          Professional Details
        </TabsTrigger>
        <TabsTrigger value="account-details">Account Details</TabsTrigger>
      </TabsList>
      <TabsContent value="personal-details">
        <Personal />
      </TabsContent>
      <TabsContent value="professional-details">
        2. Professional Details Skills: profile.skills Experience:
        profile.experience Education: profile.education Resume:
        profile.resumeUrl Portfolio Links: profile.portfolioLinks
      </TabsContent>
      <TabsContent value="account-details">
        3. Account Details Role: role Is Verified: isVerified Invite Code Used:
        inviteCodeUsed
      </TabsContent>
    </Tabs>
  );
};

export default Profile;

const Personal = () => {
  return (
    <>
      <div className="border-b-4 flex  flex-row justify-between px-5 items-baseline">
        <h3 className="text-3xl py-2">Profile Information</h3>
      </div>
      <div className="border h-full p-4 m-4 rounded-xl flex flex-row">
        <div className="flex gap-5 items-center justify-start py-4 w-1/2  flex-row">
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            className="w-28 p-2 h-28 rounded-full"
          />
          <div className="flex p-4 flex-col">
            <p className="text-xl font-bold">John Doe</p>
            <p className="text-lg">Software Engineer</p>
            <p className="text-lg">San Francisco, CA</p>
            <p className="text-lg">email@email.com</p>
          </div>
        </div>
        <div className="flex w-1/2 items-center p-4 flex-row-reverse">
          <Button size="icon" variant="ghost">
            <Edit className="inline-flex justify-end" />
          </Button>
        </div>
      </div>
    </>
  );
};
