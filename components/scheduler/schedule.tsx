import React, { useState } from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore'
import { motion, Variants } from 'framer-motion'
import EditMenu from './editmenu'
import { ScheduleData } from '../../ts/types'

function timestampToTime(timestamp: Timestamp) {
  const date = new Date(timestamp.seconds * 1000)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  const hours12 = hours % 12

  const minutesStr = minutes < 10 ? `0${minutes}` : minutes
  const hoursStr = hours12 < 10 ? `0${hours12}` : hours12

  return `${hoursStr}:${minutesStr} ${ampm}`
}

function daysToString(days: Array<string>) {
  let dayStr = '';

  days.forEach((day) => {
    dayStr = dayStr.concat(day, '/');
  });

  return dayStr.slice(0, -1);
}


type Props = {
  data: ScheduleData,
  reference: DocumentReference
}

const hoveredBg = {
  hovered: {
    "background-color": "rgba(0, 0, 0, 0.1)"
  },

  inactive: {
    "background-color": "rgba(0, 0, 0, 0)"
  },
}

const hoveredMenu = {
  hovered: {
    "margin-left": "0.5rem",
    "opacity": 1,
    "display": "flex",
  },

  inactive: {
    "margin-left": "0rem",
    "opacity": 0,
    "display": "none",
  },
}

function Schedule({ data, reference }: Props) {
  const [showDisplayMenu, setDisplayMenu] = useState(false);

  return (
    <motion.div
      animate={showDisplayMenu ? 'hovered' : 'inactive'}
      variants={hoveredBg as Variants}
      style={{
        "borderRadius": 5,
        "padding": 10,
      }}
    >
      <Flex
        justifyContent={'space-between'}
        onMouseEnter={() => {
          setDisplayMenu(true);
        }}
        onMouseLeave={() => {
          setDisplayMenu(false)
        }}
      >
        <Text>{data.name}</Text>
        <div>
          <Flex>
            <Text mr={'3'} color={'gray'}>{daysToString(data.repeatEvery)}</Text>
            <Text>{timestampToTime(data.time)}</Text>
            <motion.div
              animate={showDisplayMenu ? 'hovered' : 'inactive'}
              variants={hoveredMenu as Variants}
            >
              <EditMenu reference={reference} data={data} />
            </motion.div>
          </Flex>
        </div>
      </Flex>
    </motion.div>
  )
}

export default Schedule