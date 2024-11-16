import React from "react";
import CertificationsForm from "../tutor/CertificationsForm";
import { useDispatch, useSelector } from "react-redux";
import { removeCertification } from "../../redux/slices/signUpSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const Step2 = ({ setCurrentStep }) => {
  const { certifications } = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  const handleDeleteCertification = (index) => {
    dispatch(removeCertification({ index }));
    toast.info("Certification removed");
  };

  const nextClick = () => {
    if (certifications.length === 0) {
      toast.error("You need to add at least one certification");
      return;
    }
    setCurrentStep(3);
  };

  return (
    <div className="max-w-md mx-auto p-4 relative">
      {/* Header */}
      <div className="flex justify-center w-full mb-6">
        <span className="text-2xl text-gray-800 font-bold">
          Add Certifications
        </span>
      </div>

      {/* Certification Form */}
      <CertificationsForm />

      {/* List of Certifications */}
      <div className="mt-6">
        {certifications.length === 0 ? (
          <p className="text-center text-gray-500">No certifications added yet.</p>
        ) : (
          certifications.map((cert, index) => (
            <div
              key={index}
              className="p-2 border-b flex justify-between items-center"
            >
              <div>
                <p className="mb-1">
                  <strong>Title:</strong> {cert.title || "Untitled"}
                </p>
                <p>
                  <strong>File:</strong>{" "}
                  {cert.fileUrl ? (
                    <a
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline relative"
                    >
                      View PDF
                    </a>
                  ) : (
                    <span className="text-red-500">No file uploaded</span>
                  )}
                </p>
              </div>
              <button
                onClick={() => handleDeleteCertification(index)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 relative"
              >
                <DeleteIcon />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Next Button */}
      <button
        className="relative w-full py-3 mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded"
        onClick={nextClick}
      >
        Next
      </button>
    </div>
  );
};

export default Step2;
