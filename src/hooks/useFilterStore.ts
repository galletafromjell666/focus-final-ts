import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface RangeFilter {
    startInterval: string;
    endInterval: string;
}

interface State {
    globalFilter: string;
    rangeFilter?: RangeFilter;
    setGlobalFilter: (filter: string) => void;
    setRangeFilter: (filter: RangeFilter | undefined) => void;
    removeLocalDateFilter: () => void;
}

const filterState: StateCreator<State> = (set) => ({
    globalFilter: '',
    rangeFilter: undefined,
    setGlobalFilter: (filter) => set({ globalFilter: filter }),
    setRangeFilter: (filter) => set({ rangeFilter: filter }),
    removeLocalDateFilter: () => set({ rangeFilter: undefined })
});

const useFiltersStore = create<State>()(devtools(filterState));

export default useFiltersStore;
