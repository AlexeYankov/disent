import { Box } from '@chakra-ui/react';

type ContainerType = {
  children: React.ReactNode;
};

export const Container = (props: ContainerType) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      maxW={'1440px'}
      paddingBottom={'25px'}
      px={'25px'}
      gap={'30px'}
      title={'подробней'}
    >
      {props.children}
    </Box>
  );
};