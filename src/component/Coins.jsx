import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import {server} from '../index';
import { Button, Container, HStack, Heading, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';
import { Link } from 'react-router-dom';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');
  const btn = new Array(132).fill(1);
  const currencySymbol = currency === 'inr' ? '₹' : (currency === 'usd' ? '$' : ' €');
  
  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
      setCoins(data);
      setLoading(false)
    } catch (error) {
      setError(true);
      setLoading(false)
    } 
  }

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }

  useEffect(() => { 
    fetchCoins();
  }, [currency,page]);

  const CoinsCard = ({ coin  }) => {
    return (
      <Link to= {`${coin.id}`} > 
        <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={"lg"} transition={'all 0.3s'} m={"4"} css={{ "&:hover": { transform: "scale(1.1)" } }}>
          <Image src={coin.image} w={'10'} h={'10'} objectFit={'contain'} alt='Exchange'></Image>
                <Heading size={'md'} noOfLines={'1'}>{coin.symbol}</Heading>
          <Text>{coin.name}</Text>
          <Text>{coin.current_price ? currencySymbol  + coin.current_price :'NA'}</Text>
           </VStack>
      </Link>
    
  )
  }
  
  if (error) return <Error message="Error While Fetching" />
  
  return (
   
    <Container maxWidth={'container.xl'}>
      {loading ? <Loader /> : <>
        <RadioGroup value ={currency} onChange={setCurrency}>
          <HStack spacing={'4'} >
            <Radio value={"inr"}>INR</Radio>
            <Radio value={"usd"}>USD</Radio>
            <Radio value ={"eur"}>EUR</Radio>
          </HStack>
        </RadioGroup>
        <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
          {coins.map((coin,index) => {
            return <CoinsCard key={index} coin={coin} currencySymbol={currency } />
          })}
        </HStack>
        <HStack w="full" overflowX={"auto"} p={'8'}>
          {btn.map((item, i) => {
           return <Button key={i} bgColor={"blackAlpha.900"} color={'white'} onClick={() => { changePage(i+1) }}>{ i + 1}</Button>
          })
          }
        </HStack>
      </>}
    </Container>
  
  )


}

export default Coins