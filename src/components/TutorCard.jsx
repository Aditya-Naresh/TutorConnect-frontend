import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosGet } from "../axios";
import ApproveTutor from "./admin/ApproveTutor";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";


const TutorCard = ({
  id,
  data,
  setShowRequestForm,
  setTutorSubjects,
  setTutorId,
  closeCard,
}) => {
  const auth = useSelector((state) => state.auth);
  const [tutor, setTutor] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const role = auth.role;

  const handleClick = (e) => {
    e.preventDefault();
    setShowRequestForm(true);
    setTutorSubjects(data?.subjects || []);
    setTutorId(data?.id || null);
  };

  const fetchData = async () => {
    try {
      const response = await axiosGet(
        `useradmin/update-user/${id}`,
        auth.access
      );
      if (response.status === 200) {
        setTutor(response.data);
        try {
          const certRes = await axiosGet(
            `useradmin/certificates/${id}`,
            auth.access
          );
          setCertifications(certRes.data);
          const subRes = await axiosGet(
            `useradmin/subjects/${id}`,
            auth.access
          );
          setSubjects(subRes.data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.role === "ADMIN") {
      fetchData();
    }
  }, []);

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {role === "ADMIN"
            ? tutor.first_name && tutor.last_name
              ? `${tutor.first_name} ${tutor.last_name}`
              : "Loading..."
            : data.first_name && data.last_name
            ? `${data.first_name} ${data.last_name}`
            : "Loading..."}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          <strong>Subjects:</strong>{" "}
          {role === "ADMIN"
            ? subjects?.map((subject) => subject.name).join(", ")
            : data?.subjects?.map((subject) => subject.name).join(", ")}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          <strong>Rate per hour:</strong>{" "}
          {role === "ADMIN" ? tutor?.rate || "N/A" : data?.rate || "N/A"}
        </Typography>

        {role === "ADMIN" && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Certification</TableCell>
                  <TableCell>Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certifications.map((cert, index) => (
                  <TableRow key={index}>
                    <TableCell>{cert.title}</TableCell>
                    <TableCell>
                      <a
                        href={cert.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <InsertDriveFileIcon
                          sx={{ fontSize: 24, verticalAlign: "middle" }}
                        />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        {role === "ADMIN" && !tutor?.is_approved && (
          <ApproveTutor id={tutor.id} />
        )}
        {role === "STUDENT" && (
          <Button variant="contained" color="success" onClick={handleClick}>
            Request Tutor
          </Button>
        )}
        <Button variant="contained" color="error" onClick={closeCard}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
};

export default TutorCard;
