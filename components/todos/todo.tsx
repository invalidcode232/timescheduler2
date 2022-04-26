import React, { useState } from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore'
import { motion, Variants } from 'framer-motion'
import moment from 'moment'
import { TodoData } from '../../ts/types'
// import EditMenu from './editmenu'

function timestampToDate(timestamp: Timestamp) {
  return moment(timestamp.toDate()).format('DD MMM, YYYY');
}

function daysToString(days: Array<string>) {
  let dayStr = '';

  days.forEach((day) => {
    dayStr = dayStr.concat(day, '/');
  });

  return dayStr.slice(0, -1);
}

// interface TodoData {
//   name: string,
//   description: string,
//   duedate: Timestamp,
//   isDone: boolean,
// }

type Props = {
  data: TodoData,
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

function Todo({ data, reference }: Props) {
  const [showDisplayMenu, setDisplayMenu] = useState(false);
  // console.log(data.duedate)

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
            <Text mr={'3'} color={'gray'}>{data.description}</Text>
            {data.duedate ? <Text>{timestampToDate(data.duedate)}</Text> : null}
            <motion.div
              animate={showDisplayMenu ? 'hovered' : 'inactive'}
              variants={hoveredMenu as Variants}
            >
              {/* <EditMenu reference={reference} data={data} /> */}
            </motion.div>
          </Flex>
        </div>
      </Flex>
    </motion.div>
  )
}

export default Todo