import diaries from '../../data/diaries'
import { DiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather, NewDiaryEntry } from '../types'



const getEntries = (): Array<DiaryEntry> => {
    return diaries
}

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};

const addEntry = () => {
    return null
}

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id)
    return entry
}

const addDiary = (
    entry: NewDiaryEntry
): DiaryEntry => {

    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry

    }

    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
    findById,
    addDiary
}