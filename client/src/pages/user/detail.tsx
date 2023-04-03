import { useEffect, useState } from 'react';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { AccountBox } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { User } from 'types';
import KvList from 'components/kv-list';
import axios from 'axios';

export default function UserDetail({
  loggedUser,
}: {
  loggedUser: User | null;
}) {
  const navigate = useNavigate();
  if (!loggedUser) {
    navigate('/login');
  }
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/user/${loggedUser?.id}`).then((res) => {
      setBalance(res.data.balance);
    });
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
            <AccountBox />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
            User Profile
          </Typography>
          <KvList
            kvs={[
              {
                key: 'Name',
                value: loggedUser?.username || '',
              },
              {
                key: 'Balance',
                value: `$ ${balance}`,
              },
            ]}
          />
        </Box>
      </Container>
    </>
  );
}
