"use client";

import { useEffect, useRef } from "react";
import GlitchedWriter, { presets } from "glitched-writer";

export default function Glitch({ id, children }) {
	const ref = useRef(null);

	let script;

	useEffect(() => {
		const element = ref.current;

		if (element) {
			const observer = new IntersectionObserver(async (entries) => {
				const entry = entries[0];
				const { boundingClientRect } = entry;
				if (boundingClientRect.top >= 0) {
					element.innerHTML = "";
					const Writer = new GlitchedWriter(`#${id}`, {
						...presets.encrypted,
						letterize: true
					});
					await Writer.write(children);
				}
			});
			observer.observe(element);
		}

		return () => {
			if (element) {
				const observer = new IntersectionObserver(() => {}, {});
				observer.disconnect();
			}
		};
	}, [id, children]);

	return (
		<div id={id} ref={ref}>
			{script}
		</div>
	);
}
