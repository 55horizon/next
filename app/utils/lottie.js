"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function Lottie({ json }) {
	const animationContainer = useRef(null);

	useEffect(() => {
		const anim = lottie.loadAnimation({
			container: animationContainer.current,
			renderer: "svg",
			loop: false,
			autoplay: true,
			animationData: json
		});

		return () => anim.destroy();
	}, [json]);

	return <div ref={animationContainer} className="w-full h-full" />;
}
