import { useSearchParams } from "react-router-dom";
import { fetchJobs } from "@/services/JobServices";
import { useQuery } from "@tanstack/react-query";

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
  const jobQuery = useQuery({
    queryKey: ["jobs", filters], // Including filters as part of the query key
    queryFn: () => fetchJobs(filters),
    keepPreviousData: true, // Keeps the previous data while fetching new data, might use for infinite query
    staleTime: 5000, // Optional: to avoid too frequent refetching
  });
  return {
    jobQuery,
    filters,
    setFilter,
    clearFilters,
  };
};
