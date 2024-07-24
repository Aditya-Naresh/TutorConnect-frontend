import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-in';
export default function DatePickerForm({label, value, setValue}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-in'>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label={label} sx={{width:"100%"}} value={value} onChange={setValue}/>
      </DemoContainer>
    </LocalizationProvider>
  );
}
