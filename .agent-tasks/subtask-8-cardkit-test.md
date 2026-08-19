Создай новый файл `src/shared/ui/card/card.test.tsx` со следующим содержимым (файла раньше не было, создай его):

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import { CardKit } from './card';

describe('CardKit', () => {
  it('renders label text', () => {
    render(
      <ChakraProvider>
        <CardKit label="Germany" />
      </ChakraProvider>
    );
    expect(screen.getByText('Germany')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <ChakraProvider>
        <CardKit label="Germany">
          <span>child content</span>
        </CardKit>
      </ChakraProvider>
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('renders without optional props', () => {
    const { container } = render(
      <ChakraProvider>
        <CardKit />
      </ChakraProvider>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
```

Что сделать:
1. Создай файл `src/shared/ui/card/card.test.tsx` с содержимым из блока выше, один в один.
2. Больше никаких файлов не трогай и не создавай.

Готово когда:
- файл `src/shared/ui/card/card.test.tsx` существует и содержит ровно этот код.

Действуй так: edit_file src/shared/ui/card/card.test.tsx сразу с указанным содержимым (файл новый, читать перед этим не нужно). Не запускай tsc/npx/eslint/npm test/vitest.

/no_think
