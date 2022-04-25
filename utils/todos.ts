import { addDoc, collection, CollectionReference, deleteDoc, DocumentReference, Firestore, onSnapshot, QueryDocumentSnapshot, setDoc, Timestamp } from "firebase/firestore";

export class Todos {
    private db;
    private todos: Array<any>;
    private collection: CollectionReference;

    fetchTodos = (callback: Function) => {
        onSnapshot(this.collection, (snapshot) => {
            this.todos = snapshot.docs;
            callback(snapshot.docs);
        });
    }

    addTodo = (name: string, isDone: boolean, duedate?: Date, description?: string) => {
        return addDoc(this.collection, {
            name: name,
            isDone: isDone,
            duedate: duedate ? Timestamp.fromMillis(duedate.valueOf()) : null,
            description: description
        });
    }

    setDone = async (todo: QueryDocumentSnapshot, done: boolean) => {
        const todoData = todo.data()

        setDoc(todo.ref, {
            name: todoData.name,
            isDone: done,
            duedate: todoData.duedate,
            description: todoData.description
        });
    }

    deleteTodo = async (todoRef: DocumentReference) => {
        return deleteDoc(todoRef);
    }

    editTodo = async (todoRef: DocumentReference, name: string, isDone: boolean, duedate?: Date, description?: string) => {
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