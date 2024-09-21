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

export { profileMenu };
