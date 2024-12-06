import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import { addSubject } from "../../redux/slices/signUpSlice";
import { axiosPost } from "../../axios";
import { toast } from "react-toastify";

const SubjectForm = ({ reRender }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    dispatch(addSubject(formData.name));
    reset();
  };

  const token = useSelector((state) => state.auth.access);
  const onAccountSubmit = async (formData) => {
    const response = await axiosPost("accounts/subject/", formData, token);
    reset()
    console.log(response.data);
    if (response.status === 201) {
      reRender(`${response.data.id} added`);
    } else {
      toast.info(response.data.detail);
    }
  };

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
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 2,
        bgcolor: "emerald-200",
        boxShadow: 2,
        borderRadius: 1,
        border: "2px solid",
        borderColor: "grey.300",
        position: "relative",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          {...register("name", { required: "Subject name is required" })}
          label="Subject Name"
          variant="outlined"
          fullWidth
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ minWidth: 50 }}
        >
          <BsPlus />
        </Button>
      </Box>
    </Box>
  );
};

export default SubjectForm;
