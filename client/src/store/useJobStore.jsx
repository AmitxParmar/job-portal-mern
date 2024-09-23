import create from "zustand";

export const useJobStore = create((set) => ({
  token: null,
  filters: {
    title: "",
    location: "",
    salaryRange: { min: "", max: "" },
    skillsRequired: [],
    status: "",
    postedAfter: null,
    postedBefore: null,
    jobType: "",
  },
  jobs: [],

  // Actions

  setToken: (token) => set({ token }),
  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    })),
  setJobs: (jobs) => set({ jobs }),

  resetFilters: () =>
    set({
      filters: {
        title: "",
        location: "",
        salaryRange: { min: "", max: "" },
        skillsRequired: [],
        status: "",
        postedAfter: null,
        postedBefore: null,
        jobType: "",
      },
    }),

  clearJobs: () => set({ jobs: [] }),
}));
