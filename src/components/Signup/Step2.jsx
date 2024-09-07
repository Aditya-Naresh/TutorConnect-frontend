import React from "react";
import CertificationsForm from "../tutor/CertificationsForm";
import { useDispatch, useSelector } from "react-redux";
import { removeCertification } from "../../redux/slices/signUpSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const Step2 = ({ setCurrentStep }) => {
  const { certifications } = useSelector((state) => state.signup);
  console.log("certifications", certifications);
  const dispatch = useDispatch();
  const handleDeleteCertification = (index) => {
    dispatch(removeCertification({ index }));
  };
  const nextClick = () => {
    if (certifications.length === 0) {
      toast.error("You need to add atleast one certification");
      return;
    }
    setCurrentStep(3);
  };
  return (
    <div>
      <div className="flex justify-center w-full">
        <span className="text-2xl text-gray-800 font-bold">
          Add Certifications
        </span>
      </div>
      <CertificationsForm />
      {certifications.map((cert, index) => (
        <div key={index} className="p-2 border-b">
          <p>
            <strong>Title:</strong>{" "}
            {typeof cert.title === "string" ? cert.title : "Invalid title"}{" "}
            <button
              onClick={() => handleDeleteCertification(index)}
              className="bg-red-500 text-white p-1 mt-2 rounded relative"
            >
              <DeleteIcon />
            </button>
          </p>
          {typeof cert.image === "string" ? (
            <div>
              <strong>Image:</strong>
              <img
                src={cert.image}
                alt={cert.title || "Certification Image"}
                className="mt-2 max-h-40 w-auto object-cover"
              />
            </div>
          ) : (
            <p>
              <strong>Image:</strong> No valid image uploaded
            </p>
          )}
        </div>
      ))}

      <button
        className="w-full py-3 mt-8 bg-blue-600 hover:bg-blue-600/90 relative text-white"
        onClick={nextClick}
      >
        Next
      </button>
    </div>
  );
};

export default Step2;
