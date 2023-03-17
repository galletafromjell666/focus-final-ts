import { create, StateCreator } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

interface User {
    //refractor this, i have the same interface on loginFunction... and also need all the fields.
    id?: string;
    username: string;
    password: string;
}

interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
    removeUser: () => void;
}

const userState: StateCreator<UserStore> = (set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
    removeUser: () => set({ user: null })
});

const useUserStore = create<UserStore>()(
    persist(devtools(userState), {
        name: 'user-store',
        storage: createJSONStorage(() => sessionStorage)
    })
);

export default useUserStore;
