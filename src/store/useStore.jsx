import { create } from 'zustand'

export const useStore = create((set) => ({ 
    dataStore: undefined,
    actualizarData: (nuevaData) => set(() => ( {dataStore: nuevaData} ))
 }))