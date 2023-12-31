export default function Scroll(e, href, offset) {
	e.preventDefault();

	const element = document.querySelector(href);
	if (!element) return;

	const top = element.getBoundingClientRect().top + window.scrollY - offset;
	window.scrollTo({ top, behavior: "smooth" });
}
