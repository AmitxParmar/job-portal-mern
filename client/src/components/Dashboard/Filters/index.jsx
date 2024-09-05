const Filters = () => {
  return (
    <>
      {/* <!-- Filters content here --> */}
      <h2 className="font-semibold text-3xl mb-4">Filters</h2>
      {/* <!-- Add filter items here --> */}
      {/* <ScrollArea>asd</ScrollArea> */}
      <div className="">
        Use the searchbar at the bottom to ask questions. Phind will
        automatically try to use your codebase to answer. Type @ specify
        files/code in your query. Type @web_search to do a web search. Enable
        Autocompleteurrent selection. Ctrl/Cmd + Shift + I with code selected to
        add it to the existing chat. Ctrl/Cmd + Shift + M with code selected to
        rewrite the selection based on your instructions. Ctrl + Enter to search
        using your whole codebase. Ctrl/Cmd + Shift + L to ask phind aUse the
        searchbar at the bottom to ask questions. Phind will automatically try
        to use your codebase to answer. Type @ specify files/code in your query.
        Type @web_search to do a web search. Enable Autocomplete: Cmd+Shift+P
        -with Ctrl/Cmd + I to start a new chat with your current selection.
        Ctrl/Cmd + Shift + I with code selected to add it to the existing chat.
      </div>
    </>
  );
};

export default Filters;
