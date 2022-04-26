import { addDoc, collection, CollectionReference, deleteDoc, DocumentReference, Firestore, onSnapshot, QueryDocumentSnapshot, setDoc, Timestamp } from "firebase/firestore";

export class Todos {
    private db;
    private todos: Array<any>;
    private collection: CollectionReference;

    fetch = (callback: Function) => {
        onSnapshot(this.collection, (snapshot) => {
            this.todos = snapshot.docs;
            callback(snapshot.docs);
        });
    }

    add = (name: string, duedate?: Date, description?: string) => {
        return addDoc(this.collection, {
            name: name,
            isDone: false,
            duedate: duedate ? Timestamp.fromMillis(duedate.valueOf()) : null,
            description: description
        });
    }

    set = async (todo: QueryDocumentSnapshot, done: boolean) => {
        const todoData = todo.data()

        setDoc(todo.ref, {
            name: todoData.name,
            isDone: done,
            duedate: todoData.duedate,
            description: todoData.description
        });
    }

    delete = async (todoRef: DocumentReference) => {
        return deleteDoc(todoRef);
    }

    edit = async (todoRef: DocumentReference, name: string, isDone: boolean, duedate?: Date, description?: string) => {
        return setDoc(todoRef, {
            name: name,
            isDone: isDone,
            duedate: duedate ? Timestamp.fromMillis(duedate.valueOf()) : null,
            description: description
        });
    }
        
    constructor (db: Firestore) {
        this.db = db;
        this.todos = [];
        this.collection = collection(this.db, 'todos');
    }
}