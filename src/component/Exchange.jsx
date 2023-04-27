import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import {server} from '../index';
import { Container, HStack } from '@chakra-ui/react';
import Loader from './Loader';
import ExchangeCard from './ExchangeCard';
import Error from './Error';

const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(false);

  const fetchExchanges = async () => {
    try {
      const { data } = await axios.get(`${server}/exchanges`);
      setExchanges(data);
      setLoading(false)
    } catch (error) {
      setError(true);
      setLoading(false)
    }
   
}
  useEffect(() => { 
    fetchExchanges();
  }, []);
 
  if (error) return <Error message ="Error While Fetching"/>
  return (
   
    <Container maxWidth={'container.xl'}>
      {loading ? <Loader /> : <>
        <HStack wrap={"wrap"}>
          {exchanges.map((exchange,index) => {
            return <ExchangeCard key={index} exchange={ exchange} />
          })}
      </HStack>
      </>}
    </Container>
  
  )
}

export default Exchange