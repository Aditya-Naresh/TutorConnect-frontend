import React from "react";
import Calendar from "../../components/Calendar";
const BookTimeSlots = () => {
  return (
    <div className="w-full h-fit overflow-auto">
      <div className="flex justify-center items-center">
        <h1 className="font-bold text-3xl text-black lg:text-5xl ">
          Book Slots
        </h1>
      </div>
      <div
        className=" w-full bg-white rounded-2xl shadow-lg p-4 sm:p-6 h-[600px] overflow-auto
                      scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-gray-900"
      >
        <Calendar />
      </div>
    </div>
  );
};

export default BookTimeSlots;
