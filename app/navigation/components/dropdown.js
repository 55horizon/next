"use client";

import { useGlobalContext } from "@/app/utils/provider.js";
import { bebas_neue } from "@/app/styles/fonts.js";
import Link from "next/link";
import database from "@/app/database.json";

export default function Dropdown() {
	const { isNavOpen, setIsNavOpen } = useGlobalContext();

	return (
		<div
			className={`fixed inset-0 flex items-center justify-start transition-all duration-500 z-10 ${
				isNavOpen ? "h-[100%]" : "h-0"
			}`}
		>
			<div className={`w-full h-full overflow-scroll bg-white`}>
				<div className={`mt-20 p-[10px]`}>
					<div>
						{database.navigation.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setIsNavOpen(false)}
								className={`flex text-[200px] max-[900px]:text-[90px] leading-[0.75] font-[400] hover:text-[#4b4b4b] max-[900px]:hover:text-inherit whitespace-nowrap uppercase ${bebas_neue.className}`}
							>
								{item.text}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
