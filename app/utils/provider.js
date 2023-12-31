"use client";

import { createContext, useState, useContext } from "react";

const Context = createContext();

export const useGlobalContext = () => useContext(Context);

export const Provider = ({ children }) => {
	const [isNavOpen, setIsNavOpen] = useState(false);

	return (
		<Context.Provider value={{ isNavOpen, setIsNavOpen }}>
			{children}
		</Context.Provider>
	);
};
