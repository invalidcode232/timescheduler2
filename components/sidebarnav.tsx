import { Flex, ListItem, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
    name: string,
    href: string,
    icon: React.ReactNode,
}

function SidebarNav({ name, href, icon }: Props) {
    const [hovered, setHovered] = React.useState(false)

    return (
        <ListItem
            my={'1rem'}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            {...hovered ? { bg: 'gray.700' } : {}}
            padding={'0.5rem'}
            mx={'10px'}
            borderRadius={'5px'}
        >
            <a href={href}>
                <Flex>
                    {icon}
                    <Text fontSize={'md'} ml={'3'}>{name}</Text>
                </Flex>
            </a>
        </ListItem>
    )
}

export default SidebarNav