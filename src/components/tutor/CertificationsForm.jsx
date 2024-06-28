import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { axiosPost } from '../../axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axiosPatch from '../../axios/axiosPatch';

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

const CertificationsForm = ({reRender}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const user_id = useSelector((state) => state.auth.id)

  const token = useSelector((state) => state.auth.access);
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('image', data.image[0]);

    
    try {
      const response = await axiosPost('accounts/certificates/', formData, token);
      console.log(response.data);
      if( response.status === 201){
        toast.success("certificate added")
        await axiosPatch(`accounts/profile/${user_id}`,{"is_approved" : false}, token)
      }
      reRender('Certificate Added')
      reset();
    } catch (error) {
      console.error('Error uploading certificate:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative max-w-[400px] w-full mx-auto bg-slate-400 p-8 shadow-lg ring-2 ring-gray-300 ring-offset-2 ring-offset-gray-100 pb-4"
    >
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Certificate Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="border p-2 rounded w-full bg-slate-200"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
          Certificate Image (JPEG only)
        </label>
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, onBlur, ref } }) => (
            <input
              id="image"
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={(e) => onChange(e.target.files)}
              onBlur={onBlur}
              ref={ref}
              className="border p-2 rounded w-full"
            />
          )}
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default CertificationsForm;
