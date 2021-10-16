import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
	return (
		<div>
			<Part parts={parts} />
		</div>
	);
};

export default Content;
