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
      px={'25px'}
      paddingBottom={'25px'}
      gap={'30px'}
      minWidth={'375px'}
      width={'375px'}
      title={'подробней'}
    >
      {props.children}
    </Box>
  );
};