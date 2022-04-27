import { useDisclosure } from '@chakra-ui/react'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import React from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { TodoData } from '../../ts/types'
import { todos } from '../../utils/context'
import ModalForm from '../modalform'
import TodoForm from './todoform'

type Props = {
  reference: DocumentReference,
  data: DocumentData
}

function EditMenu({ reference, data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <button style={{ "marginRight": "10px" }} onClick={() => todos.delete(reference)}><FaTrash /></button>
      <button onClick={onOpen}><FaPencilAlt /></button>

      <ModalForm isOpen={isOpen} name={'Edit schedule'} onClose={onClose}>
        <TodoForm edit={true} onClose={onClose} data={data as TodoData} reference={reference}/>
        {/* <ScheduleForm edit={true} onClose={onClose} data={data} /> */}
      </ModalForm>
    </>
  )
}

export default EditMenu