import { Button, Container, Divider, Flex, Heading, Spacer, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from 'react'
import { NextPage } from "next"
import { QueryDocumentSnapshot } from "firebase/firestore";
import { scheduler } from "../../utils/context";
import Loading from '../../components/loading';
import Head from "next/head";
import ModalForm from "../../components/modalform";
import ScheduleForm from "../../components/scheduler/scheduleform";
import Schedule from "../../components/scheduler/schedule";
import { FaPlus } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import Template from "../../components/template";
import { ScheduleData } from "../../ts/types";

let audio: any;
if (typeof Audio !== 'undefined') {
    audio = new Audio('/alarm.mp3');
}

const Scheduler: NextPage = () => {
    const [schedules, setSchedules] = useState([] as Array<QueryDocumentSnapshot>);
    const [isLoading, setLoading] = useState(true);
    const triggerToast = useToast();


    useEffect(() => {
        const snapshotCallback = scheduler.fetch((docs: Array<QueryDocumentSnapshot>) => {
            setSchedules(docs);
            setLoading(false);
        })

        return snapshotCallback;
    }, []);

    useEffect(() => {
        const triggerInterval = setInterval(() => {
            scheduler.shouldTrigger().then((trigger: boolean | any) => {
                if (trigger !== false) {
                    if (typeof Audio !== 'undefined') {
                        audio.play();
                    }

                    triggerToast({
                        title: 'Time\'s up!',
                        description: `Time to do task`,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })

                    scheduler.setDone(trigger);
                }
            })
        }, 1000);

        return () => clearInterval(triggerInterval);
    }, [schedules, triggerToast]);

    // let page = isLoading ? <Loading /> : <Heading>Hello world!</Heading>;
    let data = schedules.map(schedule => {
        const scheduleData = schedule.data()
        return <Schedule key={scheduleData.id} data={scheduleData as ScheduleData} reference={schedule.ref}></Schedule>
    })

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Template title="Schedules">
                <Flex justifyContent={'space-between'}>
                    <Heading>Schedules</Heading>
                    <div>
                        <Button onClick={onOpen}><FaPlus /></Button>

                        <ModalForm isOpen={isOpen} name={'Add schedule'} onClose={onClose}>
                            <ScheduleForm onClose={onClose} edit={false} />
                        </ModalForm>
                    </div>
                </Flex>

                <Spacer marginY={'5'} />

                {data}

            </Template>
        </>
    );
}

export default Scheduler