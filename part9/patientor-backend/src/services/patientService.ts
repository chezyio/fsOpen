import patients from "../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";

const getPatients = (): Array<Patient> => {
    return patients
}

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};



const getNonSensitivePatient = (id: string): NonSensitivePatient => {
    const data = patients.filter((patients) => patients.id === id);
    if (data.length < 1) {
        throw new Error('No patient with such id found');
    }
    return data[0];
};



const addPatient = (patient: NewPatient): NewPatient => {
    const newPatient = {
        id: String(Math.max(Number(...patients.map(p => p.id))) + 1),
        ...patient
    }

    patients.push(newPatient)
    return newPatient
}

export default {
    getPatients,
    addPatient,
    getNonSensitivePatients,
    getNonSensitivePatient
}