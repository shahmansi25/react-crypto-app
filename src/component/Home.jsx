import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { motion } from "framer-motion";


const Home = () => {
  return (
    <Box bgColor={'blackAlpha.900'} w="full" h={"85vh"}>
      <motion.div
        style={{
          height: "80vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}

      >
   <Image w="full" h="full" objectFit={'contain'} src= {"https://upload.wikimedia.org/wikipedia/commons/5/50/Bitcoin.png"}  filter= {"grayScale(1)"}></Image>
      </motion.div>
      <Text fontSize={"6xl"} textAlign="center" color={"whiteAlpha.700"} fontWeight="thin">Crypto X</Text>
    </Box>
  )
}

export default Home