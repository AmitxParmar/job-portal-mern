const Sidebar = ({ children }) => {
  return (
    <aside className="w-[200px] bg-white border border-l-8 border-purple-500/30 my-4 rounded-3xl ml-6 p-4 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent scrollbar-thumb-rounded-full shadow-xl overflow-auto">
      {children}
    </aside>
  );
};

export default Sidebar;
