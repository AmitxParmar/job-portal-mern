import create from "zustand";

export const useStore = create((set) => ({
  user: {},
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
  setUser: (user) => set({ user }),
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
