import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Header from 'components/header';

describe('Header', () => {
  it('should show the title', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header loggedUser={null} setLoggedUser={() => {}} />
      </BrowserRouter>
    );
    expect(getByText('NYUsed')).toBeInTheDocument();
  });
});
