import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (updates) =>
    set((state) => ({ user: { ...state.user, ...updates } })),
}));

export default useUserStore;
