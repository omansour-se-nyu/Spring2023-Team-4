import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { Product, User } from 'types';
import KvList from 'components/kv-list';
import ChatBox from 'components/chat-box';

export default function ProductDetail({
  loggedUser,
}: {
  loggedUser: User | null;
}) {
  const navigate = useNavigate();

  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      {product && (
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <img
                src={product.mainImageUrl}
                alt="Product Image"
                style={{
                  width: '200px',
                  objectFit: 'contain',
                }}
              />
            </Box>

            <KvList
              kvs={[
                {
                  key: 'Name',
                  value: product.name,
                },
                {
                  key: 'Price',
                  value: `$ ${product.price}`,
                },
                {
                  key: 'Description',
                  value: product.description,
                },
              ]}
            />
            <Box display="flex" justifyContent="center" paddingTop="10px">
              <Button
                variant="contained"
                onClick={() => {
                  axios
                    .put(
                      `http://localhost:8080/product/buyer?user-id=${loggedUser?.id}&product-id=${id}`
                    )
                    .then(() => {
                      navigate('/');
                    })
                    .catch((err) => {
                      toast.error(err.response.data);
                    });
                }}
              >
                Buy
              </Button>
            </Box>
          </Container>
        </Box>
      )}
      {loggedUser && (
        <ChatBox
          senderId={loggedUser?.id}
          receiverId={product?.sellerId}
          productId={id}
        />
      )}
      <Toaster />
    </main>
  );
}
