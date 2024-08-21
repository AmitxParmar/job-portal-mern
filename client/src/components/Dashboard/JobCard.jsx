import { Button } from "@headlessui/react";
import { Bookmark } from "lucide-react";

const JobCard = ({ name }) => {
  return (
    <div className="p-2 border border-gray-400 rounded-2xl shadow-lg w-full sm:w-64 md:w-72 lg:w-80 min-h-[350px] justify-between bg-white flex flex-col m-2">
      <div className="bg-orange-100 rounded-2xl p-4 w-full">
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm rounded-full bg-white text-center align-center py-2 px-3 font-bold text-black">
            20 May, 2023
          </p>
          <Button className="bg-white rounded-full p-3 hover:bg-slate-400/55">
            <Bookmark size={20} fill="black" />
          </Button>
        </div>
        <h3 className="text-lg font-semibold mt-2">{name}</h3>
        <p className="text-gray-500">Amazon</p>
        <div className="mt-4 flex flex-row flex-wrap space-x-2 items-center">
          <span className="bg-white px-3 font-bold py-2 rounded-full text-xs">
            Part time
          </span>
          <span className="bg-white px-3 font-bold py-2 rounded-full text-xs">
            Senior Level
          </span>
        </div>
      </div>
      <div className="px-4 py-2 grid grid-cols-2">
        <div>
          <div className="mt-4 text-gray-700">$250/hr</div>
          <div className="text-gray-500">San Francisco, CA</div>
        </div>

        <button className="mt-4 bg-black text-white p-2 rounded-full">
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
