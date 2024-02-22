import React, { createContext, useReducer, useContext, ReactNode } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;

}

interface CartState {
  cart: CartItem[];
}

interface CartAction {
  type: string;
  payload: CartItem;
}

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const initialState: CartState = {
  cart: []
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload!] }; // Achtung auf optionales Payload
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload!.id) // Entfernen nach ID
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload!.id ? { ...item, quantity: action.payload!.quantity } : item
        ) // Aktualisiere die Anzahl für ein Produkt
      };
    default:
      return state;
  }
};

// Erstellen des Cart Contexts mit anfänglichem Zustand
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom Hook, um den Cart Context zu nutzen
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider-Komponente mit Typisierung für die children-Prop
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
