
import ReviewPage from "../ReviewPage";
import WorkflowHeader from "@/components/workflow/WorkflowHeader";
import { useState } from "react";
import { mainWorkflowSteps } from "@/constants/workflowSteps";

const WorkflowReportPage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");

  return <div className="min-h-screen bg-white">
      <WorkflowHeader 
        patientName={patientName}
        setPatientName={setPatientName}
        nhsNumber={nhsNumber}
        setNhsNumber={setNhsNumber}
        completedSections={2}
        totalSections={6}
        currentStep={5}
        steps={mainWorkflowSteps}
        backLink="/workflow/generate"
        nextLink="/"
        nextButtonText="Finish"
        showStepper={false}
      />
      
      <div className="mt-0">
        <ReviewPage />
      </div>
    </div>;
};

export default WorkflowReportPage;
