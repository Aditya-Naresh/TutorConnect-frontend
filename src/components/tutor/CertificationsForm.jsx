import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCertification } from "../../redux/slices/signUpSlice";
import { axiosPatch, axiosPost } from "../../axios";
import { Box, Button, TextField, Typography } from "@mui/material";

// Schema validation with yup
const schema = yup.object().shape({
  title: yup.string().required("Certificate title is required"),
  file: yup
    .mixed()
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (value && value[0]) {
        const fileType = value[0].type;
        return fileType === "application/pdf";
      }
      return false;
    })
    .required("Certificate file is required"),
});

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
  const user_id = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.access);

  // Helper function to convert file to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle submission for the form
  const onSubmit = async (data) => {
    try {
      const file = data.file[0];

      // Convert the file to base64 string
      const base64File = await convertFileToBase64(file);

      const certificationData = {
        title: data.title,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        fileBase64: base64File,
      };

      // Add certification metadata to Redux
      dispatch(addCertification(certificationData));
      toast.success("Certification added successfully!", {
        position: "top-center",
      });
      reset();
      // reRender("uploaded");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to add certification.", { position: "top-center" });
    }
  };

  // Handle API submission for the form
  const onAccountSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("file", data.file[0]);

    try {
      const response = await axiosPost(
        "accounts/certificates/",
        formData,
        token
      );
      if (response.status === 201) {
        toast.success("Certificate added");
        await axiosPatch(
          `accounts/profile/${user_id}`,
          { is_approved: false, is_submitted: true },
          token
        );
      }
      reRender(`${response.data.id} added`);
      reset();
      show(false);
    } catch (error) {
      console.error("Error adding certificate:", error);
    }
  };

  // Unified form submit handler
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
          name="file"
          control={control}
          render={({ field }) => (
            <Button
              variant="outlined"
              component="label"
              fullWidth
              color={errors.file ? "error" : "primary"}
            >
              Upload Certificate (PDF only)
              <input
                type="file"
                accept="application/pdf"
                hidden
                onChange={(e) => field.onChange(e.target.files)}
              />
            </Button>
          )}
        />
        {errors.file && (
          <Typography color="error" variant="body2">
            {errors.file.message}
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
