import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface RangeFilter {
    startInterval: string;
    endInterval: string;
}

interface FilterStore {
    globalFilter: string;
    rangeFilter?: RangeFilter;
    setGlobalFilter: (filter: string) => void;
    setRangeFilter: (filter: RangeFilter | undefined) => void; 
    removeLocalDateFilter: () => void;
}

const filterState: StateCreator<FilterStore> = (set) => ({
    globalFilter: '',
    rangeFilter: undefined,
    setGlobalFilter: (filter) => set({ globalFilter: filter }),
    setRangeFilter: (filter) => set({ rangeFilter: filter }),
    removeLocalDateFilter: () => set({ rangeFilter: undefined })
});

const useFilterStore = create<FilterStore>()(devtools(filterState));

export default useFilterStore;
