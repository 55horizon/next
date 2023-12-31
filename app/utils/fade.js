"use client";

import { useState, useEffect, useRef } from "react";

export default function Fade({
	fadeIn = true,
	fadeOut = false,
	fadeInPosition = 0.9,
	fadeOutPosition = 0.1,
	multiplier = 2,
	children
}) {
	const [opacity, setOpacity] = useState(1);
	const fadeRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!fadeRef.current) return;

			const rect = fadeRef.current.getBoundingClientRect();
			const windowHeight =
				window.innerHeight || document.documentElement.clientHeight;

			if (fadeIn && !fadeOut) {
				const fadeInStart = fadeInPosition * windowHeight;
				if (rect.top > fadeInStart) {
					setOpacity(0);
				} else {
					const distanceTravelled = fadeInStart - rect.top;
					const potentialDistance = windowHeight - fadeInStart;
					const newOpacity =
						distanceTravelled / (potentialDistance * multiplier);
					setOpacity(Math.min(1, newOpacity));
				}
			} else if (fadeOut) {
				const fadeOutEnd = fadeOutPosition * windowHeight;
				if (rect.top > fadeOutEnd) {
					setOpacity(1);
				} else {
					const distanceTravelled = fadeOutEnd - rect.top;
					const potentialDistance = fadeRef.current.offsetHeight;
					const newOpacity =
						1 - distanceTravelled / (potentialDistance * multiplier);
					setOpacity(Math.max(0, newOpacity));
				}
			}
		};
		handleScroll();

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [fadeIn, fadeOut]);

	return (
		<div ref={fadeRef} className="w-full h-full" style={{ opacity: opacity }}>
			{children}
		</div>
	);
}
