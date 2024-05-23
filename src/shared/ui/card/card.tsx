import React from 'react';
import { Box, Center, Text } from '@chakra-ui/react';

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
      _hover={{ bg: 'green' }}
      transitionDuration="0.4s"
      borderRadius={'8px'}
      cursor={'pointer'}
      gap={gap}
      {...rest}
    >
      <Center maxW={'300px'}>
        <Text
          fontSize="2xl"
          textAlign={'center'}
          overflow={'hidden'}
          whiteSpace={'nowrap'}
          textOverflow={'ellipsis'}
        >
          {label}
        </Text>
      </Center>
      {children}
    </Box>
  );
};
