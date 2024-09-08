import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/thunk/authThunk';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Step5 = () => {
  const dispatch = useDispatch();
  const signupData = useSelector((state) => state.signup); 
  console.log(signupData);
  
  const navigate = useNavigate()
  const handleSignup = async () => {
    
    try {
        const res = await dispatch(signup(signupData));
        
        if (signup.fulfilled.match(res)) {
            console.log("Signup successful:", res.payload);
            toast.success("Signup successful! Please check your email for verification.");
        } else if (signup.rejected.match(res)) {
            const errorMessage = res.payload ;
            toast.error(errorMessage); 
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        toast.error('An unexpected error occurred.');
    }
};

  return (
    <div className='relative flex justify-center'>
      <button 
        onClick={handleSignup} 
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 cursor-pointer"
      >
        Sign up
      </button>
    </div>
  );
};

export default Step5;
