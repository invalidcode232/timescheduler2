import { collection, Firestore, CollectionReference, DocumentData, setDoc, addDoc, Timestamp, DocumentSnapshot, QueryDocumentSnapshot, onSnapshot, deleteDoc, DocumentReference } from 'firebase/firestore';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export class Scheduler {
    private db: Firestore;
    private schedules: Array<DocumentSnapshot>;
    private collection: CollectionReference;

    fetchSchedules = (callback: Function) => {
        onSnapshot(this.collection, (snapshot) => {
            this.schedules = snapshot.docs;
            callback(snapshot.docs);
        });
    }

    setDone = async (schedule: QueryDocumentSnapshot) => {
        const date = new Date();
	    const scheduleData = schedule.data()

        setDoc(schedule.ref, { 
            name: scheduleData.name,
            time: scheduleData.time,
            lastDate: Timestamp.fromMillis(date.valueOf()),
            repeatEvery: scheduleData.repeatEvery,
        });
    }

    addSchedule = async (name: string, time: Timestamp, repeatEvery: Array<string>) => {
        return addDoc(this.collection, {
            name: name,
            time: time,
            lastDate: -1,
            repeatEvery: repeatEvery,
        });
    }

    shouldTrigger = async () => {
        const schedules = this.schedules;

        const now = new Date();
        const nowHour = now.getHours();
        const nowMinute = now.getMinutes();
        const nowDay = now.getDay();
        const nowDate = now.getDate();
        const dayStr = DAYS[nowDay];

        let shouldTrigger: boolean | DocumentSnapshot = false;
        
        schedules.forEach(schedule => {
            const scheduleData = schedule.data() as DocumentData;

            const scheduleDate = new Date(scheduleData.time.seconds * 1000);
            const scheduleHour = scheduleDate.getHours();
            const scheduleMinute = scheduleDate.getMinutes();

            const hasTriggeredBefore = typeof(scheduleData.lastDate) !== 'number';
            let lastTime = null;
            let lastDate = null;

            if (hasTriggeredBefore) {
	            lastTime = new Date(scheduleData.lastDate.seconds * 1000);
                lastDate = lastTime.getDate();
            }

            if (scheduleData.repeatEvery.includes(dayStr) && (scheduleHour === nowHour ? scheduleMinute <= nowMinute : true) && (scheduleHour <= nowHour)) {
                if (!hasTriggeredBefore || (lastDate && lastDate !== nowDate)) {
                    shouldTrigger = schedule;
                }
            }
        });

        return shouldTrigger;
    }

    deleteSchedule = async (schedule: DocumentReference) => {
        return deleteDoc(schedule);
    }

    editSchedule = async (schedule: DocumentReference, name: string, time: Timestamp, repeatEvery: Array<string>) => {
        return setDoc(schedule, {
            name: name,
            time: time,
            repeatEvery: repeatEvery,
            lastDate: -1,
        });
    }

    constructor(db: Firestore) {
        this.db = db;
        this.schedules = [];
        this.collection = collection(this.db, 'schedules');
    }
}
