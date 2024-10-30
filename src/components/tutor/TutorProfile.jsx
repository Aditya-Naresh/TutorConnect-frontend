import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import CertificationsForm from "./CertificationsForm";
import CertificationsList from "./CertificationsList ";
import SubjectList from "./SubjectList";

const TutorProfile = () => {
    const [showCertificateForm, setShowCertificateForm] = useState(false);
    const [update, setUpdate] = useState('')
  
    const reRender = (value) =>{
      setUpdate(value)
    }
    const toggleForm = () => {
      setShowCertificateForm((prev) => !prev);
    };
  return (
    <div>
      <div className="flex bg-slate-50 justify-center">

      <h1 className="text-lime-900 font-bold text-lg ">Add Certifications</h1>
      <button onClick={toggleForm} className={`${!showCertificateForm? `bg-blue-500 text-white` : `bg-slate-900 text-red-500` }  p-1 text-sm rounded mb-2 mt-1`}>
        {showCertificateForm ? <CgClose /> : <BsPlus />}
      </button>
      </div>
      {showCertificateForm ? (
        <div className="relative">
          <CertificationsForm reRender={reRender} show={setShowCertificateForm}/>
        </div>
      ) : (
        <div className="relative">
          <div className="relative">
            <CertificationsList update={update} />
          </div>
          <div className="relative mt-4">
          <SubjectList />

          </div>
        </div>
      )}
    </div>
  )
}

export default TutorProfile