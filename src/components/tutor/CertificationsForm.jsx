import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addCertification } from '../../redux/slices/signUpSlice';
import { axiosPatch, axiosPost } from '../../axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { FilePresent } from '@mui/icons-material';

// Schema validation with yup
const schema = yup.object().shape({
  title: yup.string().required('Certificate title is required'),
  image: yup
    .mixed()
    .test('fileType', 'Only JPEG files are allowed', (value) => {
      if (value && value[0]) {
        const fileType = value[0].type;
        const fileName = value[0].name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        return (
          fileType === 'image/jpeg' ||
          fileType === 'image/jpg' ||
          fileExtension === 'jpeg' ||
          fileExtension === 'jpg'
        );
      }
      return false;
    })
    .required('Certificate image is required'),
});

// Utility function to convert image to Base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const CertificationsForm = ({ reRender, show }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const base64Image = await convertToBase64(data.image[0]);

      const certificationData = {
        title: data.title,
        image: base64Image,
      };

      dispatch(addCertification(certificationData));
      toast.success('Certification added successfully!');
      reset();
      // reRender("uploaded"); 
    } catch (error) {
      console.error('Error converting image to Base64:', error);
      toast.error('Failed to add certification.');
    }
  };

  const user_id = useSelector((state) => state.auth.id)

  const token = useSelector((state) => state.auth.access)
  const onAccountSubmit = async (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('image', data.image[0])
    
    try {
      const response = await axiosPost('accounts/certificates/', formData, token)
      console.log(response);
      
      if( response.status === 201){
        toast.success("certificate added")
        await axiosPatch(`accounts/profile/${user_id}`,{"is_approved" : false, "is_submitted":true}, token)
      }
      reRender(`${response.data.id} added`)
      toast.success("Certificate Added")
      reset()
      show(false)
    } catch (error) {
      console.log("err", error);
    }
  }

  const handleFormSubmit = (data) => {
    if (token) {
      onAccountSubmit(data);      
    } else {
      onSubmit(data);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      encType="multipart/form-data"
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 1,
        border: "2px solid",
        borderColor: "grey.300",
        position: "relative",
      }}
    >
      <Box mb={3}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Certificate Title"
              variant="outlined"
              fullWidth
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ""}
            />
          )}
        />
      </Box>
      <Box mb={3}>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <Button
              variant="outlined"
              component="label"
              fullWidth
              color={errors.image ? "error" : "primary"}
            >
              Upload Certificate Image (JPEG only)
              <input
                type="file"
                accept="image/jpeg, image/jpg"
                hidden
                onChange={(e) => field.onChange(e.target.files)}
              />
            </Button>
          )}
        />
        {errors.image && (
          <Typography color="error" variant="body2">
            {errors.image.message}
          </Typography>
        )}
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Certification
      </Button>
    </Box>
  );
};

export default CertificationsForm;
