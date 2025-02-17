import React ,{useEffect, useState} from 'react'
import axios from "axios";
import {server} from "../index"
import { Container, HStack, Heading, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import { Image } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import ErrorComponent from './ErrorComponent';


const Exchanges = ()=>{

  const [exchanges , setExchanges] = useState([]); 
  const [loading , setLoading] = useState(true); 
  const [error , setError] = useState(false); 
  const [text , setText] = useState(""); 
  useEffect(() => {
    
    const fetchExchanges = async()=>{

      try {
        const { data } = await axios.get(`${server}/exchanges`);
      setExchanges(data);
      setLoading(false);
      console.log(data);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();

  }, [])
  
  if(error) return <ErrorComponent message={"Error while Fetching Exchanges"}/>;

  const changeHandler =(e)=>{
    setText(e.target.value)
  }

  return(
    
    <Container maxW={"container.xl"}>{loading?(<Loader/>) : (<> 
    
    <HStack wrap={"wrap"} justifyContent={"space-evenly"}>

    <input type='text' className='search' placeholder='Enter H the name' value={text} onChange={changeHandler}/>
    
    {exchanges.filter((val)=>{
      if(text == ""){
        return val;
      }else if(val.name.includes(text)){
        return val;
      }
    }).map((i) =>(
      
      <ExchangeCard 
      key={i.id}
      name={i.name} 
      img = {i.image}
       rank ={i.trust_score_rank} 
       url={i.url} 
      
       />
       
       // me

    ))};
    
    </HStack>
    
    
    </>
  )}
    
    </Container>

  );
}


const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);



export default Exchanges;