import { roboto_mono } from "@/app/styles/fonts.js";
import database from "@/app/database.json";

export default function Footer() {
	return (
		<div id="footer" className="flex items-center justify-between text-white">
			<p className={`text-[10px] uppercase ${roboto_mono.className}`}>
				{database.footer.text[0]}
			</p>
			<p className={`text-[10px] uppercase ${roboto_mono.className}`}>
				<a href="https://55horizon.com" target="_blank">
					{database.footer.text[1]}
				</a>
			</p>
		</div>
	);
}
