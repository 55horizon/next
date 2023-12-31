export default function Viewer({ src }) {
	return (
		<div
			id="viewer"
			className="flex items-center justify-center w-full h-[95vh]"
		>
			<model-viewer
				alt="3D model"
				src={`/${src}`}
				ar
				shadow-intensity="1"
				camera-controls
				touch-action="pan-y"
			/>
		</div>
	);
}
