"use client";

import { usePathname } from "next/navigation";
import { Provider } from "@/app/utils/provider.js";
import Preloader from "@/app/preloader/preloader.js";
import Navigation from "@/app/navigation/navigation.js";
import Footer from "@/app/footer/footer.js";

export default function Dynamic({ children }) {
	const pathname = usePathname();

	const renderNavbar = pathname;
	const renderFooter =
		pathname !== "/openai" && !pathname.startsWith("/model/");

	const renderModelViewer = pathname.startsWith("/model/");

	const renderPadding = !pathname.startsWith("/openai");

	const modelViewer = (
		<head>
			<script
				type="module"
				src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
			/>
		</head>
	);

	return (
		<html lang="en">
			{renderModelViewer && modelViewer}
			<body id="top">
				<div className={renderPadding ? "p-[13px]" : "p-0"}>
					<Provider>
						<Preloader time={500}>
							{renderNavbar &&
								(renderModelViewer ? (
									<Navigation label="FULL SCREEN" />
								) : (
									<Navigation />
								))}
							{children}
							{renderFooter && <Footer />}
						</Preloader>
					</Provider>
				</div>
			</body>
		</html>
	);
}
