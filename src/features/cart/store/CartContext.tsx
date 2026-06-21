import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { Product } from "@/features/products/types";
import { CartItem } from "@/features/cart/types";

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE"; payload: number }
  | { type: "INCREMENT"; payload: number }
  | { type: "DECREMENT"; payload: number };

const initialState: CartState = { items: [] };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(
        (i) => i.product.id === action.payload.id,
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return {
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }
    case "REMOVE":
      return {
        items: state.items.filter((i) => i.product.id !== action.payload),
      };
    case "INCREMENT":
      return {
        items: state.items.map((i) =>
          i.product.id === action.payload
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
      };
    case "DECREMENT":
      return {
        items: state.items
          .map((i) =>
            i.product.id === action.payload
              ? { ...i, quantity: i.quantity - 1 }
              : i,
          )
          .filter((i) => i.quantity > 0),
      };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = useCallback(
    (product: Product) => dispatch({ type: "ADD", payload: product }),
    [],
  );
  const removeFromCart = useCallback(
    (id: number) => dispatch({ type: "REMOVE", payload: id }),
    [],
  );
  const increment = useCallback(
    (id: number) => dispatch({ type: "INCREMENT", payload: id }),
    [],
  );
  const decrement = useCallback(
    (id: number) => dispatch({ type: "DECREMENT", payload: id }),
    [],
  );

  const totalCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items],
  );
  const totalPrice = useMemo(
    () => state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [state.items],
  );

  const value = useMemo(
    () => ({
      items: state.items,
      totalCount,
      totalPrice,
      addToCart,
      removeFromCart,
      increment,
      decrement,
    }),
    [
      state.items,
      totalCount,
      totalPrice,
      addToCart,
      removeFromCart,
      increment,
      decrement,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart musi być użyty wewnątrz CartProvider");
  return ctx;
}
