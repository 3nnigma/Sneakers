import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface CartContextType {
	totalPrice: number;
	setTotalPrice: (price: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

export const PriceProvider = ({ children }: { children: ReactNode; }) => {
	const [totalPrice, setTotalPrice] = useState<number>(0);

	useEffect(() => {
		const storedTotalPrice = localStorage.getItem('totalPrice');
		if (storedTotalPrice) {
			setTotalPrice(Number(storedTotalPrice));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('totalPrice', totalPrice.toString());
	}, [totalPrice]);

	return (
		<CartContext.Provider value={{ totalPrice, setTotalPrice }}>
			{children}
		</CartContext.Provider>
	);
};
