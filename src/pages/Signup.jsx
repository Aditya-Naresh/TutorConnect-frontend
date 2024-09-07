import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormSwitch from "../components/FormSwitch";
import Step1 from "../components/Signup/Step1";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, updateField } from "../redux/slices/signUpSlice";
import Step2 from "../components/Signup/Step2";
import Step3 from "../components/Signup/Step3";
import Step4 from "../components/Signup/Step4";
import Step5 from "../components/Signup/Step5";

const Signup = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const isTutor = useSelector((state) => state.signup.is_tutor);
    const dispatch = useDispatch();  
    const setIsTutor = (value) => {
        dispatch(resetForm())
        dispatch(updateField({ field: 'is_tutor', value }));
        setCurrentStep(1)  
    };
    return (
        <div className="flex justify-center items-center h-full">
            <div className="max-w-[500px] w-full mx-auto bg-white p-8">
                <span className="flex justify-center relative">
                    <FormSwitch isTutor={isTutor} setIsTutor={setIsTutor} />
                </span>
                <h2 className="text-4xl font-bold  text-center py-4">
                    {isTutor ? "Tutor " : "Student "}Sign Up
                </h2>
                {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} isTutor={isTutor}/>}
                {currentStep === 2 && <Step2 setCurrentStep={setCurrentStep}/>}
                {currentStep === 3 && <Step3 setCurrentStep={setCurrentStep}/>}
                {currentStep === 4 && <Step4 setCurrentStep={setCurrentStep}/>}
                {currentStep === 5 && <Step5/>}


                
                <p className="text-center mt-4 relative">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-indigo-700">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
