import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { profileMenu } from "@/constants/constants.jsx";
import PostAJobButton from "../../EmployerComponents/PostAJobButton";
import { Home } from "lucide-react";

const SettingsSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Added useLocation to fix the disallowed MIME type issue
  let role = "employer";

  return (
    <>
      {location.pathname.startsWith("/settings") ? (
        <Button
          variant="outline" // Fixed typo from "varient" to "variant"
          onClick={() => navigate("/dashboard")}
          className="group transition-all flex flex-row items-center place-items-center text-center duration-500 hover:scale-105 rounded-full hover:bg-white px-4 py-2 justify-center border w-full hover:invert "
        >
          <ArrowLeft
            className="transition-all duration-500 ease-in-out group-hover:-translate-x-2"
            size={30}
          />
          <span className="ml-2 group">Back</span>
        </Button>
      ) : location.pathname === "/dashboard" ? (
        <PostAJobButton />
      ) : null}
      {/* <div className="my-5">
        <img
          src="https://via.placeholder.com/150"
          alt="profile"
          className="rounded-full h-32 w-32 mx-auto bg-black"
        />
        <p className="text-center text-xl font-bold">John Doe</p>
      </div> */}
      <div className="font-grotesk font-semibold overflow-hidden rounded-xl flex flex-col space-y-2 py-6 mt-4 px-1">
        {role === "employer" && (
          <Link
            to={"/dashboard"}
            className={`border w-full text-center mx-auto rounded-full px-4 text-black items-center min-w-max border-black transition-all border-b bg-white py-2 whitespace-nowrap relative ${
              location.pathname === "/dashboard"
                ? "border-black invert scale-15"
                : ""
            }`}
          >
            <span className="flex flex-row items-center  p-1">
              <span className="mr-3 ">
                <Home />
              </span>
              <span className="">Dashboard</span>
            </span>
          </Link>
        )}
        {profileMenu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`border w-full text-center mx-auto rounded-full px-4 text-black items-center min-w-max border-black transition-all border-b bg-white py-2 whitespace-nowrap relative ${
              location.pathname === item.path
                ? "border-black invert scale-15"
                : ""
            }`}
          >
            <span className="flex flex-row items-center  p-1">
              <span className="mr-3 ">{item.icon}</span>
              <span className="">{item.name}</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SettingsSidebar;
