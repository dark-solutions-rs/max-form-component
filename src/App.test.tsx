import { render, screen } from '@testing-library/react';
import App from './App';

test('renders custom form', () => {
  render(<App />);
  const linkElement = screen.getByText(/custom form/i);
  expect(linkElement).toBeInTheDocument();
});
