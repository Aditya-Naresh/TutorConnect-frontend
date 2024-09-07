import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SubjectForm from '../../components/tutor/SubjectForm'
import DeleteIcon from "@mui/icons-material/Delete";
import { removeSubject } from '../../redux/slices/signUpSlice';
import { toast } from 'react-toastify';

const Step3 = ({setCurrentStep}) => {
  const { subjects } = useSelector((state) => state.signup);
  const dispatch = useDispatch()
  const handleDeleteSubject = (index) => {
    dispatch(removeSubject({index}))
  }

  const nextClick = () => {
    if (subjects.length === 0) {
      toast.error("You need to add atleast one certification");
      return;
    }
    setCurrentStep(4);
  };
  return (
    <div>
      <div className='flex justify-center w-full'>
        <span>Add Subjects</span>
      </div>
        <SubjectForm />
      <ul className='list-disc list-inside mt-4'>
        {subjects.map((subject, index) => (
          <li key={index}>{subject} <button
          onClick={() => handleDeleteSubject(index)}
          className="bg-red-500 text-white p-1 mt-2 rounded relative"
        >
          <DeleteIcon />
        </button></li>
        ))}
      </ul>

      <button
        className="w-full py-3 mt-8 bg-blue-600 hover:bg-blue-600/90 relative text-white"
        onClick={nextClick}
      >
        Next
      </button>
      
    </div>
  )
}

export default Step3
