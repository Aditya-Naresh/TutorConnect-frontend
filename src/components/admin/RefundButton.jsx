import React from "react";
import Button from "@mui/material/Button";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { axiosPatch, axiosPost } from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { setRender } from "../../redux/slices/timeSlotSlice";

const RefundButton = ({ walletId, cancelled_by, rate, slot }) => {
  const { access } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let refund_amount;
  if (cancelled_by === "STUDENT") {
    refund_amount = (rate * 80) / 100;
  } else {
    refund_amount = rate;
  }
  const handleClick = async () => {
    const data = {
      transaction_type: "DEPOSIT",
      amount: refund_amount,
      wallet: walletId,
      timeslot: slot,
    };

    const response = await axiosPost(`useradmin/refund/`, data, access);
    if (response.status === 201) {
      const res = await axiosPatch(
        `useradmin/updateTimeslot/${slot}`,
        {
          status: "REFUNDED",
        },
        access
      );
      if (res.status === 200) {
        dispatch(setRender(`Refunded ${slot}`));
      }
    }
  };
  return (
    <Button
      className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all flex items-center gap-2"
      startIcon={<MonetizationOnIcon />}
      onClick={handleClick}
    >
      Refund
    </Button>
  );
};

export default RefundButton;
