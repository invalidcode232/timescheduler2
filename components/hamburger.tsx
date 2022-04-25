import { Button } from '@chakra-ui/react'
import { MotionValue } from 'framer-motion'
import React from 'react'
import { FaBars } from 'react-icons/fa'

type Props = {
  showNav: boolean,
  setShowNav: (showNav: boolean) => void,
  margin: MotionValue,
}

function Hamburger({ showNav, setShowNav, margin }: Props) {
  return (
    <Button display={showNav ? 'none' : 'block'} onClick={() => setShowNav(true)} backgroundColor={'transparent'} mt={'1rem'}><FaBars /></Button>
  )
}

export default Hamburger