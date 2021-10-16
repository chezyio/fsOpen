import React from "react";

const Part = (part: {
	name: any;
	exerciseCount: any;
	description: any;
	groupProjectCount: any;
	exerciseSubmissionLink: any;
}) => {
	switch (part.name) {
		case "Fundementals":
			console.log(part.exerciseCount);
			console.log(part.description);
			break;
		case "Advanced":
			console.log(part.exerciseCount);
			console.log(part.description);
			break;
		case "Using props to pass data":
			console.log(part.exerciseCount);
			console.log(part.groupProjectCount);
			break;

		case "Deeper type usage":
			console.log(part.description);
			console.log(part.exerciseCount);
			console.log(part.exerciseSubmissionLink);
			break;
		default:
			break;
	}
};

export default Part;
