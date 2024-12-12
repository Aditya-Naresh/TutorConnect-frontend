import React from 'react';
import { Card, CardContent } from '@mui/material';

const SidebarContainer = ({ children, bgColor }) => {
  return (
    <Card className={`relative ${bgColor} border border-slate-500 w-64 min-h-screen shadow-xl`}>
      <CardContent className="text-white p-6 flex flex-col relative space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default SidebarContainer;