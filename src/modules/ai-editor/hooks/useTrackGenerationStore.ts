import { create } from 'zustand';

interface GenerationTrackStore {
  isGeneration: boolean;
  setIsGeneration: (arg: boolean) => void;
}

export const useTrackGenerationStore = create<GenerationTrackStore>((set) => ({
  isGeneration: false,
  setIsGeneration: (arg) => set({ isGeneration: arg }),
}));
