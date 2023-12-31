import React from "react";

export default function Render({ data, children }) {
	return data.map((item, index) =>
		React.Children.map(children, (child) =>
			React.cloneElement(child, { item, index })
		)
	);
}
