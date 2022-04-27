import { Button, Flex, Heading, Spacer, useDisclosure } from "@chakra-ui/react";
import { QueryDocumentSnapshot } from "@firebase/firestore";
import { NextPage } from "next";
import React, { useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import ModalForm from "../../components/modalform";
import Template from "../../components/template";
import TodoForm from "../../components/todos/todoform";
import { todos } from "../../utils/context";
import TodoList from '../../components/todos/todo'
import { TodoData } from '../../ts/types'

const Todo: NextPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [todoList, setTodos] = React.useState([] as Array<QueryDocumentSnapshot>);
    useEffect(() => {
        const snapshotCallback = todos.fetch((docs: Array<QueryDocumentSnapshot>) => {
            setTodos(docs);
            // docs.forEach(doc => {
            //     console.log(doc.data());
            // });
        })

        return snapshotCallback;
    }, []);

    let data = todoList.map(todo => {
        return <TodoList key={todo.id} data={todo.data() as TodoData} reference={todo.ref} />
    });

    return (
        <>
            <Template title='Todos'>
                <Flex justifyContent={'space-between'}>
                    <Heading>Todos</Heading>
                    <div>
                        <Button onClick={onOpen}><FaPlus /></Button>

                        <ModalForm isOpen={isOpen} name={'Add todo'} onClose={onClose}>
                            <TodoForm onClose={onClose} edit={false}/>
                        </ModalForm>
                    </div>
                </Flex>

                <Spacer marginY={'5'} />

                {data}
            </Template>
        </>
    );
}

export default Todo