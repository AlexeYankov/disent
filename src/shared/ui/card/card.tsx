import { Box, Center, Text } from '@chakra-ui/react';

export const CardKit = (props: any) => {
  const { title, children, label, gap = '25px', ...rest } = props;
  return (
    <Box
      bg="dark.--color-dark-700"
      border="1px solid"
      borderColor={'dark.--color-dark-500'}
      p="2"
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      gap={gap}
      {...rest}
    >
      <Center>
        <Text fontSize="2xl">{label}</Text>
      </Center>
      {children}
    </Box>
  );
};