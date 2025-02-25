import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import UnblockButton from "./UnblockButton";
import BlockButton from "./BlockButton";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import UserDetails from "./UserDetails";
import ChatButton from "../ChatButton";
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)({
  "&.MuiTableCell-head": {
    backgroundColor: "#000000", // Black background
    color: "#ffffff", // White text
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
});

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5", // Light grey background
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});

export default function CustomizedTables({ data, reRender, label, showCard }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState(""); 
  const {role} = useSelector((state) => state.auth)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setPage(0); // Reset to first page when searching
  };

  // Filter data based on search query
  const filteredData = data.filter(
    (row) =>
      row.first_name.toLowerCase().includes(searchQuery) ||
      row.last_name.toLowerCase().includes(searchQuery)
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper}>
      {/*search bar */}
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell
              colSpan={label === "Tutors" ? 8 : 6}
              align="center"
            >
              {label}
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell align="right">First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Auth Provider</StyledTableCell>
            {label === "Tutors" && (
              <>
                <StyledTableCell align="right">Approved</StyledTableCell>
                <StyledTableCell align="center">User Details</StyledTableCell>
              </>
            )}
            <StyledTableCell align="center">Action</StyledTableCell>
            <StyledTableCell align="center">Chat</StyledTableCell>{" "}
            {/* New Chat Button Column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((row) => (
            <StyledTableRow key={row.email}>
              <StyledTableCell component="th" scope="row">
                {row.email}
              </StyledTableCell>
              <StyledTableCell align="center">{row.first_name}</StyledTableCell>
              <StyledTableCell align="center">{row.last_name}</StyledTableCell>
              <StyledTableCell align="center">
                {row.auth_provider}
              </StyledTableCell>
              {label === "Tutors" && (
                <>
                  <StyledTableCell align="center">
                    {row.is_approved ? (
                      <VerifiedIcon color="green" />
                    ) : (
                      <CancelIcon />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <UserDetails id={row.id} showCard={showCard} />
                  </StyledTableCell>
                </>
              )}
              <StyledTableCell align="right">
                {row.is_blocked ? (
                  <UnblockButton id={row.id} reRender={reRender} />
                ) : (
                  <BlockButton id={row.id} reRender={reRender} />
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                <ChatButton user_id={row.id} role={role} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
