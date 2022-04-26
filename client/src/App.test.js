import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from "react-router-dom";

it('renders learn react link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    );
  const linkElement = screen.getByText('WELCOME');
  screen.debug();
  expect(linkElement).toBeInTheDocument();
});
