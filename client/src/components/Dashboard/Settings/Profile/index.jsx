import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "../../common/Container";
import PersonalInfo from "./PersonalInfo";

const Profile = () => {
  return (
    <Tabs
      defaultValue="personal-details"
      className="px-6 overflow-hidden max-h-screen h-full w-full"
    >
      <TabsList className="">
        <TabsTrigger value="personal-details">Personal Infomation</TabsTrigger>
        <TabsTrigger value="professional-details">
          Professional Details
        </TabsTrigger>
        <TabsTrigger value="account-details">Account Details</TabsTrigger>
      </TabsList>
      <Container className={`w-full max-h-[90%] max-w-screen-2xl`}>
        <TabsContent className="" value="personal-details">
          <PersonalInfo />
        </TabsContent>
        <TabsContent className="" value="professional-details">
          2. Professional Details Skills: profile.skills Experience:
          profile.experience Education: profile.education Resume:
          profile.resumeUrl Portfolio Links: profile.portfolioLinks
        </TabsContent>
        <TabsContent value="account-details">
          3. Account Details Role: role Is Verified: isVerified Invite Code
          Used: inviteCodeUsed
        </TabsContent>
      </Container>
    </Tabs>
  );
};

export default Profile;
