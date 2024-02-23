import React, { createContext, useReducer, useContext, ReactNode } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;

}
type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'INCREASE_QUANTITY' | 'DECREASE_QUANTITY' | 'REMOVE_FROM_CART'; payload: { id: number } };

interface CartState {
  cart: CartItem[];
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
    case 'ADD_TO_CART': {
      // Prüfe, ob das Produkt bereits im Warenkorb ist
      const existingCartItem = state.cart.find(item => item.id === action.payload.id);
      if (existingCartItem) {
        // Wenn ja, erhöhe die Menge
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        // Wenn nicht, füge das neue Produkt hinzu
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        };
      }
    }
    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    case 'DECREASE_QUANTITY': {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        ),
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    }
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
