import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react';


export const CardKit = (props: any) => {
  const { title, children, label, gap = '5px', ...rest } = props;
  return (
    <Box
      bg="dark.--color-dark-700"
      border="1px solid"
      borderColor={'dark.--color-dark-500'}
      p="2"
      display={'flex'}
      alignItems={'center'}
      justifyContent={'start'}
      flexDirection={'column'}
      _hover={{bg: 'green'}}
      transitionDuration="0.4s"
      borderRadius={'8px'}
      cursor={'pointer'}
      gap={gap}
      {...rest}
    >
      <Center>
        <Text fontSize="2xl" textAlign={'center'}>{label}</Text>
      </Center>
      {children}
    </Box>
  );
};
