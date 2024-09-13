import { cn } from "@/lib/utils";

const Container = ({ children, className }) => {
  return (
    <div
      className={cn(
        `w-[200px] scroll-smooth transition-all duration-300 ease-in-out bg-white border h-full border-l-8 border-black my-4 rounded-3xl ml-6 p-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent scrollbar-thumb-rounded-full max-h-[calc(100vh-200px)] shadow-xl overflow-auto`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
