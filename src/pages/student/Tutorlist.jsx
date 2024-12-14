import React, { useEffect, useState } from "react";
import { axiosGet } from "../../axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import SearchBar from "../../components/student/SearchBar";

const Tutorlist = () => {
  const [tutors, setTutors] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const fetchTutors = async (keyword = "") => {
    try {
      let url = "timeslots/tutor-list/";
      if (keyword) {
        url += `?keyword=${keyword}`;
      }
      const response = await axiosGet(url, auth.access);
      setTutors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (keyword) => {
    fetchTutors(keyword);
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestTutor = (tutorId) => {
    navigate(`/book-slots/${tutorId}`);
  };

  return (
    <div className="tutor-list w-full">
      <h2 className="font-bold text-3xl lg:text-5xl flex justify-center m-4">
        Tutors List
      </h2>
      <div className="flex justify-center mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex justify-center h-72 w-full">
        <Paper className="w-full">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="!bg-teal-500">
                  <TableCell className="!font-bold">Tutor</TableCell>
                  <TableCell className="!font-bold">Subjects</TableCell>
                  <TableCell className="!font-bold">Rate</TableCell>
                  <TableCell colSpan={2} className="!font-bold" align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tutors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((tutor) => (
                    <TableRow key={tutor.id}>
                      <TableCell>
                        {tutor.first_name} {tutor.last_name}
                      </TableCell>
                      <TableCell>
                        {tutor.subjects
                          .map((subject) => subject.name)
                          .join(", ")}
                      </TableCell>
                      <TableCell>{tutor.rate}</TableCell>
                      <TableCell  colSpan={2} className="!font-bold" align="center">
                        <Button
                          variant="contained"
                          className="!bg-teal-600 !text-blue-100 hover:!bg-teal-700 !font-bold"
                          onClick={() => handleRequestTutor(tutor.id)}
                        >
                          Request Tutor
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={tutors.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Tutorlist;
