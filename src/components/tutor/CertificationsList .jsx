import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { BiTrash } from "react-icons/bi";
import { axiosGet, axiosDelete } from "../../axios";
import { toast } from "react-toastify";
import { Document, Page } from "react-pdf";

const StyledTableContainer = styled(TableContainer)({
  marginTop: 20,
});

const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
});

const StyledImage = styled("img")({
  maxHeight: 100,
  objectFit: "cover",
});

const CertificationsList = ({ update }) => {
  const [certificates, setCertificates] = useState([]);
  const token = useSelector((state) => state.auth.access);
  const [render, setRender] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axiosGet("accounts/certificates/", token);
        setCertificates(response.data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchCertificates();
  }, [update, render]);

  const onDelete = async (id) => {
    try {
      const response = await axiosDelete(`accounts/certificates/${id}`, token);
      if (response.status === 204) {
        toast.success("Deleted the certificate");
        setRender(`Deleted ${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isPDF = (url) => url.toLowerCase().endsWith(".pdf");

  return (
    <StyledTableContainer component={Paper}>
      <Typography variant="h6" color="primary" gutterBottom>
        Certifications
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Link</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {certificates.map((cert) => (
            <TableRow key={cert.id}>
              <TableCell>{cert.title}</TableCell>
              <TableCell>
                <a href={cert.file} className="text-amber-700">View Certificate</a>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onDelete(cert.id)} color="secondary">
                  <BiTrash />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default CertificationsList;
