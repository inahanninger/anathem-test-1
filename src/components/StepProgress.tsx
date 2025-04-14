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
            {index > 0}
            
            <div className="flex items-center">
              <Link to={step.path} className="pointer-events-none flex items-center">
                <div className={`w-4 h-4 flex items-center justify-center rounded-full mr-2 ${isActive ? 'bg-emerald-800 text-white' : isCompleted ? 'bg-emerald-800 text-white' : 'bg-neutral-300 text-white'}`}>
                  {isCompleted ? <Check className="h-3 w-3" /> : index + 1}
                </div>
                <span className={`text-xs ${isCompleted ? 'text-emerald-800' : 'text-neutral-300'}`}>
                  {step.name}
                </span>
              </Link>
            </div>
          </React.Fragment>;
    })}
    </div>;
};
export default StepProgress;