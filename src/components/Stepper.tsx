
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  id: number;
  name: string;
  description: string;
};

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const Stepper = ({ steps, currentStep, onStepClick }: StepperProps) => {
  return (
    <nav aria-label="Progress" className="mx-auto max-w-4xl">
      <ol role="list" className="flex items-center">
        {steps.map((step, index) => (
          <li 
            key={step.id} 
            className={cn(
              "relative flex items-center",
              index !== steps.length - 1 ? "flex-1" : ""
            )}
          >
            {step.id < currentStep ? (
              // Completed step
              <>
                <div className="group flex w-full items-center">
                  <span className="flex items-center justify-center">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-800">
                      <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                    <span className="sr-only">{step.name}</span>
                  </span>
                  <span className="ml-3 text-sm font-medium text-gray-900">{step.name}</span>
                </div>
                {index !== steps.length - 1 ? (
                  <div className="absolute right-0 top-4 hidden h-0.5 w-full md:flex">
                    <div className="h-full w-full bg-blue-800" />
                  </div>
                ) : null}
              </>
            ) : step.id === currentStep ? (
              // Current step
              <>
                <div className="group flex w-full items-center">
                  <span className="flex items-center justify-center">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-800 bg-white">
                      <span className="text-sm font-medium text-blue-800">{step.id}</span>
                    </span>
                    <span className="sr-only">{step.name}</span>
                  </span>
                  <span className="ml-3 text-sm font-medium text-blue-800">{step.name}</span>
                </div>
                {index !== steps.length - 1 ? (
                  <div className="absolute right-0 top-4 hidden h-0.5 w-full md:flex">
                    <div className="h-full w-1/2 bg-blue-800" />
                    <div className="h-full w-1/2 bg-gray-200" />
                  </div>
                ) : null}
              </>
            ) : (
              // Upcoming step
              <>
                <div className="group flex w-full items-center">
                  <button 
                    onClick={onStepClick ? () => onStepClick(step.id) : undefined}
                    disabled={!onStepClick}
                    className={cn(
                      "flex items-center justify-center",
                      onStepClick ? "cursor-pointer" : "cursor-default"
                    )}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      <span className="text-sm font-medium text-gray-500">{step.id}</span>
                    </span>
                    <span className="sr-only">{step.name}</span>
                  </button>
                  <span className="ml-3 text-sm font-medium text-gray-500">{step.name}</span>
                </div>
                {index !== steps.length - 1 ? (
                  <div className="absolute right-0 top-4 hidden h-0.5 w-full bg-gray-200 md:flex" />
                ) : null}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Stepper;
