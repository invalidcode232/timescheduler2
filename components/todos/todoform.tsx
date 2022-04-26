import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, ModalBody, ModalCloseButton, ModalFooter, Select, Spacer, useToast } from '@chakra-ui/react'
import { DocumentData, Timestamp } from 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import { todos } from '../../utils/context'

type Props = {
    onClose: () => void,
    edit: boolean,
    data?: DocumentData,
}

function onAdd(onClose: any, toast: any) {
    // TODO: Add callback
    const nameInput = document.querySelector('[name=name]') as HTMLInputElement
    const descriptionInput = document.querySelector('[name=description]') as HTMLInputElement
    const dateInput = document.querySelector('[name=date]') as HTMLInputElement

    const date = moment(dateInput.value, 'YYYY-MM-DD').toDate()

    todos.add(nameInput.value, date, descriptionInput.value)

    toast({
        title: 'Todo added',
        description: `${nameInput.value} is added!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
    })

    onClose()
}

function timestampToTime(timestamp: Timestamp) {
    const date = new Date(timestamp.seconds * 1000)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    // const minutesStr = minutes < 10 ? '0' + minutes : minutes

    const strTime = hours + ':' + minutes
    return strTime
}


function TodoForm({ onClose, edit, data }: Props) {
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
                    <Input type={'date'} name='date' />
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
                <Button colorScheme='teal' onClick={() => onAdd(onClose, toast)}>Add</Button>
            </ModalFooter>
        </>
    )
}

export default TodoForm