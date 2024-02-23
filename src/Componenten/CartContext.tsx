import React, { createContext, useReducer, useContext, ReactNode } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;

}
type CartAction =
  | { type: 'ADD_TO_CART'; data: CartItem }
  | { type: 'INCREASE_QUANTITY' | 'DECREASE_QUANTITY' | 'REMOVE_FROM_CART'; data: { id: number } };

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
   
      const existingCartItem = state.cart.find(item => item.id === action.data.id);
      if (existingCartItem) {
  
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.data.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
    
        return {
          ...state,
          cart: [...state.cart, { ...action.data, quantity: 1 }]
        };
      }
    }
    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.data.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    case 'DECREASE_QUANTITY': {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.data.id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        ),
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.data.id),
      };
    }
    default:
      return state;
  }
};




const CartContext = createContext<CartContextType | undefined>(undefined);


// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('use within a CartProvider');
  }
  return context;
};


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
