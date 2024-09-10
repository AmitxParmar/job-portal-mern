const Sidebar = ({ children, classNames }) => {
  return (
    <aside
      className={`w-[200px] scroll-smooth transition-all duration-300 ease-in-out bg-white border border-l-8 border-black my-4 rounded-3xl ml-6 p-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent scrollbar-thumb-rounded-full shadow-xl overflow-auto ${classNames}`}
    >
      {children}
    </aside>
  );
};

export default Sidebar;
