"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import loading from "@/app/assets/loading.gif";

export default function Preloader({ time, children }) {
	const [expiredTime, setExpiredTime] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (document.readyState === "complete") {
			setLoaded(true);
		} else {
			const handleLoad = () => setLoaded(true);
			window.addEventListener("load", handleLoad);

			return () => window.removeEventListener("load", handleLoad);
		}
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setExpiredTime(true);
		}, time);

		return () => clearTimeout(timer);
	}, [time]);

	function isLoading() {
		return !(expiredTime && loaded);
	}

	return isLoading() ? (
		<div
			id="preloader"
			className="flex fixed items-center justify-center inset-x-0 inset-y-0 flex-col bg-black z-50"
		>
			<Image
				src={logo}
				width={0}
				height={0}
				priority={true}
				className="h-[24px] w-auto"
				alt="Logo"
			/>
			<Image
				src={loading}
				width={0}
				height={0}
				priority={true}
				className="h-[8px] w-auto mt-[20px] invert"
				alt="Logo"
			/>
		</div>
	) : (
		children
	);
}
