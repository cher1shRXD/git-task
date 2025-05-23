import { LoadingStore } from '@/types/store/LoadingStore'
import { create } from 'zustand'

export const loadingStore = create<LoadingStore>(set => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading })
}))