import { create } from "zustand";


const useLoading = create((set) => ({
    loading: true,
    setLoading: (value) => set({ loading: value }),
}))


export default useLoading