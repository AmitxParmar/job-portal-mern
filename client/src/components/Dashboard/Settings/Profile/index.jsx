import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BookOpen } from "lucide-react";
import Container from "../../common/Container";
import PersonalInfo from "./PersonalInfo";
import ProfessionalDetails from "./ProfessionalDetails";
import { UserRoundPen } from "lucide-react";

const Profile = () => {
  return (
    <Tabs defaultValue="personal-details" className="px-6 w-screen h-screen ">
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
      </TabsList>
      <Container
        className={`w-full h-[calc(100dvh-18dvh)] bg-background max-w-screen-2xl`}
      >
        <TabsContent className="" value="personal-details">
          <PersonalInfo />
        </TabsContent>
        <TabsContent className="" value="professional-details">
          <ProfessionalDetails />
        </TabsContent>
      </Container>
    </Tabs>
  );
};

export default Profile;
