
import React, { useState } from "react";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import { Mail, MessageSquare, HelpCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const HelpSupportPage = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) {
      toast.error("Please enter feedback message");
      return;
    }

    // Submit feedback logic would go here
    toast.success("Thank you for your feedback!");
    setFeedbackMessage("");
    setEmail("");
    setSubject("");
  };

  const handleEmailSupport = () => {
    window.location.href = "mailto:support@mediassist.com?subject=Support Request";
  };

  return (
    <ClinicalLayout>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-[12px]">
          <div className="container mx-auto w-6xl">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-neutral-900">Help & Support</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8 w-6xl">
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
              <TabsTrigger value="support">Support Options</TabsTrigger>
              <TabsTrigger value="feedback">Give Feedback</TabsTrigger>
            </TabsList>
            
            {/* Video Tutorials Tab */}
            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Getting Started</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-md border border-neutral-100">
                      <AspectRatio ratio={16/9}>
                        <iframe 
                          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                          title="Getting Started" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          className="h-full w-full"
                          allowFullScreen
                        />
                      </AspectRatio>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Learn the basics of using MediAssist for patient assessments.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Advanced Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-md border border-neutral-100">
                      <AspectRatio ratio={16/9}>
                        <iframe 
                          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                          title="Advanced Features" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          className="h-full w-full"
                          allowFullScreen
                        />
                      </AspectRatio>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Discover advanced features to streamline your workflow.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Document Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-md border border-neutral-100">
                      <AspectRatio ratio={16/9}>
                        <iframe 
                          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                          title="Document Management" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          className="h-full w-full"
                          allowFullScreen
                        />
                      </AspectRatio>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Learn how to manage patient documents efficiently.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Assessment Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-md border border-neutral-100">
                      <AspectRatio ratio={16/9}>
                        <iframe 
                          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                          title="Assessment Reports" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          className="h-full w-full"
                          allowFullScreen
                        />
                      </AspectRatio>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Create comprehensive assessment reports quickly.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Support Options Tab */}
            <TabsContent value="support">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-800" />
                      <CardTitle>Email Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Our support team is available Monday-Friday, 9am-5pm.</p>
                    <Button 
                      onClick={handleEmailSupport}
                      className="bg-blue-800 hover:bg-blue-900"
                    >
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-800" />
                      <CardTitle>FAQs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <h3 className="font-medium">How do I create a new patient record?</h3>
                        <p className="text-sm text-muted-foreground">Go to Patient Start and enter the required information.</p>
                      </li>
                      <Separator className="my-2" />
                      <li>
                        <h3 className="font-medium">Can I export assessment results?</h3>
                        <p className="text-sm text-muted-foreground">Yes, use the export button on the report page.</p>
                      </li>
                      <Separator className="my-2" />
                      <li>
                        <h3 className="font-medium">How do I update patient information?</h3>
                        <p className="text-sm text-muted-foreground">Edit the patient profile from the patient details page.</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-800" />
                      <CardTitle>Knowledge Base</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="justify-start">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Getting Started Guide
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        User Manual
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Troubleshooting
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Feedback Tab */}
            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>We Value Your Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-neutral-700">
                          Email (optional)
                        </label>
                        <Input 
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1.5 text-neutral-700">
                          Subject
                        </label>
                        <Input 
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="What is your feedback about?"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-neutral-700">
                        Message
                      </label>
                      <Textarea 
                        id="message"
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                        placeholder="Please share your thoughts, suggestions, or report any issues..."
                        rows={5}
                        className="resize-none"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-blue-800 hover:bg-blue-900"
                    >
                      Submit Feedback
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ClinicalLayout>
  );
};

export default HelpSupportPage;
