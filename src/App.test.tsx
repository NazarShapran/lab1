import { render } from '@testing-library/react';
import App from './App'; // Або інший твій головний компонент
import { describe, expect, it } from 'vitest';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
        expect(document.body).toBeInTheDocument();
  });
});