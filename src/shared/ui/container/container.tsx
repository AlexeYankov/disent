import { Box } from '@chakra-ui/react';

type ContainerType = {
  children: React.ReactNode;
};

export const Container = (props: ContainerType) => {
  const { children } = props;
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      maxW={'1440px'}
      width={'100%'}
      px={'25px'}
      paddingBottom={'25px'}
      gap={'30px'}
    >
      {children}
    </Box>
  );
};