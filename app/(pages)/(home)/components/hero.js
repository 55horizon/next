import { roboto_mono } from "@/app/styles/fonts.js";
import Glitch from "@/app/utils/glitch.js";
import database from "@/app/database.json";

export default function Hero() {
	return (
		<div id="hero" className="flex items-center justify-center w-full h-screen">
			<div
				className={`text-white text-[18px] text-center tracking-[12px] uppercase ${roboto_mono.className}`}
			>
				<Glitch id="hero-text">{database.pages.home.hero.text[0]}</Glitch>
			</div>
		</div>
	);
}
