import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Inventory } from '@mui/icons-material';
import axios from 'axios';

import { Product, User } from 'types';

export default function ProductList({
  loggedUser,
}: {
  loggedUser: User | null;
}) {
  const navigate = useNavigate();

  const [sellingProducts, setSellingProducts] = useState<Product[]>([]);
  const [boughtProducts, setBoughtProducts] = useState<Product[]>([]);
  const [soldProducts, setSoldProducts] = useState<Product[]>([]);
  const [deleteTime, setDeleteTime] = useState<number>(0);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/product/list').then((res) => {
      if (tabIndex == 0) {
        setSellingProducts(
          res.data.filter(
            (product: Product) =>
              product.sellerId == loggedUser?.id && product.buyerId == null
          )
        );
      } else if (tabIndex == 1) {
        setBoughtProducts(
          res.data.filter(
            (product: Product) => product.buyerId == loggedUser?.id
          )
        );
      } else if (tabIndex == 2) {
        setSoldProducts(
          res.data.filter(
            (product: Product) =>
              product.sellerId == loggedUser?.id && product.buyerId != null
          )
        );
      }
    });
  }, [tabIndex, deleteTime]);

  return (
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
        <Inventory />
      </Avatar>
      <Typography component="h1" variant="h5">
        Product List
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={(event: React.SyntheticEvent, newValue: number) => {
          setTabIndex(newValue);
        }}
        centered
        sx={{ pb: 1 }}
      >
        <Tab label="Selling" />
        <Tab label="Bought" />
        <Tab label="Sold" />
      </Tabs>
      <Container maxWidth="md">
        <div hidden={tabIndex != 0}>
          <Grid container spacing={4}>
            {sellingProducts.map((product) => (
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
                    <Button
                      size="small"
                      onClick={() => {
                        navigate(`/product/edit/${product.id}`);
                      }}
                      color="warning"
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        axios.delete(
                          `http://localhost:8080/product/${product.id}`
                        );
                        setTimeout(() => {
                          setDeleteTime(Date.now());
                        }, 500);
                      }}
                      color="error"
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <div hidden={tabIndex != 1}>
          <Grid container spacing={4}>
            {boughtProducts.map((product) => (
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
        </div>
        <div hidden={tabIndex != 2}>
          <Grid container spacing={4}>
            {soldProducts.map((product) => (
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
        </div>
      </Container>
      <Box sx={{ height: 20 }} />
    </Box>
  );
}
