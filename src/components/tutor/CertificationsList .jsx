import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
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
  Card,
  CardContent,
  CircularProgress,
  Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { axiosGet, axiosDelete } from "../../axios";

const CertificationsList = ({ update }) => {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.access);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setIsLoading(true);
        const response = await axiosGet("accounts/certificates/", token);
        setCertificates(response.data);
      } catch (error) {
        toast.error("Failed to fetch certificates");
        console.error("Error fetching certificates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, [update, token]);

  const handleDelete = async (id) => {
    try {
      const response = await axiosDelete(`accounts/certificates/${id}`, token);
      if (response.status === 204) {
        toast.success("Certificate deleted successfully");
        setCertificates((prev) => prev.filter((cert) => cert.id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete certificate");
      console.error("Error deleting certificate:", error);
    }
  };

  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <EmojiEventsIcon className="text-primary" />
            <Typography variant="h6" component="h2">
              Certifications
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary" className="mb-6">
            Manage your professional certifications and achievements
          </Typography>
          <div className="flex justify-center py-8">
            <CircularProgress size={40} />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (certificates.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <EmojiEventsIcon className="text-primary" />
            <Typography variant="h6" component="h2">
              Certifications
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary" className="mb-6">
            Manage your professional certifications and achievements
          </Typography>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <EmojiEventsIcon className="text-gray-400 mb-4" sx={{ fontSize: 48 }} />
            <Typography variant="h6" className="mb-2">
              No Certificates Found
            </Typography>
            <Typography variant="body2" color="text.secondary" className="max-w-sm">
              You haven't uploaded any certificates yet. Add your achievements to showcase your skills.
            </Typography>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <EmojiEventsIcon className="text-primary" />
          <Typography variant="h6" component="h2">
            Certifications
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary" className="mb-6">
          Manage your professional certifications and achievements
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-semibold">Title</TableCell>
                <TableCell className="font-semibold">Certificate</TableCell>
                <TableCell className="font-semibold w-[100px]">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>{cert.title}</TableCell>
                  <TableCell>
                    <a
                      href={cert.file}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Delete Certificate">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(cert.id)}
                        className="hover:text-red-600"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default CertificationsList;