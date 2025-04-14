
import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

interface StepProgressProps {
  currentStep: number;
  steps: {
    name: string;
    path: string;
  }[];
}

const StepProgress = ({ currentStep, steps }: StepProgressProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => {
        const isActive = currentStep === index + 1;
        const isCompleted = currentStep > index + 1;
        
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <div className={`h-[2px] flex-1 ${isCompleted ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            )}
            
            <div className="flex flex-col items-center">
              <Link to={step.path} className="pointer-events-none">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 ${
                  isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
              </Link>
              <span className={`text-xs ${isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                {step.name}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepProgress;
