
import React, { useState } from "react";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import { FileText, Users, FileTextIcon, PlayCircle, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const HelpSupportPage = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [email, setEmail] = useState("");
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) {
      toast.error("Please enter feedback message");
      return;
    }
    toast.success("Thank you for your feedback!");
    setFeedbackMessage("");
    setEmail("");
  };
  const handleEmailSupport = () => {
    window.location.href = "mailto:support@mediassist.com?subject=Support Request";
  };
  return <ClinicalLayout>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px]">
          <div className="container mx-auto w-6xl">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-neutral-900">Help</h1>
              <Button size="sm" onClick={handleEmailSupport} className="bg-blue-800 hover:bg-blue-900">
                <Mail className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8 w-6xl">
          
          
          {/* Resources Section */}
          <div className="mb-10">
            <h2 className="text-lg mb-2 font-semibold">Resources</h2>
            <p className="text-neutral-600 mb-6">Learn how Anathem works.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border border-neutral-100 shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4 flex items-center">
                  <div className="mr-4 p-2 bg-blue-50 rounded-md">
                    <FileText className="h-5 w-5 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sign-in Using Authenticator</h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-neutral-100 shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4 flex items-center">
                  <div className="mr-4 p-2 bg-blue-50 rounded-md">
                    <Users className="h-5 w-5 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-medium">Create Paperwork using Anathem</h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-neutral-100 shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4 flex items-center">
                  <div className="mr-4 p-2 bg-blue-50 rounded-md">
                    <FileTextIcon className="h-5 w-5 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-medium">Watch Anathem Demo</h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-neutral-100 shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4 flex items-center">
                  <div className="mr-4 p-2 bg-blue-50 rounded-md">
                    <PlayCircle className="h-5 w-5 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-medium">Tutorials</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* External Support Section */}
          <div className="mb-6">
            
            
            
            
            
            <Card className="border border-neutral-100 mb-6">
              
            </Card>
            
            <div className="mt-10">
              
              {/* Removed the Contact Support Team button from here */}
            </div>
            
            <div className="mt-10">
              <h3 className="mb-4 font-semibold text-lg">Submit Feedback</h3>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-neutral-700">
                    Email (optional)
                  </label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your.email@example.com" className="max-w-md" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-neutral-700">
                    Feedback
                  </label>
                  <Textarea id="message" value={feedbackMessage} onChange={e => setFeedbackMessage(e.target.value)} placeholder="Please share your thoughts, suggestions, or report any issues..." rows={4} className="resize-none max-w-md" />
                </div>
                <Button size="sm" type="submit" className="bg-blue-800 hover:bg-blue-900">
                  Submit Feedback
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ClinicalLayout>;
};

export default HelpSupportPage;
