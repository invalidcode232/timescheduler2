import { Button, useDisclosure } from '@chakra-ui/react'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import React from 'react'
import { scheduler } from '../../utils/context'
import ModalForm from '../modalform';
import ScheduleForm from './scheduleform';

type Props = {
  reference: DocumentReference,
  data: DocumentData,
}

function EditMenu({ reference, data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <button style={{ "marginRight": "10px" }} onClick={() => scheduler.delete(reference)}><FaTrash /></button>
      <button onClick={onOpen}><FaPencilAlt /></button>

      <ModalForm isOpen={isOpen} name={'Edit schedule'} onClose={onClose}>
        <ScheduleForm edit={true} onClose={onClose} data={data} />
      </ModalForm>
    </>
  )
}

export default EditMenu