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
        <div className="border-b border-gray-100 px-6 py-[12px] bg-white">
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-neutral-900 text-2xl">Help & Support</h1>
              <Button onClick={handleEmailSupport} className="bg-blue-800 hover:bg-blue-900">
                <Mail className="mr-2" />
                Contact Support Team
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8 w-6xl">
          
          
          {/* Resources Section */}
          <div className="mb-10">
            <h2 className="text-lg mb-2 font-semibold">Resources</h2>
            <p className="mb-6 text-inherit">Learn how Anathem works.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border border-neutral-100 shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4 flex items-center">
                  <div className="mr-4 p-2 bg-blue-50 rounded-md">
                    <FileText className="h-5 w-5 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">Sign-in Using Authenticator</h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-neutral-100 shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4 flex items-center">
                  <div className="mr-4 p-2 bg-blue-50 rounded-md">
                    <Users className="h-5 w-5 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">Create Paperwork using Anathem</h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-neutral-100 shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4 flex items-center">
                  <div className="mr-4 p-2 bg-blue-50 rounded-md">
                    <FileTextIcon className="h-5 w-5 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">Watch Anathem Demo</h3>
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
                <Button type="submit" variant="outline" className="border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50">
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