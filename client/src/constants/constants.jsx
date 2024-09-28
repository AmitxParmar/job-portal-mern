import { Briefcase } from "lucide-react";
import { Bookmark } from "lucide-react";
import { User } from "lucide-react";

const profileMenu = [
  {
    name: "Profile",
    path: "/settings",
    icon: <User />,
  },
  {
    name: "Applied Jobs",
    path: "/settings/applied-jobs",
    icon: <Briefcase />,
  },
  {
    name: "Bookmarks",
    path: "/settings/bookmarks",
    icon: <Bookmark />,
  },
];

const achievements = {
  name: [
    "Students",
    "Global Opportunities",
    "Organization",
    "Colleges / Universities",
  ],
  achievement: [
    {
      name: "$400K",
      target: "highest grad CTC",
    },
    {
      name: "1M+",
      target: "worldwide",
    },
    {
      name: "$30M+",
      target: "per year",
    },
    {
      name: "42%",
      target: "average time saved",
    },
  ],
};
export { profileMenu, achievements };
