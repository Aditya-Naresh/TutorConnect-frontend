import React from "react";

const LocationHeading = ({ location }) => {
  const headings = {
    default: "Dashboard",
    "timeslot-details": "Time Slot Details",
    "wallet": "Transactions",
    "tutorlist": "Tutors",
    "profile" : "Account",
    "chat": "Messages",
    "timeslots": "Create Time Slots",
    "user-management": "User Management",
    "cancellations" : "Cancellations"
  };
  const heading = headings[location] || headings["default"];
  return (
    <div className="flex justify-end items-center">
      <h1 className="text-3xl font-bold text-gray-800 capitalize pb-2">
        {heading}
      </h1>
    </div>
  );
};

export default LocationHeading;
