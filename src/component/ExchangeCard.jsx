import { Heading, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react'

const ExchangeCard = ({ exchange }) => {
    console.log(exchange);
    return (
        <a href ={exchange.url} target = '_blank'> 
            <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={"lg"} transition={'all 0.3s'} m ={"4"} css={{"&:hover": {transform: "scale(1.1)"}}}>                <Image src={exchange.image} w={'10'} h={'10'} objectFit={'contain'} alt='Exchange'></Image>
                <Heading size={'md'} noOfLines={'1'}>{exchange.trust_score_rank}</Heading>
                <Text>{ exchange.name}</Text>
           </VStack>
        </a>
    
  )
}

export default ExchangeCard