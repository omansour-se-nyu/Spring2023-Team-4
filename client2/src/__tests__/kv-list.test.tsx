import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import KvList from 'components/kv-list';

describe('KV list', () => {
  it('should show the value', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <KvList
          kvs={[
            {
              key: 'Name',
              value: 'Desk',
            },
          ]}
        />
      </BrowserRouter>
    );
    expect(getByText('Desk')).toBeInTheDocument();
  });
});
