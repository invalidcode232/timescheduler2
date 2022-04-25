import React from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, ModalBody, ModalCloseButton, ModalFooter, Select, Spacer, useToast } from '@chakra-ui/react'
import { FaClock } from 'react-icons/fa'
import { DocumentData, Timestamp } from 'firebase/firestore';
import moment from 'moment';
import scheduler from '../../utils/schedulercontext';

function onAdd(onClose: any, toast: any) {
    const time = document.querySelector('[name=time]') as HTMLInputElement;
    const name = document.querySelector('[name=name]') as HTMLInputElement;
    const repeat = document.querySelector('[name=repeat]') as HTMLSelectElement;
    
    const repeatDays = Array.from(repeat.selectedOptions).map((option) => option.value);
    
    const unix = moment(time.value, 'HH:mm').unix()
    
    toast({
        title: 'Task added',
        description: `${name.value} will be added at ${time.value}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
    })
    
    scheduler.addSchedule(name.value, Timestamp.fromMillis(unix * 1000), repeatDays)

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

type Props = {
    onClose: () => void,
    edit: boolean,
    data?: DocumentData,
}

function ScheduleForm({ onClose, edit, data }: Props) {
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
                <Button colorScheme='teal' onClick={() => onAdd(onClose, toast)}>Add</Button>
            </ModalFooter>
        </>
    )
}

export default ScheduleForm