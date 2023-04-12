import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { ChangeEvent } from 'react';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { User } from 'types';

AWS.config.update({
  accessKeyId: 'AKIARCERPPVHWPQQUC3X',
  secretAccessKey: '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',
});
const s3 = new AWS.S3();

export default function ProductPost({
  loggedUser,
}: {
  loggedUser: User | null;
}) {
  const navigate = useNavigate();

  if (!loggedUser) {
    navigate('/login');
  }

  const [imageFile, setImageFile] = useState<File>();
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      description: '',
    },
    validationSchema: yup.object({
      name: yup.string().min(2).max(20).required('Name is required'),
      price: yup.number().required('Price is required'),
    }),

    onSubmit: () => {
      const fileName = `${uuidv4()}.${imageFile?.type.split('/').at(-1)}`;
      const params = {
        Bucket: 'nyused',
        Key: fileName,
        Body: imageFile,
      };
      s3.upload(params)
        .promise()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post('http://localhost:8080/product/post', {
          ...formik.values,
          mainImageUrl: `https://nyused.s3.amazonaws.com/${fileName}`,
          sellerId: loggedUser?.id,
          buyerId: null,
          sold: false,
        })
        .then(() => {
          setTimeout(() => navigate('/'), 500);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data);
        });
    },
  });

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
            <PostAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Product Post
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name ? formik.errors.name : ''}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Price"
              name="price"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price ? formik.errors.price : ''}
              sx={{ mb: 2 }}
            />
            <Button
              component="label"
              variant="contained"
              fullWidth
              sx={{ mb: 2 }}
            >
              {imageFile ? 'Re-select image' : 'Select image'}
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                hidden
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  if (!e.target.files) {
                    return;
                  }
                  setImageFile(e.target.files[0]);
                }}
              />
            </Button>
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description ? formik.errors.description : ''
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
              Post
            </Button>
          </Box>
        </Box>
      </Container>
      <Toaster />
    </>
  );
}
