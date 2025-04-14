import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface ProgressStepsProps {
  currentStep: number;
}
const steps = [{
  id: 0,
  name: "Upload Documents",
  href: "/clinical-flow/upload"
}, {
  id: 1,
  name: "Review Information",
  href: "/clinical-flow/review"
}, {
  id: 2,
  name: "Transcribe Assessment",
  href: "/clinical-flow/transcribe"
}, {
  id: 3,
  name: "Select Report",
  href: "/clinical-flow/select-report"
}, {
  id: 4,
  name: "Review Report",
  href: "/clinical-flow/review-report"
}];
const ProgressSteps = ({
  currentStep
}: ProgressStepsProps) => {
  return <div className="w-full">
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => <li key={step.name} className={cn(stepIdx !== steps.length - 1 ? "flex-1" : "", "relative")}>
              {step.id < currentStep ? <div className="group flex items-center">
                  <span className="flex items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
                      <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-900">{step.name}</span>
                  </span>
                  {stepIdx !== steps.length - 1 ? <div className="absolute right-0 top-4 hidden h-0.5 w-full bg-green-600 lg:block" /> : null}
                </div> : step.id === currentStep ? <div className="flex items-center" aria-current="step">
                  <span className="flex items-center" aria-hidden="true">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-green-600 bg-white text-sm font-medium text-green-600">
                      {step.id + 1}
                    </span>
                    <span className="ml-3 font-medium text-gray-900 text-sm">{step.name}</span>
                  </span>
                  {stepIdx !== steps.length - 1 ? <div className="absolute right-0 top-4 hidden h-0.5 w-full bg-gray-200 lg:block" /> : null}
                </div> : <div className="group flex items-center">
                  <span className="flex items-center" aria-hidden="true">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-medium text-gray-500">
                      {step.id + 1}
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-500">{step.name}</span>
                  </span>
                  {stepIdx !== steps.length - 1 ? <div className="absolute right-0 top-4 hidden h-0.5 w-full bg-gray-200 lg:block" /> : null}
                </div>}
            </li>)}
        </ol>
      </nav>
    </div>;
};
export default ProgressSteps;