import React from "react";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, getAuth, GoogleAuthProvider} from 'firebase/auth'
import {app} from '../utils/Firebase'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {axiosPost} from "../../axios"
import { loginSuccess } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
const GoogleAuth = () => {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt : "select_account"})
    
    try {
        const resultsFromGoogle = await signInWithPopup(auth, provider)

        const userData = {
            email: resultsFromGoogle._tokenResponse.email,
            first_name: resultsFromGoogle._tokenResponse.firstName,
            last_name: resultsFromGoogle._tokenResponse.lastName
        }

        const response = await axiosPost('accounts/googleAuth/', userData)
        console.log(response.status);
        
        if (response.status === 201 || response.status === 200) {
            dispatch(loginSuccess(response.data))
            toast.success(`${response.data.full_name} logged in`, {position:"top-center"})
            navigate('/')
        } else if(response.status === 403){
          toast.error("User Blocked Please contact the Admin", {position:"top-center"})
        }
        
        
    } catch (error) {
        console.log("err:",error);
        
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <Button
        onClick={handleGoogleSignIn}
        variant="contained"
        startIcon={<FcGoogle className="w-6 h-6" />}
        className="!bg-white !text-gray-700 !font-semibold !hover:bg-gray-100 !border !border-gray-300 !shadow-md !py-2 !px-4 !rounded-lg !flex !items-center"
      >
        Sign in with Google
      </Button>
    </div>
  );
};

export default GoogleAuth;
