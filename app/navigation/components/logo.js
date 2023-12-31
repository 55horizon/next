"use client";

import { useGlobalContext } from "@/app/utils/provider.js";
import Image from "next/image";
import Link from "next/link";
import database from "@/app/database.json";
import logo from "@/app/assets/logo.svg";

export default function Logo({ toggle }) {
	const { setIsNavOpen } = useGlobalContext();

	return (
		<Link
			href={database.navigation[0].href}
			onClick={() => setIsNavOpen(false)}
		>
			<Image
				src={logo}
				width={0}
				height={0}
				priority={true}
				className="h-[24px] max-[900px]:h-[14px] mt-[3px] ml-[3px] w-auto"
				alt="Logo"
			/>
		</Link>
	);
}
