import { Briefcase } from "lucide-react";
import { Bookmark } from "lucide-react";
import { User } from "lucide-react";

const profileMenu = [
  {
    name: "Profile",
    path: "/dashboard/settings",
    icon: <User />,
  },
  {
    name: "Applied Jobs",
    path: "/dashboard/settings/applied-jobs",
    icon: <Briefcase />,
  },
  {
    name: "Bookmarks",
    path: "/dashboard/settings/bookmarks",
    icon: <Bookmark />,
  },
];

export { profileMenu };
