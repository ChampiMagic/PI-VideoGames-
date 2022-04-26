import { render, screen } from '@testing-library/react';
import Specific from '../components/specific_page/specific.jsx';

 it('Should render a loading', () => {
   render(<Specific />);
   const div = screen.getByRole('heading')
   expect(div).toBeInTheDocument();
 })
