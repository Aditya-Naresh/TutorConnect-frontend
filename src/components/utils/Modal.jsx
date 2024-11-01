import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MyDatePicker from "../forms/createform/MyDatePicker";
import MyButton from "../forms/createform/MyButton";
import MySelectForm from "../forms/createform/MySelectForm";
import { axiosPost } from "../../axios";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MyModal({
  reRender,
  formData,
  open,
  handleClose,
  myDate,
  handleChange,
}) {
  const { id, role, access } = useSelector((state) => state.auth);

  const startDate = dayjs(formData.start).format("YYYY-MM-DD HH:mm");

  const createTimeSlot = async (event) => {
    event.preventDefault();
    const data = {
      title: "AVAILABLE", 
      className: "AVAILABLE", 
      tutor: id,
      start: startDate,
      student: null,
      end: null,
    };

    try {
      const response = await axiosPost(
        "timeslots/tutor_timeslots/",
        data,
        access
      );
      if (response.status === 201) {
        reRender(`created ${response.data.id}`);
        toast.info("Time Slot Created");
      }
    } catch (error) {
      console.error("Error creating time slot:", error);
      toast.error("Failed to create time slot");
    }
  };

  let submissionHandler = role === "TUTOR" ? createTimeSlot : undefined;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a time slot on {dayjs(myDate).format("MMMM-DD-YYYY")}
          </Typography>
          <form onSubmit={submissionHandler}>
            {role === "ADMIN" && (
              <Box sx={{ marginBottom: "20px" }}>
                <MySelectForm
                  label={"Status"}
                  name={"className"}
                  onChange={handleChange}
                  value={formData.className}
                />
              </Box>
            )}
            <Box sx={{ marginBottom: "20px" }}>
              <MyDatePicker
                label={"Start Date"}
                name={"start"}
                onChange={handleChange}
                value={formData.start}
              />
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <MyButton label={"Submit"} type={"submit"} />
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
