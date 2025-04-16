
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

const StepProgress = ({
  currentStep,
  steps
}: StepProgressProps) => {
  return <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => {
      const isActive = currentStep === index + 1;
      const isCompleted = currentStep > index + 1;
      return <React.Fragment key={index}>
            {index > 0 && <div className="h-[1px] flex-1 bg-gray-200 mx-2"></div>}
            
            <div className="flex items-center">
              <Link to={step.path} className={`pointer-events-${isCompleted ? 'auto' : 'none'} flex items-center`}>
                <div className={`w-5 h-5 flex items-center justify-center rounded-full mr-2 ${isActive ? 'bg-emerald-800 text-white' : isCompleted ? 'bg-emerald-800 text-white' : 'bg-neutral-300 text-white'}`}>
                  {isCompleted ? <Check className="h-3 w-3" /> : <span className="text-xs">{index + 1}</span>}
                </div>
                <span className={`text-xs ${isActive ? 'font-medium text-emerald-800' : isCompleted ? 'text-emerald-800' : 'text-neutral-900'}`}>
                  {step.name}
                </span>
              </Link>
            </div>
          </React.Fragment>;
    })}
    </div>;
};

export default StepProgress;
