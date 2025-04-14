
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import ProgressSteps from "@/components/ClinicalFlow/ProgressSteps";
import { Card } from "@/components/ui/card";

const ReviewInfoPage = () => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(true);
  
  const [patientInfo, setPatientInfo] = useState({
    patientName: "James Wilson",
    dateOfBirth: "05/12/1980",
    homeAddress: "123 Main St, London, UK",
    contactNumber: "+1 (555) 123-4567",
    nhsNumber: "NHS123456789",
    referrer: "Dr. Emily Thompson",
    allergies: "Penicillin, Shellfish",
    careCoordinator: "Nurse Linda Martinez",
    referralReason: "Assessment and management of chronic pain and hypertension"
  });

  const handlePatientInfoChange = (field: string, value: string) => {
    setPatientInfo({
      ...patientInfo,
      [field]: value
    });
  };

  const handleContinue = () => {
    navigate("/clinical-flow/transcribe");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold text-blue-700 mb-2">Clinical Report Generation</h1>
        <p className="text-gray-600 mb-8">Complete all steps to generate a comprehensive clinical report</p>
        
        <ProgressSteps currentStep={1} />

        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Review Extracted Information</h2>
            <p className="text-gray-600">Review and verify the information extracted from uploaded documents.</p>
          </div>

          <Card className="p-0 overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            >
              <h3 className="text-lg font-semibold text-blue-700">Clinical Details</h3>
              <Button variant="ghost" size="sm">
                {showDetails ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                <span className="ml-1">{showDetails ? 'Hide' : 'Show'}</span>
              </Button>
            </div>
            
            {showDetails && (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="patientName" className="text-sm text-gray-700 mb-1">Patient Name</Label>
                  <Input 
                    id="patientName" 
                    value={patientInfo.patientName} 
                    onChange={(e) => handlePatientInfoChange("patientName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth" className="text-sm text-gray-700 mb-1">Date of Birth</Label>
                  <Input 
                    id="dateOfBirth" 
                    value={patientInfo.dateOfBirth} 
                    onChange={(e) => handlePatientInfoChange("dateOfBirth", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="homeAddress" className="text-sm text-gray-700 mb-1">Home Address</Label>
                  <Input 
                    id="homeAddress" 
                    value={patientInfo.homeAddress} 
                    onChange={(e) => handlePatientInfoChange("homeAddress", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contactNumber" className="text-sm text-gray-700 mb-1">Contact Number</Label>
                  <Input 
                    id="contactNumber" 
                    value={patientInfo.contactNumber} 
                    onChange={(e) => handlePatientInfoChange("contactNumber", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="nhsNumber" className="text-sm text-gray-700 mb-1">NHS Number</Label>
                  <Input 
                    id="nhsNumber" 
                    value={patientInfo.nhsNumber} 
                    onChange={(e) => handlePatientInfoChange("nhsNumber", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="referrer" className="text-sm text-gray-700 mb-1">Referrer</Label>
                  <Input 
                    id="referrer" 
                    value={patientInfo.referrer} 
                    onChange={(e) => handlePatientInfoChange("referrer", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="allergies" className="text-sm text-gray-700 mb-1">Allergies</Label>
                  <Input 
                    id="allergies" 
                    value={patientInfo.allergies} 
                    onChange={(e) => handlePatientInfoChange("allergies", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="careCoordinator" className="text-sm text-gray-700 mb-1">Care Coordinator/Key-Worker</Label>
                  <Input 
                    id="careCoordinator" 
                    value={patientInfo.careCoordinator} 
                    onChange={(e) => handlePatientInfoChange("careCoordinator", e.target.value)}
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <Label htmlFor="referralReason" className="text-sm text-gray-700 mb-1">Reason for Referral</Label>
                  <Textarea 
                    id="referralReason" 
                    value={patientInfo.referralReason} 
                    onChange={(e) => handlePatientInfoChange("referralReason", e.target.value)}
                    className="resize-none"
                    rows={4}
                  />
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            className="bg-blue-700 hover:bg-blue-800 px-8"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewInfoPage;
