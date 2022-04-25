import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import React from 'react';
import { FaPlus } from "react-icons/fa";
import ModalForm from "../../components/modalform";
import Template from "../../components/template";
import TodoForm from "../../components/todos/todoform";

const Todo: NextPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

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
            </Template>
        </>
    );
}

export default Todo;