import React from 'react';
import img from '/public/images/404Page.svg';
import Image from 'next/image';
import { Center } from '@chakra-ui/react';

const NotFoundPage = () => {
  return (
    <Center flexDirection={'column'} p="7" marginTop="40px" gap={'20px'}>
      <h1>Ooops!</h1>
      <p>Page not found</p>
      <Image src={img} alt="404" />
    </Center>
  );
};

export default NotFoundPage;