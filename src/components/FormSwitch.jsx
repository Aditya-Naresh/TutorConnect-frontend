import React from 'react';

const FormSwitch = ({ isTutor, setIsTutor }) => {
  return (
    <div className="flex items-center mb-4">
      <span className="mr-2 text-gray-700">Student</span>
      <div
        className={`relative inline-block w-14 h-8 rounded-full cursor-pointer transition-colors duration-200 ${
          isTutor ? 'bg-green-500' : 'bg-gray-400'
        }`}
        onClick={() => setIsTutor(!isTutor)}
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
            isTutor ? 'transform translate-x-6' : ''
          }`}
        ></div>
      </div>
      <span className="ml-2 text-gray-700">Tutor</span>
    </div>
  );
};

export default FormSwitch;
