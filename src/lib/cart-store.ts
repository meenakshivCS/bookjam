import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book, CartItem } from './types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (book: Book) => void;
  removeItem: (bookUid: string) => void;
  updateQuantity: (bookUid: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (book: Book) => {
        const { items } = get();
        const existingItem = items.find((item) => item.book.uid === book.uid);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.book.uid === book.uid
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { book, quantity: 1 }] });
        }
      },

      removeItem: (bookUid: string) => {
        const { items } = get();
        set({ items: items.filter((item) => item.book.uid !== bookUid) });
      },

      updateQuantity: (bookUid: string, quantity: number) => {
        const { items } = get();
        if (quantity <= 0) {
          set({ items: items.filter((item) => item.book.uid !== bookUid) });
        } else {
          set({
            items: items.map((item) =>
              item.book.uid === bookUid ? { ...item, quantity } : item
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.book.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'bookjam-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);


