import { Button } from "@headlessui/react";
import { Bookmark } from "lucide-react";

const JobCard = ({ name = "default" }) => {
  return (
    <div className="p-2 border-l-8 border border-black max-h-[360px]  hover:border hover:border-r-8 hover:shadow-xl transition-all rounded-2xl w-full sm:w-64 md:w-72 lg:w-80 min-h-[350px] justify-between bg-white flex flex-col m-2">
      <div className="bg-orange-100 border h-full max-h-full rounded-2xl p-4 w-full">
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm rounded-full bg-white text-center align-center py-2 px-3 font-bold text-black">
            20 May, 2023
          </p>
          <Button className="bg-white rounded-full p-3 hover:bg-purple-500/30">
            <Bookmark size={20} fill="black" />
          </Button>
        </div>
        <div className="mt-2">
          <p className="text-gray-500">Amazon</p>
          <h3 className="text-3xl font-semibold ">{name}</h3>
        </div>
        <div className="mt-4 bottom h-[100px] overflow-hidden flex-grow flex flex-col justify-end">
          <div className="flex flex-row-reverse flex-wrap gap-1 justify-stretch">
            <span className="px-3 font-bold py-2 border border-black shadow-sm rounded-full text-xs">
              Part time
            </span>
            <span className="border-black px-3 font-bold py-2 border  shadow-sm rounded-full text-xs">
              Senior Level
            </span>
            <span className="border-black px-3 font-bold py-2 border  shadow-sm rounded-full text-xs">
              Remote
            </span>
            <span className="border-black px-3 font-bold py-2 border  shadow-sm rounded-full text-xs">
              Full time
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 items-center flex flex-row justify-between">
        <div className="grid grid-rows-2">
          <div className="mt-4 font-bold text-gray-700">$250/hr</div>
          <div className="text-gray-500">San Francisco, CA</div>
        </div>

        <button className=" max-h-fit max-w-fit font-semibold px-4 bg-black text-white p-2 rounded-full">
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
