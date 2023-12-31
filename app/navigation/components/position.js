import { roboto_mono } from "@/app/styles/fonts.js";
import Percent from "@/app/utils/percent.js";

export default function Position({ label }) {
	return (
		<div
			className={`text-white transition-all duration-300 tracking-wide text-[11px] font-[200] select-none ${roboto_mono.className}`}
		>
			{!label ? (
				<>
					(SCROLL&nbsp;
					<Percent />
					%)
				</>
			) : (
				<>({label})</>
			)}
		</div>
	);
}
