import { roboto_mono } from "@/app/styles/fonts.js";
import Glitch from "@/app/utils/glitch.js";

export default function NotFound() {
	return (
		<main
			id="not-found"
			className="flex items-center justify-center w-full h-screen"
		>
			<div
				className={`text-white text-center tracking-[1px] uppercase ${roboto_mono.className}`}
			>
				<Glitch id={"dynamic-page"}>404 | Page does not exist</Glitch>
			</div>
		</main>
	);
}
