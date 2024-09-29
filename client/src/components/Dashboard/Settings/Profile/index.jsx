import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BookOpen } from "lucide-react";
import Container from "../../common/Container";
import PersonalInfo from "./PersonalInfo";
import ProfessionalDetails from "./ProfessionalDetails";
import { UserRoundPen } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const { user, isLoading } = useOutletContext();

  return (
    <Tabs
      defaultValue="personal-details"
      className="px-6 overflow-  max-h-screen h-full w-full"
    >
      <TabsList className="">
        <TabsTrigger
          className="flex text-background gap-2"
          value="personal-details"
        >
          <UserRoundPen size={20} />
          <span className="">Personal Infomation</span>
        </TabsTrigger>
        <TabsTrigger
          className="flex text-background gap-2"
          value="professional-details"
        >
          <BookOpen size={20} />
          Professional Details
        </TabsTrigger>
        {/* <TabsTrigger value="account-details">Account Details</TabsTrigger> */}
      </TabsList>
      <Container
        className={`w-full max-h-[90%] min-h-full bg-background max-w-screen-2xl`}
      >
        <TabsContent className="" value="personal-details">
          <PersonalInfo user={user} isLoading={isLoading} />
        </TabsContent>
        <TabsContent className="" value="professional-details">
          <ProfessionalDetails />
        </TabsContent>
        {/* s */}
      </Container>
    </Tabs>
  );
};

export default Profile;
