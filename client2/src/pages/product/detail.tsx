import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography } from '@mui/material';

import { Product } from 'types';
import KvList from 'components/kv-list';

export default function ProductDetail() {
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
          </Container>
        </Box>
      )}
    </main>
  );
}
