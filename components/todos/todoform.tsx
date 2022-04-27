import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, ModalBody, ModalCloseButton, ModalFooter, Select, Spacer, useToast } from '@chakra-ui/react'
import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import { TodoData } from '../../ts/types'
import { todos } from '../../utils/context'

type Props = {
    onClose: () => void,
    edit: boolean,
    data?: TodoData,
    reference?: DocumentReference
}


function callback(edit: boolean, onClose: any, toast: any, reference?: DocumentReference) {
    // TODO: Add callback
    const nameInput = document.querySelector('[name=name]') as HTMLInputElement
    const descriptionInput = document.querySelector('[name=description]') as HTMLInputElement
    const dateInput = document.querySelector('[name=date]') as HTMLInputElement

    const date = moment(dateInput.value, 'YYYY-MM-DD').toDate()

    edit && reference ? todos.set(reference, {
        name: nameInput.value,
        description: descriptionInput.value,
        duedate: Timestamp.fromMillis(date.valueOf()),
        isDone: false,
    }) : todos.add(nameInput.value, date, descriptionInput.value);
    
    const title = edit ? 'Todo edited' : 'Todo added';
    
    toast({
        title: title,
        description: `${nameInput.value} is added!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
    })
    
    onClose()
}

function timestampToDate(timestamp: Timestamp) {
    // console.log(timestamp.toDate()).format('MM/DD/YYYY');
    return moment(timestamp.toDate()).format('YYYY-MM-DD');
}

function TodoForm({ onClose, edit, data, reference }: Props) {
    const toast = useToast();

    return (
        <>
            <ModalBody>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder='Task name' name='name' autoComplete={'off'} {...edit ? { defaultValue: data?.name } : {}} />
                </FormControl>

                <Spacer my={'3'} />

                <FormControl>
                    <FormLabel>Description (optional)</FormLabel>
                    <Input placeholder='Task description' name='description' autoComplete={'off'} {...edit ? { defaultValue: data?.description } : {}} />
                </FormControl>

                <Spacer my={'3'} />

                <FormControl>
                    <FormLabel>Due time (optional)</FormLabel>
                    <Input type={'date'} name='date' { ...edit ? {defaultValue: data?.duedate ? timestampToDate(data.duedate) : ''} : {} } />
                </FormControl>

                {/* <Spacer my={'3'} />

                <FormControl>
                    <FormLabel>Repeat every</FormLabel>
                    <Select placeholder='Select' name='repeat' multiple height={'100'} {...edit ? { defaultValue: data?.repeatEvery } : {}}>
                        <option value='Monday'>Monday</option>
                        <option value='Tuesday'>Tuesday</option>
                        <option value='Wednesday'>Wednesday</option>
                        <option value='Thursday'>Thursday</option>
                        <option value='Friday'>Friday</option>
                        <option value='Saturday'>Saturday</option>
                        <option value='Sunday'>Sunday</option>
                    </Select>
                </FormControl> */}
            </ModalBody>

            <ModalCloseButton />

            <ModalFooter>
                <Button onClick={onClose} mr={'3'}>Close</Button>
                <Button colorScheme='teal' onClick={() => callback(edit, onClose, toast, reference)}>Add</Button>
            </ModalFooter>
        </>
    )
}

export default TodoForm