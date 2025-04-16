import { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import StepProgress from "@/components/StepProgress";

const workflowSteps = [{
  name: "Upload",
  path: "/workflow/upload"
}, {
  name: "Review",
  path: "/workflow/review"
}, {
  name: "Transcribe",
  path: "/workflow/transcribe"
}, {
  name: "Report",
  path: "/workflow/report"
}];

const ReviewInformationPage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [dateOfBirth, setDateOfBirth] = useState("05/12/1980");
  const [homeAddress, setHomeAddress] = useState("123 Main St, London, UK");
  const [contactNumber, setContactNumber] = useState("+1 (555) 123-4567");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const [referrer, setReferrer] = useState("Dr. Emily Thompson");
  const [allergies, setAllergies] = useState("Penicillin, Shellfish");
  const [careCoordinator, setCareCoordinator] = useState("Nurse Linda Martinez");
  const [referralReason, setReferralReason] = useState("Assessment and management of chronic pain and hypertension");
  const [medicalSummary, setMedicalSummary] = useState("Patient reports experiencing moderate depressive symptoms for approximately 3 months, including low mood, decreased interest in activities, and poor sleep. Patient also mentions occasional anxiety in social situations.");
  const [assessmentNotes, setAssessmentNotes] = useState("Initial assessment indicates mild to moderate depression with comorbid social anxiety. Patient is responsive to cognitive behavioral approaches and shows good insight into their condition.");

  const handleSave = () => {
    toast.success("Patient information saved");
  };

  return <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px]">
        <div className="container mx-auto" style={{ maxWidth: "1243px" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <Label htmlFor="patientName" className="text-xs text-muted-foreground mb-1">Patient Name</Label>
                <Input id="patientName" value={patientName} onChange={e => setPatientName(e.target.value)} className="h-8 w-[180px] text-sm" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="nhsNumber" className="text-xs text-muted-foreground mb-1">NHS Number</Label>
                <Input id="nhsNumber" value={nhsNumber} onChange={e => setNhsNumber(e.target.value)} className="h-8 w-[140px] text-sm" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm">
                <Link to="/workflow/upload" className="flex items-center gap-1">
                  <ArrowLeftIcon size={16} /> Back
                </Link>
              </Button>
              <Button className="bg-blue-800 hover:bg-blue-900 text-sm">
                <Link to="/workflow/transcribe" className="flex items-center gap-1">
                  Continue <ArrowRightIcon size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-4" style={{ maxWidth: "1243px" }}>
        <StepProgress currentStep={2} steps={workflowSteps} />
      </div>
      
      <div className="container mx-auto px-6 py-8" style={{ maxWidth: "1243px" }}>
        <h1 className="font-bold mb-1 text-lg">Review Patient Information</h1>
        <p className="text-gray-600 mb-8 text-sm">
          Please review and update the patient information below.
        </p>
        
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Patient Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="patientName" className="mb-1 block">Patient Name</Label>
              <Input id="patientName" value={patientName} onChange={e => setPatientName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="dob" className="mb-1 block">Date of Birth</Label>
              <Input id="dob" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="homeAddress" className="mb-1 block">Home Address</Label>
              <Input id="homeAddress" value={homeAddress} onChange={e => setHomeAddress(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="contactNumber" className="mb-1 block">Contact Number</Label>
              <Input id="contactNumber" value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="nhsNumber" className="mb-1 block">NHS Number</Label>
              <Input id="nhsNumber" value={nhsNumber} onChange={e => setNhsNumber(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="referrer" className="mb-1 block">Referrer</Label>
              <Input id="referrer" value={referrer} onChange={e => setReferrer(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="allergies" className="mb-1 block">Allergies</Label>
              <Input id="allergies" value={allergies} onChange={e => setAllergies(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="careCoordinator" className="mb-1 block">Care Coordinator/Key-Worker</Label>
              <Input id="careCoordinator" value={careCoordinator} onChange={e => setCareCoordinator(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="referralReason" className="mb-1 block">Reason for Referral</Label>
              <Textarea id="referralReason" value={referralReason} onChange={e => setReferralReason(e.target.value)} className="min-h-[100px]" />
            </div>
          </div>
          
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">QB Summary</h2>
            <Textarea value={medicalSummary} onChange={e => setMedicalSummary(e.target.value)} className="min-h-[200px] mb-4" placeholder="Enter medical summary here..." />
            
          </Card>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Connor's Questionnaire Summary</h2>
            <Textarea value={assessmentNotes} onChange={e => setAssessmentNotes(e.target.value)} className="min-h-[200px] mb-4" placeholder="Enter assessment notes here..." />
            
          </Card>
        </div>
      </div>
    </div>;
};

export default ReviewInformationPage;
