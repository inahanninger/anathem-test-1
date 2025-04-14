
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface ClinicalDetailsTabProps {
  clinicalDetails: string;
  setClinicalDetails: (value: string) => void;
}

const ClinicalDetailsTab = ({ clinicalDetails, setClinicalDetails }: ClinicalDetailsTabProps) => {
  // Initial form state with default values
  const [formData, setFormData] = useState({
    patientName: "James Wilson",
    dateOfBirth: "1980-12-05",
    homeAddress: "123 Main St, London, UK",
    contactNumber: "+1 (555) 123-4567",
    nhsNumber: "NHS123456789",
    referrer: "Dr. Emily Thompson",
    allergies: "Penicillin, Shellfish",
    careCoordinator: "Nurse Linda Martinez",
    reasonForReferral: "Assessment and management of chronic pain and hypertension"
  });

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update parent component state with serialized form data
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    
    // This converts the form data to a format compatible with the parent component's state
    const serializedData = serializeFormData(updatedFormData);
    setClinicalDetails(serializedData);
  };

  // Function to serialize form data for parent component
  const serializeFormData = (data: typeof formData) => {
    return `
## Patient Information
- **Patient Name:** ${data.patientName}
- **Date of Birth:** ${formatDate(data.dateOfBirth)}
- **Home Address:** ${data.homeAddress}
- **Contact Number:** ${data.contactNumber}
- **NHS Number:** ${data.nhsNumber}

## Referral Information
- **Referrer:** ${data.referrer}
- **Allergies:** ${data.allergies}
- **Care Coordinator/Key-Worker:** ${data.careCoordinator}

## Clinical Assessment
${data.reasonForReferral}
`;
  };

  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    } catch (e) {
      return dateString;
    }
  };

  // Format date from DD/MM/YYYY to YYYY-MM-DD for input field
  const parseDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      // Check if already in YYYY-MM-DD format
      if (dateString.includes('-')) return dateString;
      
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="p-5 space-y-6 bg-white border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="patientName" className="text-sm font-medium text-foreground">
            Patient Name
          </Label>
          <Input 
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="border-gray-200 focus:border-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-sm font-medium text-foreground">
            Date of Birth
          </Label>
          <Input 
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={parseDate(formData.dateOfBirth)}
            onChange={handleChange}
            className="border-gray-200 focus:border-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="homeAddress" className="text-sm font-medium text-foreground">
            Home Address
          </Label>
          <Input 
            id="homeAddress"
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleChange}
            className="border-gray-200 focus:border-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactNumber" className="text-sm font-medium text-foreground">
            Contact Number
          </Label>
          <Input 
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="border-gray-200 focus:border-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nhsNumber" className="text-sm font-medium text-foreground">
            NHS Number
          </Label>
          <Input 
            id="nhsNumber"
            name="nhsNumber"
            value={formData.nhsNumber}
            onChange={handleChange}
            className="border-gray-200 focus:border-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="referrer" className="text-sm font-medium text-foreground">
            Referrer
          </Label>
          <Input 
            id="referrer"
            name="referrer"
            value={formData.referrer}
            onChange={handleChange}
            className="border-gray-200 focus:border-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="allergies" className="text-sm font-medium text-foreground">
            Allergies
          </Label>
          <Input 
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="border-gray-200 focus:border-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="careCoordinator" className="text-sm font-medium text-foreground">
            Care Coordinator/Key-Worker
          </Label>
          <Input 
            id="careCoordinator"
            name="careCoordinator"
            value={formData.careCoordinator}
            onChange={handleChange}
            className="border-gray-200 focus:border-primary"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reasonForReferral" className="text-sm font-medium text-foreground">
          Reason for Referral
        </Label>
        <Textarea 
          id="reasonForReferral"
          name="reasonForReferral"
          value={formData.reasonForReferral}
          onChange={handleChange}
          className="min-h-[100px] border-gray-200 focus:border-primary resize-none"
        />
      </div>
    </Card>
  );
};

export default ClinicalDetailsTab;
