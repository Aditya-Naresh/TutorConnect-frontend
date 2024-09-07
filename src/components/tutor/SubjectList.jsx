import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemText, IconButton, Typography, Button, Box } from "@mui/material";
import { BiTrash } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { toast } from "react-toastify";
import { axiosGet, axiosDelete } from "../../axios";
import SubjectForm from "./SubjectForm";

const SubjectList = () => {
  const token = useSelector((state) => state.auth.access);
  const [data, setData] = useState([]);
  const [render, setRender] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosGet("/accounts/subject/", token);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [render]);

  const reRender = (value) => {
    setRender(value);
  };

  const onDelete = async (id) => {
    try {
      const response = await axiosDelete(`accounts/subject/${id}`, token);
      if (response.status === 204) {
        setRender(`Deleted ${id}`);
        toast.success("Subject was deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" color="primary">Subjects:</Typography>
        <Button
          variant="contained"
          color={showForm ? "error" : "primary"}
          onClick={() => setShowForm(!showForm)}
          startIcon={showForm ? <CgClose /> : <BsPlus />}
        >
          {showForm ? "Close" : "Add"}
        </Button>
      </Box>
      <List>
        {data.map((subject) => (
          <ListItem
            key={subject.id}
            secondaryAction={
              <IconButton edge="end" color="error" onClick={() => onDelete(subject.id)}>
                <BiTrash />
              </IconButton>
            }
          >
            <ListItemText primary={subject.name} />
          </ListItem>
        ))}
      </List>
      {showForm && <SubjectForm reRender={reRender} />}
    </Box>
  );
};

export default SubjectList;
