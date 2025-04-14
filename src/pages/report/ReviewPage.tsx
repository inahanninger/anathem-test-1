
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Stepper from "@/components/Stepper";
import CollapsibleSection from "@/components/CollapsibleSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  { id: 1, name: "Upload", description: "Upload supporting documents" },
  { id: 2, name: "Review", description: "Review information" },
  { id: 3, name: "Transcribe", description: "Record consultation" },
  { id: 4, name: "Select", description: "Select report type" },
  { id: 5, name: "Review", description: "Final review" },
];

export default function ReviewPage() {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    firstName: "John",
    lastName: "Doe",
    dob: "1985-05-15",
    gender: "Male",
    patientId: "PT-1234567",
    referrer: "Dr. Sarah Johnson",
    referrerSpecialty: "Family Medicine",
    referrerContact: "555-123-4567",
    primaryConcern: "Persistent headaches and dizziness for the past 3 weeks",
    previousTreatments: "OTC pain relievers with minimal relief",
    relevantHistory: "History of migraines in family (mother and sister)",
    currentMedications: "Lisinopril 10mg daily, Multivitamin"
  });

  const handlePatientDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatientData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 bg-white py-3">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-6 mt-4">
            <Stepper steps={steps} currentStep={2} />
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-6 py-6">
        <Card className="mb-6 shadow-sm border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-blue-800">Review Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <CollapsibleSection title="Patient Information" defaultOpen={true} className="border-0 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm text-gray-600">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    value={patientData.firstName} 
                    onChange={handlePatientDataChange} 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm text-gray-600">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    value={patientData.lastName} 
                    onChange={handlePatientDataChange}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="dob" className="text-sm text-gray-600">Date of Birth</Label>
                  <Input 
                    id="dob" 
                    name="dob" 
                    type="date" 
                    value={patientData.dob} 
                    onChange={handlePatientDataChange}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="gender" className="text-sm text-gray-600">Gender</Label>
                  <Input 
                    id="gender" 
                    name="gender" 
                    value={patientData.gender} 
                    onChange={handlePatientDataChange}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="patientId" className="text-sm text-gray-600">Patient ID</Label>
                  <Input 
                    id="patientId" 
                    name="patientId" 
                    value={patientData.patientId} 
                    onChange={handlePatientDataChange}
                    className="mt-1" 
                  />
                </div>
              </div>
            </CollapsibleSection>
            
            <CollapsibleSection title="Referral Information" className="border-0 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="referrer" className="text-sm text-gray-600">Referring Clinician</Label>
                  <Input 
                    id="referrer" 
                    name="referrer" 
                    value={patientData.referrer} 
                    onChange={handlePatientDataChange}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="referrerSpecialty" className="text-sm text-gray-600">Specialty</Label>
                  <Input 
                    id="referrerSpecialty" 
                    name="referrerSpecialty" 
                    value={patientData.referrerSpecialty} 
                    onChange={handlePatientDataChange}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="referrerContact" className="text-sm text-gray-600">Contact Number</Label>
                  <Input 
                    id="referrerContact" 
                    name="referrerContact" 
                    value={patientData.referrerContact} 
                    onChange={handlePatientDataChange}
                    className="mt-1" 
                  />
                </div>
              </div>
            </CollapsibleSection>
            
            <CollapsibleSection title="Clinical Information" className="border-0">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="primaryConcern" className="text-sm text-gray-600">Primary Concern</Label>
                  <Textarea 
                    id="primaryConcern" 
                    name="primaryConcern" 
                    value={patientData.primaryConcern} 
                    onChange={handlePatientDataChange} 
                    className="min-h-[80px] mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="previousTreatments" className="text-sm text-gray-600">Previous Treatments</Label>
                  <Textarea 
                    id="previousTreatments" 
                    name="previousTreatments" 
                    value={patientData.previousTreatments} 
                    onChange={handlePatientDataChange}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="relevantHistory" className="text-sm text-gray-600">Relevant Medical History</Label>
                  <Textarea 
                    id="relevantHistory" 
                    name="relevantHistory" 
                    value={patientData.relevantHistory} 
                    onChange={handlePatientDataChange}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="currentMedications" className="text-sm text-gray-600">Current Medications</Label>
                  <Textarea 
                    id="currentMedications" 
                    name="currentMedications" 
                    value={patientData.currentMedications} 
                    onChange={handlePatientDataChange}
                    className="mt-1" 
                  />
                </div>
              </div>
            </CollapsibleSection>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/report/upload")}
            className="flex items-center gap-2 border-gray-300 text-gray-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button 
            onClick={() => navigate("/report/transcribe")}
            className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
