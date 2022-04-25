import { Button, chakra, Divider, Flex, Heading, List } from '@chakra-ui/react'
import { motion, MotionValue } from 'framer-motion'
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import SidebarNav from './sidebarnav'

type Props = {
    navigation: Array<any>,
    isDesktop: boolean,
    showNav: boolean,
    setShowNav: (showNav: boolean) => void,
    margin: MotionValue,
}

const ChakraDiv = chakra(motion.div)
function Sidebar({ navigation, isDesktop, showNav, setShowNav, margin }: Props) {
    let navLinks = navigation.map((nav, index) => {
        return <SidebarNav key={index} name={nav.name} href={nav.href} icon={nav.icon} />
    })

    // useSpring()
    // display={(isDesktop || showNav) ? 'block' : 'none'}

    return (
        <>
            <ChakraDiv backgroundColor={'rgb(22, 27, 37, 255)'} display={(isDesktop || showNav) ? 'block' : 'none'} h={'100vh'} w={'15rem'} position={isDesktop ? 'relative' : 'absolute'}>
                <Flex flexDir={'column'}>
                    {/* <Heading fontSize={'2xl'} padding={'1rem'} mt={'5'}>Timescheduler</Heading> */}
                    <Flex justifyContent={'space-between'}>
                        <Heading fontSize={'2xl'} padding={'1rem'} mt={'5'}>Timescheduler</Heading>
                        {isDesktop ? null : <Button backgroundColor={'transparent'} fontSize={'2xl'} padding={'1rem'} mt={'7'} mr={'1rem'} onClick={() => setShowNav(false)}><FaTimes /></Button>}
                    </Flex>

                    <Divider />
                    {/* <Divider padding={'0.5rem'}/> */}
                    <List>
                        {navLinks}
                    </List>
                </Flex>
            </ChakraDiv>
        </>
    )
}

export default Sidebar