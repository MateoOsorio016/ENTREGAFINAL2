import { createContext, useContext, useEffect, useReducer } from 'react';

import AppReducer from './AppReducer';

interface AppState {
	cart: any[];
}

interface GlobalContext {
    cart: any[];
	addToCart: (item: any) => void;
	removeFromCart: (id: any) => void;
	addQuantity: (id: any) => void;
    removeQuantity: (id: any) => void;
	clearCart: () => void;
}

const initialState: AppState = {
	cart: [],
};
export const GlobalStateContext = createContext<GlobalContext>({
    cart: [],
	addToCart: () => {},
	removeFromCart: () => {},
	addQuantity: () => {},
    removeQuantity: () => {},
	clearCart: () => {},
});

export const useGlobalState = () => {
	const context = useContext(GlobalStateContext);
	return context;
};

export const GlobalProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(AppReducer, initialState, () => {
		const localData = localStorage.getItem('cart');
		return localData ? JSON.parse(localData) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state));
	}, [state]);

	const addToCart = (item: any) => {
		if (state.cart.find((product: any) => product.id === item.id)) {
			const newCart = state.cart.map((product: any) => {
				if (product.id === item.id) {
					return {
						...product,
						quantity: product.quantity + item.quantity,
					};
				}
				return product;
			});
			dispatch({
				type: 'SET_CART',
				payload: newCart,
			});
			return;
		}
		dispatch({
			type: 'ADD_TO_CART',
			payload: item,
		});
	};

	const removeFromCart = (id: any) => {
		dispatch({
			type: 'REMOVE_FROM_CART',
			payload: id,
		});
	};

	const addQuantity = (id: any) => {
        dispatch({
            type: 'SET_CART',
            payload: state.cart.map((product: any) => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: product.quantity + 1,
                    };
                }
                return product;
            }
            ),
        });
    }

    const removeQuantity = (id: any) => {
        dispatch({
            type: 'SET_CART',
            payload: state.cart.map((product: any) => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: product.quantity - 1,
                    };
                }
                return product;
            }
            ),
        });
    }

	const clearCart = () => {
		dispatch({
			type: 'CLEAR_CART',
		});
	}

	return (
		<GlobalStateContext.Provider
			value={{
                cart: state.cart,
				addToCart,
				removeFromCart,
				addQuantity,
                removeQuantity,
				clearCart,
			}}
		>
			{children}
		</GlobalStateContext.Provider>
	);
};
