"use client";

import { notFound, usePathname } from "next/navigation";
import { roboto_mono } from "@/app/styles/fonts.js";
import Glitch from "@/app/utils/glitch.js";
import database from "@/app/database.json";

export default function Page({ params }) {
	const pathname = usePathname();

	function defaultComponent() {
		const dynamic = `Dynamic Route: ${params.path}`;

		return (
			<main
				id="default"
				className="flex items-center justify-center w-full h-screen"
			>
				<div
					className={`text-white text-center tracking-[1px] uppercase ${roboto_mono.className}`}
				>
					<Glitch id={"dynamic-page"}>{dynamic}</Glitch>
				</div>
			</main>
		);
	}

	function renderComponent() {
		if (
			database.pages.some((page) => page.href === pathname) &&
			pathname !== "/openai" &&
			pathname !== "/model"
		) {
			return defaultComponent();
		}
		return notFound();
	}

	return renderComponent();
}
