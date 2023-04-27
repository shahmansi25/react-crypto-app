import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import {server} from '../index';
import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack} from '@chakra-ui/react';
import Error from './Error';
import ChartComponent from './Chart';


const CoinsDetail = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState('24h');
  const [chartData, setChartData] = useState([]);
  const parms = useParams();
  const currencySymbol = currency === 'inr' ? '₹' : (currency === 'usd' ? '$' : ' €');
  const btns = ["24h", "7d", "14d", "30d", "60d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);    
        break;
        case "7d":
        setDays("7d");
        setLoading(true);    
        break;
        case "14d":
        setDays("14d");
        setLoading(true);    
        break;
        case "1y":
        setDays("365d");
        setLoading(true);    
        break;
        case "60d":
        setDays("14d");
        setLoading(true);    
        break;
        case "max":
          setDays("max");
          setLoading(true);    
          break;
    
      default:
        setDays("24h");
        setLoading(true); 
        break;
    };
  }


  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(`${server}/coins/${parms.id}`);
      const { data:chartData } = await axios.get(`${server}/coins/${parms.id}/market_chart?vs_currency=${currency}&days=${days}`);

      setCoin(data);
      setChartData(chartData.prices);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false)
    } 
  }

  const CustomBar = () => {
    return (
      <VStack w={"full"}>
        <Progress value={"50"} colorScheme='teal' w="full"></Progress>
        <HStack justifyContent={"space-between"} w="full">
          <Badge children={`${currencySymbol} ${coin.market_data.low_24h[currency]}`} colorScheme='red'></Badge>
          <Text>24h Range</Text>
          <Badge children={`${currencySymbol} ${coin.market_data.high_24h[currency]}`} colorScheme='green'></Badge>

        </HStack>
    </VStack>
    )
  
  }

  const Item = ({title,value}) => {
    return (
      <HStack justifyContent={'space-between'} w="full" my="4">
        <Text fontWeight={'900'} letterSpacing={"widest"}>{title}</Text>
        <Text>{ value}</Text>
     </HStack>
   ) 
  }

  useEffect(() => { 
    fetchCoin();
  }, [parms.id,currency,days]);

  if (error) return <Error message="Error While Fetching" />

  return (
    <Container maxW={'container.xl'}>
      {loading ? <Loader /> : <>
        <Box borderWidth={"1"} w="full" >
          <ChartComponent arr = {chartData} days= {days} currency ={currencySymbol} />
        </Box>

        <HStack p= {"4"} overflowX={'auto'}>
          {btns.map((i) => {
           return <Button colorScheme= {days === i ?'green' :'gray'} key={i} onClick={() =>switchChartStats(i)}>{ i}</Button>
          })}
    </HStack>
        <RadioGroup value ={currency} onChange={setCurrency}>
          <HStack spacing={'4'} >
            <Radio value={"inr"}>INR</Radio>
            <Radio value={"usd"}>USD</Radio>
            <Radio value ={"eur"}>EUR</Radio>
          </HStack>
        </RadioGroup>
        <VStack spacing={"4"} p={"16"} alignItems={'flex-start'}>
          <Text fontSize="small" alignSelf={'center'} opacity={'0.7'}>Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}</Text>
          <Image src={coin.image.large} w={"16"} h={"16"} objectFit={'contain'}></Image>
          <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>{currencySymbol} {coin.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
              <StatArrow type= {coin.market_data.price_change_percentage_24h > 0  ?'increase':'decrease'} />
              {coin.market_data.price_change_percentage_24h}%
            </StatHelpText>
          </Stat>
          <Badge fontSize={"2xl"} bgColor={'blackAlpha.900'} color={'white'}>
            {`#${coin.market_cap_rank}`}
          </Badge>
          <CustomBar></CustomBar>
          <Box w={"full"} p="4">
            {coin.market_data.max_supply && <Item title={"Max Supply"} value={coin.market_data.max_supply}></Item> }
            {coin.market_data.circulating_supply && <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply}></Item> } 
            {coin.market_data.market_cap[currency] && <Item title ={"Market Cap"} value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`}></Item> } 
            {coin.market_data.atl && <Item title={"All time Low"}  value={`${currencySymbol} ${coin.market_data.atl[currency]}`}></Item> } 
            {coin.market_data.ath && <Item title={"All time High"}  value={`${currencySymbol} ${coin.market_data.ath[currency]}`}></Item> } 

          </Box>
        </VStack>
      </>}
    </Container>
  )
}

export default CoinsDetail