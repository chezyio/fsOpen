/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Patient, BaseEntry, Diagnosis } from "../types";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import Entries from "../components/Entries";

const PatientViewPage = () => {
	const [patient, setPatient] = useState<Patient>();
	const [diagnosesArr, setDiagnosesArr] = useState<Diagnosis[]>([]);

	const { id } = useParams<{ id: string }>();

	const fetchFullPatient = async () => {
		const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

		const data: Patient = response.data;
		setPatient(data);
		void fetchDiagnoses();
	};
	const fetchDiagnoses = async () => {
		const response = await axios.get<Diagnosis[]>(
			`${apiBaseUrl}/api/diagnoses`
		);
		setDiagnosesArr(response.data);
	};
	useEffect(() => {
		void fetchFullPatient();
	}, []);

	if (!patient) {
		return <h2>Patient not found!</h2>;
	}

	const getGenderIcon = () => {
		console.log("called");
		if (patient.gender === "female") {
			return "venus";
		} else {
			return "mars";
		}
	};

	// const determineDiagnoses = (code: string) => {
	// 	const response: Diagnosis | undefined = diagnosesArr.find(
	// 		(diagnosis) => diagnosis.code == code
	// 	);
	// 	if (!response) {
	// 		return null;
	// 	}
	// 	return response.name;
	// };

	const entriesArr: BaseEntry[] = patient.entries;
	// console.log(diagnosesArr);
	return (
		<div>
			<h2>
				{patient.name} <Icon name={getGenderIcon()} />
			</h2>
			<p>
				<strong>SSN:</strong> {patient.ssn}
			</p>
			<p>
				<strong>Occupation:</strong> {patient.occupation}
			</p>
			<br />
			<Entries entries={entriesArr} diagnoses={diagnosesArr} />

			<h3>Entries:</h3>
			{/* {entriesArr.map((entry) => {
				if (!entry.diagnosisCodes) {
					return <p>{entry.description}</p>;
				}
				return (
					<div>
						<p>{entry.description}</p>
						<ul>
							{entry.diagnosisCodes.map((code) => {
								const test = determineDiagnoses(code);
								if (typeof test === "string") {
									return (
										<li key={code}>
											{code} - {test}
										</li>
									);
								}
								return <li key={code}>{code}</li>;
							})}
						</ul>
					</div>
				);
			})} */}
		</div>
	);
};

export default PatientViewPage;
