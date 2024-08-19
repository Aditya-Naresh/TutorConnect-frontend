import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function MyStaticTimePicker({label, selectedTime, setSelectedTime, startTime=null}) {
  const handleChange = (newTime) => {
    setSelectedTime(newTime)
    console.log(" new time", newTime);
    
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker
          label={label}
          value={selectedTime}
          onChange={handleChange}
          minTime={startTime}
          
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
