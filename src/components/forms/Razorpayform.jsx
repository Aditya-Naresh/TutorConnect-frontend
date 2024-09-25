import React, { useState } from "react";
import Axios from "axios";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Razorpayform = () => {
  const name = useSelector((state) => state.auth.full_name)
  const [amount, setAmount] = useState("");
  const server = 'http://127.0.0.1:8000'

  const handlePaymentSuccess = async (response) => {
    try {
      const bodyData = new FormData();
      bodyData.append("response", JSON.stringify(response));

      const res = await Axios({
        url: `${server}/razorpay/handle-payment-success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Payment validated!", res.data);
    //   Add Wallet updation code here
      toast.success(`Rs. ${amount} has been added to your wallet`)
      setName("");
      setAmount("");
    } catch (error) {
      console.error("Error during payment validation:", error.response || error);
    }
  };

  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const showRazorpay = async () => {
    const res = await loadScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const bodyData = new FormData();
      bodyData.append("amount", amount.toString());
      bodyData.append("name", name);

      const { data } = await Axios({
        url: `${server}/razorpay/start-payment/`,
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        data: bodyData,
      });

      const options = {
        key: "rzp_test_50Z1aonyfK3aZu",
        amount: data.payment.amount,
        currency: "INR",
        name: "Org. Name",
        description: "Test transaction",
        order_id: data.payment.id,
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: name,
          email: "user@example.com", // Update as necessary
          contact: "9999999999", // Update as necessary
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error during Razorpay initiation:", error.response || error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      className="bg-white p-8 rounded-lg shadow-lg mt-16"
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        className="text-blue-600 font-semibold"
      >
        Payment Page
      </Typography>

      <form>
        <Box mb={4}>
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            value={name}
            className="mb-4"
            InputLabelProps={{ className: "text-gray-500" }}
            InputProps={{readOnly: true}}
          />
        </Box>

        <Box mb={4}>
          <TextField
            label="Amount"
            variant="outlined"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mb-4"
            InputLabelProps={{ className: "text-gray-500" }}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={showRazorpay}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Pay with Razorpay
        </Button>
      </form>
    </Container>
  );
};

export default Razorpayform;
