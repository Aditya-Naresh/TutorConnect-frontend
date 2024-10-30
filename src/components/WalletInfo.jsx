import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import { axiosGet } from "../axios";

const WalletInfo = () => {
  const { balance } = useSelector((state) => state.wallet);
  const { access } = useSelector((state) => state.auth);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); // Pagination state
  const rowsPerPage = 6; // Number of rows per page

  const fetchTransactions = async () => {
    try {
      const response = await axiosGet("wallet/transactions", access);
      setTransactions(response.data);
      setError(null); // Reset error if fetch is successful
    } catch (error) {
      setError("Failed to fetch transactions. Please try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [access, balance]);

  // Handle pagination page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Paginate transactions to display 6 per page
  const paginatedTransactions = transactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Grid container justifyContent="center" className="p-4 sm:p-8">
      <Grid item xs={12} md={10} lg={8}>
        <Card className="bg-gradient-to-r from-green-100 to-blue-50 shadow-xl rounded-lg border border-gray-200">
          <CardContent className="p-4 sm:p-6">
            {/* Wallet Balance */}
            <Typography
              variant="h5"
              className="text-center font-extrabold mb-6 text-gray-700"
              style={{ fontSize: "1.2rem" }} // Adjust font size for smaller screens
            >
              Wallet Balance
            </Typography>
            <Typography
              variant="h3"
              className="text-center text-green-600 font-extrabold mb-4"
              style={{ fontSize: "2rem" }} // Adjust font size for smaller screens
            >
              ₹ {balance}
            </Typography>

            {/* Error Handling */}
            {error && (
              <Typography variant="body2" className="text-red-600 text-center mt-2">
                {error}
              </Typography>
            )}

            {/* Recent Transactions Table */}
            <div className="mt-8">
              <Typography
                variant="h6"
                className="text-center mb-4 font-semibold text-gray-700"
                style={{ fontSize: "1.1rem" }}
              >
                Recent Transactions
              </Typography>
              {transactions.length > 0 ? (
                <>
                  <TableContainer
                    component={Paper}
                    className="shadow-md rounded-lg"
                    style={{
                      overflowX: "auto", // Enable horizontal scrolling for small screens
                      width: "100%", // Ensure full width on larger screens
                    }}
                  >
                    <Table
                      className="border-separate"
                      style={{ borderSpacing: "0 10px", width: "100%" }} // Responsive full-width table
                    >
                      <TableHead>
                        <TableRow className="bg-gradient-to-r from-green-200 to-blue-200 text-white">
                          <TableCell className="font-bold text-gray-700 py-3">
                            Type
                          </TableCell>
                          <TableCell className="font-bold text-gray-700 py-3">
                            Amount
                          </TableCell>
                          <TableCell className="font-bold text-gray-700 py-3">
                            Date
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paginatedTransactions.map((transaction) => (
                          <TableRow
                            key={transaction.id}
                            className={`rounded-lg ${
                              transaction.transaction_type === "DEPOSIT"
                                ? "bg-green-50 hover:bg-green-100"
                                : "bg-red-50 hover:bg-red-100"
                            }`}
                          >
                            <TableCell className="py-4 px-6">
                              {transaction.transaction_type}
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              ₹{transaction.amount}
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              {new Date(transaction.timestamp).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Pagination */}
                  <TablePagination
                    component="div"
                    count={transactions.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]} // Disable rows per page options
                    className="mt-4"
                    classes={{
                      selectIcon: "hidden", // Hide the select dropdown for rows per page
                      actions: "text-gray-700", // Change pagination button colors
                    }}
                  />
                </>
              ) : (
                <Typography variant="body2" className="text-gray-500 text-center">
                  No recent transactions available.
                </Typography>
              )}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default WalletInfo;
