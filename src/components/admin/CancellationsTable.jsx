import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import RefundButton from "./RefundButton";

const CancellationsTable = ({ cancelledTimeSlots }) => {
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  // Pagination logic
  const paginatedData = cancelledTimeSlots.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatDate = (datetime) => new Date(datetime).toLocaleDateString();
  const formatTime = (datetime) =>
    new Date(datetime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="max-w-screen-lg mx-auto">
      <Paper className="w-full flex justify-center p-4 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800">
          Cancelled Time Slots 
        </h2>
      </Paper>

      <TableContainer
        component={Paper}
        className="shadow-md rounded-lg overflow-hidden"
      >
        <Table>
          <TableHead className="bg-gray-300">
            <TableRow>
              <TableCell className="font-semibold text-gray-700">#</TableCell>
              <TableCell className="font-semibold text-gray-700">
                Date
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                Subject
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                Tutor
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                Student
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                Start Time
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                End Time
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                Cancelled By
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((slot, index) => (
              <TableRow key={slot.id} className="hover:bg-gray-50">
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{formatDate(slot.start_time)}</TableCell>
                <TableCell>{slot.subject_name}</TableCell>
                <TableCell>{slot.tutor_name}</TableCell>
                <TableCell>{slot.student_name || "N/A"}</TableCell>
                <TableCell>{formatTime(slot.start_time)}</TableCell>
                <TableCell>{formatTime(slot.end_time)}</TableCell>
                <TableCell>{slot.cancelled_by}</TableCell>
                <TableCell>
                  <RefundButton
                    walletId={slot.student_wallet}
                    cancelled_by={slot.cancelled_by}
                    rate={slot.rate}
                    slot={slot.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={cancelledTimeSlots.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
        className="mt-4"
      />
    </div>
  );
};

export default CancellationsTable;
