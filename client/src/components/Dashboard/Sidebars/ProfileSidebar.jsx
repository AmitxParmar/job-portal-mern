import { ArrowLeft } from "lucide-react";
import { Button } from "@headlessui/react";
import { profileMenu } from "@/constants";
import { useNavigate, Link } from "react-router-dom";
import Container from "../Container";

const ProfileSidebar = () => {
  const navigate = useNavigate();
  console.log("ProfileSidebar!!!!!!!");
  return (
    <Container className="max-h-full w-56">
      <Button
        varient="outline"
        onClick={() => navigate("/dashboard")}
        className="group transition-all flex flex-row items-center place-items-center text-center duration-500 hover:scale-105 rounded-full hover:bg-white px-4 py-2 justify-center border w-full hover:invert "
      >
        <ArrowLeft
          className="transition-all duration-500 ease-in-out group-hover:-translate-x-2"
          size={30}
        />
        <span className="ml-2 group">Back</span>
      </Button>
      {/* <div className="my-5">
        <img
          src="https://via.placeholder.com/150"
          alt="profile"
          className="rounded-full h-32 w-32 mx-auto bg-black"
        />
        <p className="text-center text-xl font-bold">John Doe</p>
      </div> */}
      <div className="overflow-hidden rounded-xl  flex flex-col space-y-2 py-6 mt-4 px-1">
        {profileMenu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`border w-full text-center mx-auto  rounded-full px-4 text-black border-black transition-all border-b  bg-white py-2 whitespace-nowrap relative ${
              location.pathname === item.path
                ? "border-black invert scale-15"
                : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default ProfileSidebar;
