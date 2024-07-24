import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import "dayjs/locale/en-in"
import dayjs from 'dayjs';

export default function MyDatePicker({label, value, name, onChange}) {
  const handleDateChange = (newDate) => {
    onChange({target: {name: name, value: dayjs(newDate)}})
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-in'>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
         sx={{width:"100%"}}
         label={label}
         inputFormat="DD/MM/YYYY hh:mm A"         
         value={value? dayjs(value) :null}
         onChange={handleDateChange}
         name={name}
         />
      </DemoContainer>
    </LocalizationProvider>
  );
}
