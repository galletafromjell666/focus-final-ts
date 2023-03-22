import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface FilterDate {
    startInterval: string;
    endInterval: string;
}

interface State {
    globalFilter: string;
    localDateFilter?: FilterDate;
    setGlobalFilter: (filter: string) => void;
    setLocalDateFilter: (filter: FilterDate | undefined) => void;
    removeLocalDateFilter: () => void;
}

const filterState: StateCreator<State> = (set) => ({
    globalFilter: '',
    localDateFilter: undefined,
    setGlobalFilter: (filter) => set({ globalFilter: filter }),
    setLocalDateFilter: (filter) => set({ localDateFilter: filter }),
    removeLocalDateFilter: () => set({ localDateFilter: undefined })
});

const useFiltersStore = create<State>()(devtools(filterState));

export default useFiltersStore;
