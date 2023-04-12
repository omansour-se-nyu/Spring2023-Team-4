import { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';

type Message = {
  senderId: number;
  receiverId: number;
  content: string;
};

export default function ChatBox({
  senderId,
  receiverId,
  productId,
}: {
  senderId: number;
  receiverId: number;
  productId: number;
}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get(`http://localhost:8080/message/${productId}`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const addMessage = () => {
    axios
      .get(
        `http://localhost:8080/message?sender-id=${senderId}&receiver-id=${receiverId}&product-id=${productId}&content=${message}`
      )
      .then((res) => {
        setMessages([...messages, res.data]);
      })
      .finally(() => {
        setMessage('');
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="80vh"
        justifyContent="center"
      >
        <Box
          height="70vh"
          width="100%"
          border="1px solid #ccc"
          borderRadius={8}
          padding={2}
          overflow="auto"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              marginBottom={1}
              alignItems={
                message.senderId != senderId ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                maxWidth="70%"
                padding={1}
                borderRadius={8}
                bgcolor={message.senderId != senderId ? '#f0f0f0' : '#e1f5fe'}
              >
                <Typography variant="body1">{message.content}</Typography>
              </Box>
              <Typography variant="caption">
                {message.senderId == senderId
                  ? 'Me'
                  : `User ${message.senderId}`}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box display="flex" marginTop={2} width="100%">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                addMessage();
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              addMessage();
            }}
            style={{ marginLeft: '8px' }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
