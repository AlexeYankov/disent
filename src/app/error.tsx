'use client';

import { Button, Center, Text } from '@chakra-ui/react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Center flexDirection={'column'} p="7" marginTop="40px" gap={'20px'}>
      <Text fontSize="2xl">Что-то пошло не так</Text>
      <Text color="gray.400">{error.message}</Text>
      <Button onClick={reset}>Попробовать снова</Button>
    </Center>
  );
}
