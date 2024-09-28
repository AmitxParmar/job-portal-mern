import { useSearchParams } from "react-router-dom";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilter = (newFilters) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    for (const key in newFilters) {
      if (newFilters[key] === "" || newFilters[key] === null) {
        updatedSearchParams.delete(key);
      } else {
        updatedSearchParams.set(key, newFilters[key]);
      }
    }
    setSearchParams(updatedSearchParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const filters = Object.fromEntries(
    new URLSearchParams(searchParams.toString()).entries()
  );

  return {
    filters,
    setFilter,
    clearFilters,
  };
};
