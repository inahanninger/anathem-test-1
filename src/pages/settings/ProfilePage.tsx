
import React, { useState } from 'react';
import SettingsLayout from '@/components/settings/SettingsLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { toast } = useToast();
  const [signature, setSignature] = useState<File | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    clinicianName: 'Dr. John Doe',
    role: 'Consultant Psychiatrist',
    clinicAddress: '123 Medical Center,\nHarley Street,\nLondon, W1G 6AB'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setSignature(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setSignaturePreview(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file for your signature",
          variant: "destructive"
        });
      }
    }
  };

  const clearSignature = () => {
    setSignature(null);
    setSignaturePreview('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  };

  return (
    <SettingsLayout title="Profile Settings">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Clinician Information</h2>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="clinicianName">Full Name</Label>
                <Input 
                  id="clinicianName"
                  name="clinicianName"
                  value={formData.clinicianName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="role">Professional Role</Label>
                <Input 
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Enter your professional title"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Signature</h2>
            <p className="text-sm text-gray-600">Upload your signature for use in reports and documents</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {signaturePreview ? (
                    <div className="relative group">
                      <img 
                        src={signaturePreview} 
                        alt="Signature preview" 
                        className="w-full h-48 object-contain p-4"
                      />
                      <Button 
                        type="button"
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={clearSignature}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full h-48 flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md">
                      <FileText className="h-10 w-10 text-gray-300 mb-2" />
                      <p className="text-sm text-gray-600">No signature uploaded</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex items-center">
                <div className="space-y-3 w-full">
                  <Label htmlFor="signature">Upload Signature</Label>
                  <div className="flex items-center">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => document.getElementById('signature')?.click()}
                      className="flex items-center"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select File
                    </Button>
                    <span className="ml-3 text-sm text-gray-600">
                      {signature ? signature.name : 'No file selected'}
                    </span>
                  </div>
                  <input
                    type="file"
                    id="signature"
                    onChange={handleSignatureUpload}
                    accept="image/*"
                    className="sr-only"
                  />
                  <p className="text-xs text-gray-500">Supported formats: JPG, PNG, GIF, SVG</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Clinic Address</h2>
            <p className="text-sm text-gray-600">This will appear on your letterheads and reports</p>
            
            <Textarea 
              id="clinicAddress"
              name="clinicAddress"
              value={formData.clinicAddress}
              onChange={handleInputChange}
              placeholder="Enter your clinic address"
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" className="bg-blue-800 hover:bg-blue-900">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </SettingsLayout>
  );
};

export default ProfilePage;
