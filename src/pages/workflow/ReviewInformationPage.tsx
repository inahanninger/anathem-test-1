
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

const workflowSteps = [
  { name: "Upload", path: "/workflow/upload" },
  { name: "Review", path: "/workflow/review" },
  { name: "Transcribe", path: "/workflow/transcribe" },
  { name: "Generate", path: "/workflow/generate" },
  { name: "Report", path: "/workflow/report" }
];

const ReviewInformationPage = () => {
  const [patientName, setPatientName] = useState("James Wilson");
  const [nhsNumber, setNhsNumber] = useState("NHS123456789");
  const [dateOfBirth, setDateOfBirth] = useState("15/06/1985");
  const [address, setAddress] = useState("123 Main Street, London, SW1A 1AA");
  const [telephone, setTelephone] = useState("07700 900123");
  const [email, setEmail] = useState("james.wilson@example.com");
  const [medicalSummary, setMedicalSummary] = useState("Patient reports experiencing moderate depressive symptoms for approximately 3 months, including low mood, decreased interest in activities, and poor sleep. Patient also mentions occasional anxiety in social situations.");
  const [assessmentNotes, setAssessmentNotes] = useState("Initial assessment indicates mild to moderate depression with comorbid social anxiety. Patient is responsive to cognitive behavioral approaches and shows good insight into their condition.");

  const handleSave = () => {
    toast.success("Patient information saved");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 bg-white py-4">
        <div className="container max-w-5xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/" className="text-xs text-blue-600">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs">Document Assessment</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbItem className="ml-auto">
                <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm">
                  <Link to="/workflow/upload" className="flex items-center gap-1">
                    <ArrowLeftIcon size={16} /> Back
                  </Link>
                </Button>
                <Button className="bg-blue-800 hover:bg-blue-900 text-sm ml-2">
                  <Link to="/workflow/transcribe" className="flex items-center gap-1">
                    Continue <ArrowRightIcon size={16} />
                  </Link>
                </Button>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-gray-50/80 py-6 px-6">
        <div className="container max-w-5xl mx-auto">
          <StepProgress currentStep={2} steps={workflowSteps} />
        </div>
      </div>
      
      <div className="container max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Review Patient Information</h1>
        <p className="text-gray-600 mb-8">
          Please review and update the patient information below.
        </p>
        
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Patient Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="patientName" className="mb-1 block">Full Name</Label>
              <Input id="patientName" value={patientName} onChange={e => setPatientName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="nhsNumber" className="mb-1 block">NHS Number</Label>
              <Input id="nhsNumber" value={nhsNumber} onChange={e => setNhsNumber(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="dob" className="mb-1 block">Date of Birth</Label>
              <Input id="dob" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="telephone" className="mb-1 block">Telephone</Label>
              <Input id="telephone" value={telephone} onChange={e => setTelephone(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email" className="mb-1 block">Email</Label>
              <Input id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" />
            </div>
            <div>
              <Label htmlFor="address" className="mb-1 block">Address</Label>
              <Input id="address" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
          </div>
          <Button onClick={handleSave} className="w-full md:w-auto">Save Patient Details</Button>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Medical Summary</h2>
            <Textarea 
              value={medicalSummary} 
              onChange={e => setMedicalSummary(e.target.value)}
              className="min-h-[200px] mb-4"
              placeholder="Enter medical summary here..."
            />
            <Button onClick={handleSave}>Save Summary</Button>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Assessment Notes</h2>
            <Textarea 
              value={assessmentNotes} 
              onChange={e => setAssessmentNotes(e.target.value)}
              className="min-h-[200px] mb-4"
              placeholder="Enter assessment notes here..."
            />
            <Button onClick={handleSave}>Save Notes</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReviewInformationPage;
