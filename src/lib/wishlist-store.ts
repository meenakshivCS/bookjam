import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book } from './types';

interface WishlistItem extends Book {
  addedAt: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (book: Book) => void;
  removeItem: (uid: string) => void;
  isInWishlist: (uid: string) => boolean;
  toggleItem: (book: Book) => void;
  clearWishlist: () => void;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (book: Book) => {
        const exists = get().items.some((item) => item.uid === book.uid);
        if (!exists) {
          set((state) => ({
            items: [...state.items, { ...book, addedAt: new Date().toISOString() }],
          }));
        }
      },

      removeItem: (uid: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.uid !== uid),
        }));
      },

      isInWishlist: (uid: string) => {
        return get().items.some((item) => item.uid === uid);
      },

      toggleItem: (book: Book) => {
        const isInList = get().isInWishlist(book.uid);
        if (isInList) {
          get().removeItem(book.uid);
        } else {
          get().addItem(book);
        }
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'bookjam-wishlist',
    }
  )
);


