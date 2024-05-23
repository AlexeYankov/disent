import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AppStateType = {
  isAppLoading: boolean;
  isAppError: boolean;
};

export type AppActions = {
  setAppLoading: (value: boolean) => void;
  setAppError: () => void;
};

// export type CounterStore = CounterState & CounterActions;
export type AppStore = AppActions & AppStateType;
export const initAppStore = (): AppStateType => {
  return { isAppLoading: true, isAppError: false,  };
};
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      isAppLoading: true,
      isAppError: false,
      // addABear: () => set({ bears: get().bears + 1 }),
      setAppLoading: (value: boolean) => {
        return set({ isAppLoading: value });
      },
      setAppError: () =>
        set({ isAppError: (get().isAppError = !get().isAppError) }),
    }),
    {
      name: 'app-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      //   skipHydration: true,
    }
  )
);