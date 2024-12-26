import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <div className='w-full bg-gradient-to-tl from-teal-600 via-teal-800 to-teal-950 h-full text-white py-6'>
      <Box className="flex flex-col items-center justify-center space-y-4">
        {/* Copyright Text */}
        <Typography variant="body2" align="center">
          © {currentYear} Tutor Connect. All rights reserved.
        </Typography>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <Link href="https://github.com/Aditya-Naresh" target="_blank" color="inherit">
            <GitHub fontSize="large" />
          </Link>
          <Link href="https://www.linkedin.com/in/aditya-naresh" target="_blank" color="inherit">
            <LinkedIn fontSize="large" />
          </Link>
        </div>
      </Box>
    </div>
  );
};

export default Footer;
