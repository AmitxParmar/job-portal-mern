import { cn } from "@/lib/utils";

const Container = ({ children, className }) => {
  return (
    <div
      className={cn(
        `w-[200px] scroll-smooth transition-all duration-300 ease-in-out bg-muted border relative h-full border-l-8 border-black my-4 rounded-3xl  p-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent scrollbar-thumb-rounded-full max-h-full shadow-xl overflow-auto`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
