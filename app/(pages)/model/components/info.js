import { roboto_mono } from "@/app/styles/fonts.js";
import Glitch from "@/app/utils/glitch.js";
import database from "@/app/database.json";

export default function Info() {
	return (
		<div
			id="info"
			className="flex items-center justify-center flex-col w-full h-screen"
		>
			<div
				className={`flex text-white text-[10px] h-[14px] text-center uppercase ${roboto_mono.className}`}
			>
				[&nbsp;
				<Glitch id="info-text-intro">
					{database.pages.model.info.text[0]}
				</Glitch>
				&nbsp;]
			</div>
			<div
				className={`text-white text-[28px] text-center mt-[10px] tracking-[1px] uppercase ${roboto_mono.className}`}
			>
				{database.pages.model.info.text[1]}
			</div>
			<div
				className={`text-white text-[12px] mt-[40px] text-center tracking-[2px] uppercase max-w-[500px] ${roboto_mono.className}`}
			>
				{database.pages.model.info.text[2]}
			</div>
			<div
				className={`flex text-white text-[10px] mt-[40px] text-center uppercase max-w-[500px] ${roboto_mono.className}`}
			>
				[&nbsp;
				<Glitch id="example-path">{database.pages.model.info.text[3]}</Glitch>
				&nbsp;]
			</div>
			<div
				className={`text-white text-[12px] mt-[15px] text-center tracking-[2px] uppercase max-w-[500px] ${roboto_mono.className}`}
			>
				<a href={database.pages.model.info.href[0]}>
					{database.pages.model.info.href[0]}
				</a>
			</div>
		</div>
	);
}
