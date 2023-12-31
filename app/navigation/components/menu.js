"use client";

import { useGlobalContext } from "@/app/utils/provider.js";
import { roboto_mono } from "@/app/styles/fonts.js";
import Glitch from "@/app/utils/glitch.js";

export default function Menu() {
	const { isNavOpen, setIsNavOpen } = useGlobalContext();

	return (
		<div
			className={`text-white transition-all duration-300 tracking-wide text-[14px] font-[200] cursor-pointer select-none ${roboto_mono.className}`}
		>
			{isNavOpen ? (
				<div onClick={() => setIsNavOpen(false)} className="flex">
					[&nbsp;<Glitch id="close-glitch">CLOSE</Glitch>&nbsp;]
				</div>
			) : (
				<div onClick={() => setIsNavOpen(true)} className="flex">
					[&nbsp;<Glitch id="menu-glitch">MENU</Glitch>&nbsp;]
				</div>
			)}
		</div>
	);
}
