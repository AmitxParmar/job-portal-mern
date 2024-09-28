import create from "zustand";

// Create Zustand store
export const useFilterStore = create((set) => ({
  filters: {
    company: "",
    title: "",
    location: "",
    jobType: "",
    workFrom: "",
    experience: "",
    skills: "",
    salaryMin: "",
    salaryMax: "",
    postedAfter: "",
    status: "",
  },
  setFilter: (filterName, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: value,
      },
    })),
  resetFilters: () =>
    set({
      filters: {
        company: "",
        title: "",
        location: "",
        jobType: "",
        workFrom: "",
        experience: "",
        skills: "",
        salaryMin: "",
        salaryMax: "",
        postedAfter: "",
        status: "",
      },
    }),
}));
