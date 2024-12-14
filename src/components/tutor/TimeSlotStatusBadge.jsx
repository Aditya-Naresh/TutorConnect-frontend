// StatusBadge.js
import React from 'react';

const TimeSlotStatusBadge = ({ title }) => {
  // Define a mapping of title to classes
  const statusClasses = {
    AVAILABLE: 'bg-green-100 text-green-800',
    BOOKED: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-gray-100 text-gray-800',
    CANCELLED: 'bg-yellow-100 text-yellow-800',
    REFUNDED: 'bg-red-100 text-red-800',
  };

  // Get the appropriate class for the title, default to a neutral color if not found
  const statusClass = statusClasses[title] || 'bg-gray-100 text-gray-800';

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
    >
      {title}
    </span>
  );
};

export default TimeSlotStatusBadge;
