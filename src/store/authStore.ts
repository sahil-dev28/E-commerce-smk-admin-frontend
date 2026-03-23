import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  isAuthorized: boolean;
  userId: string | null;
  email: string | null;
  login: (email: string, userId: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthorized: false,
      userId: null,
      email: null,
      login: (email: string, userId: string) => {
        set({
          isAuthorized: true,
          userId,
          email,
        });
      },
      logout: () => {
        set({
          isAuthorized: false,
          userId: null,
          email: null,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
