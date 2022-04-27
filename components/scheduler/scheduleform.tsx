import React from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, ModalBody, ModalCloseButton, ModalFooter, Select, Spacer, useToast } from '@chakra-ui/react'
import { FaClock } from 'react-icons/fa'
import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore';
import moment from 'moment';
import {scheduler} from '../../utils/context';

function onAdd(edit: boolean, onClose: any, toast: any, reference?: DocumentReference) {
    const time = document.querySelector('[name=time]') as HTMLInputElement;
    const name = document.querySelector('[name=name]') as HTMLInputElement;
    const repeat = document.querySelector('[name=repeat]') as HTMLSelectElement;
    
    const repeatDays = Array.from(repeat.selectedOptions).map((option) => option.value);
    
    const date = moment(time.value, 'HH:mm').toDate()
    
    // console.log(edit)
    // console.log(reference)

    const title = edit && reference ? 'Task edited' : 'Task added';

    toast({
        title: title,
        description: `${name.value} will be added at ${time.value}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
    })
    
    edit && reference ? scheduler.edit(reference, {
        name: name.value,
        repeatEvery: repeatDays,
        time: Timestamp.fromMillis(date.valueOf()),
        lastDate: -1,
    }) : scheduler.add(name.value, Timestamp.fromMillis(date.valueOf()), repeatDays)

    onClose()
}

function timestampToTime(timestamp: Timestamp) {
    const date = new Date(timestamp.seconds * 1000)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const minutesStr = minutes < 10 ? '0' + minutes : minutes
    const hoursStr = hours < 10 ? '0' + hours : hours

    const strTime = hoursStr + ':' + minutesStr

    return strTime
}

type Props = {
    onClose: () => void,
    edit: boolean,
    data?: DocumentData,
    reference?: DocumentReference
}

function ScheduleForm({ onClose, edit, data, reference }: Props) {
    const toast = useToast();

    return (
        <>
            <ModalBody>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder='Task name' name='name' autoComplete={'off'} {... edit ? { defaultValue: data?.name } : {} } />
                </FormControl>

                <Spacer my={'3'} />

                <FormControl>
                    <FormLabel>Time</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                            <FaClock/>
                        </InputLeftElement>
                        <Input type={'time'} name='time' {... edit ? { defaultValue: timestampToTime(data?.time) } : {} } />
                    </InputGroup>
                </FormControl>

                <Spacer my={'3'} />

                <FormControl>
                    <FormLabel>Repeat every</FormLabel>
                    <Select placeholder='Select' name='repeat' multiple height={'100'} {... edit ? { defaultValue: data?.repeatEvery } : {} }>
                        <option value='Monday'>Monday</option>
                        <option value='Tuesday'>Tuesday</option>
                        <option value='Wednesday'>Wednesday</option>
                        <option value='Thursday'>Thursday</option>
                        <option value='Friday'>Friday</option>
                        <option value='Saturday'>Saturday</option>
                        <option value='Sunday'>Sunday</option>
                    </Select>
                </FormControl>
            </ModalBody>

            <ModalCloseButton />

            <ModalFooter>
                <Button onClick={onClose} mr={'3'}>Close</Button>
                <Button colorScheme='teal' onClick={() => onAdd(edit, onClose, toast, reference)}>Add</Button>
            </ModalFooter>
        </>
    )
}

export default ScheduleForm