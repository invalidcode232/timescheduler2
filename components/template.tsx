import { Container, Flex, useMediaQuery } from '@chakra-ui/react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
// import MobileSidebar from './mobilesidebar'
import Hamburger from './hamburger'
import { FaBook, FaCalendar } from 'react-icons/fa'
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion'

type Props = {
    title: string,
    children: React.ReactNode
}

const navigation = [
    {
        name: 'Todo',
        href: '/todo',
        icon: <FaBook />,
    },
    {
        name: 'Schedules',
        href: '/scheduler',
        icon: <FaCalendar />,
    },
]

const activeNav = {
    inactive: {
        marginLeft: '-30rem',
    },
    active: {
        marginLeft: '0rem',
    },
}

function Template({ title, children: child }: Props) {
    const [isDesktop, setDesktop] = useState(false);

    useEffect(() => {
        let listener: any = null;

        if (window !== undefined) {
            setDesktop(window.innerWidth > 768);

            listener = window.addEventListener('resize', () => {
                setDesktop(window.innerWidth > 768);
            })
        }

        return () => {
            if (listener !== null) {
                window.removeEventListener('resize', listener);
            }
        }
    }, [])

    // for mobile displays
    const [showNav, setShowNav] = React.useState(false);

    let margin = useMotionValue(-30);
    let springMargin = useSpring(margin);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            { isDesktop ? null : <Hamburger showNav={showNav} setShowNav={setShowNav} margin={margin}/>}

            <Flex>
                {/* { isDesktop ? <Sidebar navigation={navigation} isDesktop={isDesktop} showNav={showNav} setShowNav={setShowNav}/> : <MobileSidebar showNav={showNav} setShowNav={setShowNav} navigation={navigation}/> } */}
                <Sidebar navigation={navigation} isDesktop={isDesktop} showNav={showNav} setShowNav={setShowNav} margin={springMargin}/>
                <Container maxW={'container.lg'} marginY={'5'}>
                    {child}
                </Container>
            </Flex>
        </>
    )
}

export default Template