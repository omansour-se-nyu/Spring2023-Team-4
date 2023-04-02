import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Register from 'pages/register';

describe('Register', () => {
  it('should show the button', async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(getByRole('button')).toBeInTheDocument();
  });
});
