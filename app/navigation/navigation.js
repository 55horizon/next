import Logo from "@/app/navigation/components/logo.js";
import Position from "@/app/navigation/components/position.js";
import Menu from "@/app/navigation/components/menu.js";
import Dropdown from "@/app/navigation/components/dropdown.js";

export default function Navigation({ label }) {
	return (
		<nav>
			<div
				className={`fixed inset-x-[10px] inset-y-[10px] mix-blend-exclusion h-0 z-20`}
			>
				<div className="flex items-start">
					<div className="flex absolute w-auto">
						<Logo />
					</div>
					<div className="flex justify-center absolute w-auto inset-x-0 -z-10">
						<Position label={label} />
					</div>
					<div className="flex absolute w-auto right-0">
						<Menu />
					</div>
				</div>
			</div>
			<Dropdown />
		</nav>
	);
}
