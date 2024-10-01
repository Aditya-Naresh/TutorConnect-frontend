import React from "react";
import Razorpayform from "../components/forms/Razorpayform";
import WalletInfo from "../components/WalletInfo";

const Wallet = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-center items-center lg:items-start gap-8 p-6 min-h-screen bg-gray-100 w-full">
      <div className="w-full lg:w-2/3">
        <WalletInfo />
      </div>

      <div className="w-full lg:w-1/3">
        <Razorpayform />
      </div>
    </div>
  );
};

export default Wallet;
