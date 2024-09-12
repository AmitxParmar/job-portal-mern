import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { profileMenu } from "@/constants";

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <Button
        variant=""
        onClick={() => navigate("/dashboard")}
        className="group transition-all duration-500 hover:scale-105 rounded-full px-4 py-2 border w-full hover:invert "
      >
        <ArrowLeft
          className="transition-all duration-500 ease-in-out group-hover:-translate-x-8"
          size={30}
        />
        <span className="ml-2">Back</span>
      </Button>
      <div className="my-5">
        <img
          src="https://via.placeholder.com/150"
          alt="profile"
          className="rounded-full h-32 w-32 mx-auto bg-black"
        />
        <p className="text-center text-xl font-bold">John Doe</p>
      </div>
      <div className="overflow-hidden rounded-xl flex flex-col space-y-2 py-6 mt-4 px-1">
        {profileMenu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`border w-full text-center mx-auto border-black rounded-full px-4 py-2 whitespace-nowrap relative ${
              location.pathname === item.path ? "bg-purple-500/30" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
