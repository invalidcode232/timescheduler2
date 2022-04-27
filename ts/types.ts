import { Timestamp } from "@firebase/firestore";

interface TodoData {
    name: string,
    description: string,
    duedate: Timestamp,
    isDone: boolean,
}

interface ScheduleData {
    name: string,
    lastDate: number | Timestamp,
    repeatEvery: Array<string>,
    time: Timestamp,
}

export type { TodoData, ScheduleData };
