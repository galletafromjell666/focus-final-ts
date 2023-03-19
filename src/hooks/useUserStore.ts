import { create, StateCreator } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { User } from '../interfaces';

export interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
    removeUser: () => void;
}

const userState: StateCreator<UserStore> = (set) => ({
    user: null,
    setUser: (user: User | null) => {
        console.log(user);
        set({ user });
    },
    removeUser: () => set({ user: null })
});

const useUserStore = create<UserStore>()(
    persist(devtools(userState), {
        name: 'user-store',
        storage: createJSONStorage(() => sessionStorage)
    })
);

export default useUserStore;
