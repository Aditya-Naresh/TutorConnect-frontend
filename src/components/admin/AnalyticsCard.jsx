import React from "react";

const AnalyticsCard = ({ title, value, icon, color }) => {
  return (
    <div
      className={`bg-${color}-100 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center`}
      style={{ minWidth: "300px", height: "200px" }}
    >
      <div className={`bg-${color}-500 text-white p-6 rounded-full mb-4`}>
        {icon}
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default AnalyticsCard;
