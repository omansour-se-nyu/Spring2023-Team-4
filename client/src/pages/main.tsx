import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Product } from 'types';
import SearchBar from 'components/search-bar';

export default function Main() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    axios
      .get(
        keyword == ''
          ? 'http://localhost:8080/product/list'
          : `http://localhost:8080/product/list/search?product-name=${keyword}`
      )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [keyword]);

  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h3"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Home Page
          </Typography>
          <SearchBar setKeyword={setKeyword} />
        </Container>
      </Box>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                variant="outlined"
              >
                <CardMedia
                  component="img"
                  image={product.mainImageUrl}
                  height="200px"
                  alt="Product Image"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ height: 20 }} />
    </main>
  );
}
