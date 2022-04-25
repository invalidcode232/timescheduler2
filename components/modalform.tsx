import { Modal, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

type Props = {
    isOpen: boolean,
    onClose: () => void,
    name: string,
    children: React.ReactNode
}

function ModalForm({ isOpen, name, onClose, children }: Props) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{name}</ModalHeader>
                {children}
            </ModalContent>
        </Modal>
    )
}

export default ModalForm