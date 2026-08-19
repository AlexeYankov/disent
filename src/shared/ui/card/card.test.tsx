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