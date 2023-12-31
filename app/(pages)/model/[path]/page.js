import Viewer from "@/app/(pages)/model/components/viewer.js";

export default function Page({ params }) {
	return (
		<main id="model">
			<Viewer src={params.path} />
		</main>
	);
}
