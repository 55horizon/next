import Dynamic from "@/app/dynamic.js";
import icon from "@/app/assets/icon.png";
import database from "@/app/database.json";
import "@/app/styles/globals.scss";

const title = database.metadata.name;
const description = database.metadata.description;

export const metadata = {
	title: title,
	description: description,
	icons: {
		icon: icon.src
	}
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	minimumScale: 1
};

export default function RootLayout({ children }) {
	return <Dynamic>{children}</Dynamic>;
}
