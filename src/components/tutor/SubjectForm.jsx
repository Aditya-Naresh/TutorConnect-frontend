import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { PiPlusBold } from 'react-icons/pi';

const SubjectForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      subjects: [{ name: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subjects'
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2">
          <Controller
            control={control}
            name={`subjects[${index}].name`}
            render={({ field }) => (
              <input
                {...field}
                placeholder={`Subject ${index + 1}`}
                className="border p-2 rounded w-full"
              />
            )}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-500 text-white p-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ name: '' })}
        className="bg-blue-500 text-white p-2 rounded mt-2"
      >
        <PiPlusBold />
      </button>
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded mt-2"
      >
        Submit
      </button>
    </form>
  );
};

export default SubjectForm;
