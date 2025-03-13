"use client"

import { create } from "zustand"

interface CartItem {
  id: number
  image: string
  name: string
  size: string
  price: number
  count: number
}

interface CardStore {
  cart: CartItem[]
  addToCard: (item: CartItem) => void
  removeFromCard: (id: number, size: string) => void
  clearCart: () => void
}

const useCardStore = create<CardStore>((set) => ({
  cart: [],
  addToCard: (newItem) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex((item) => item.id === newItem.id && item.size === newItem.size)

      if (existingItemIndex !== -1) {
        // Item exists, update it
        const updatedCart = [...state.cart]
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          count: updatedCart[existingItemIndex].count + newItem.count,
          price: updatedCart[existingItemIndex].price + newItem.price,
        }
        return { cart: updatedCart }
      } else {
        // Item doesn't exist, add it
        return { cart: [...state.cart, newItem] }
      }
    }),
  removeFromCard: (id, size) =>
    set((state) => ({
      cart: state.cart.filter((item) => !(item.id === id && item.size === size)),
    })),
  clearCart: () => set({ cart: [] }),
}))

export default useCardStore

