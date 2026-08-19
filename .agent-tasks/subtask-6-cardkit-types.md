Перепиши `src/shared/ui/card/card.tsx`, заменив содержимое ПОЛНОСТЬЮ на следующий код:

```tsx
import React from 'react';
import { Box, BoxProps, Center, Text } from '@chakra-ui/react';

export interface CardKitProps extends BoxProps {
  title?: string;
  label?: string;
  gap?: string;
  children?: React.ReactNode;
}

export const CardKit = (props: CardKitProps) => {
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
      width={'300px'}
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
```

Что сделать:
1. Открой `src/shared/ui/card/card.tsx`.
2. Замени его содержимое ПОЛНОСТЬЮ на код из блока выше, один в один (единственное изменение по сути — `props: any` заменён на типизированный интерфейс `CardKitProps`, вся остальная логика и разметка идентичны).
3. Больше никаких файлов не трогай.

Готово когда:
- файл `src/shared/ui/card/card.tsx` содержит ровно этот код.

Действуй так: read_file src/shared/ui/card/card.tsx → edit_file с указанным выше содержимым. Не запускай tsc/npx/eslint/npm test.

/no_think
