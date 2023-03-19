import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
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

const useUserStore = create<UserStore>()(devtools(userState));

export default useUserStore;
