import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Login from 'pages/login';

describe('Login', () => {
  it('should show the button', async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Login setLoggedUser={() => {}} />
      </BrowserRouter>
    );
    expect(getByRole('button')).toBeInTheDocument();
  });
});
