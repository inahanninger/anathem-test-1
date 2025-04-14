
import { useState } from "react";
import { ArrowLeftIcon, ClipboardIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";
import TableOfContents from "@/components/TableOfContents";
import ThriveSection from "@/components/summary/ThriveSection";

const SummaryViewPage = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("Laura Doe");
  const [patientId, setPatientId] = useState("SCR-11234");
  const [activeTab, setActiveTab] = useState("interaction-summary");
  const [showSources, setShowSources] = useState(false);
  
  const tocItems = [
    { id: "thrive-summary", title: "THRIVE Summary", level: 1 },
    { id: "actions", title: "Actions", level: 1 },
    { id: "person-information", title: "Person Information", level: 1 }
  ];
  
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 bg-white py-0">
        <div className="container max-w-5xl mx-auto">
          <Breadcrumb className="py-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/transcribe" className="flex items-center gap-1 text-blue-600">
                  <ArrowLeftIcon size={16} />
                  <span className="text-xs text-neutral-600">Transcribe</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/risk-assessment" className="text-xs text-neutral-600">Risk Assessment</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/summary-view" className="text-xs font-medium">Summary View</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem className="ml-auto">
                <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm" onClick={() => navigate('/risk-assessment')}>
                  Back
                </Button>
                <Button className="bg-blue-800 hover:bg-blue-900 text-sm">
                  Save All
                </Button>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-gray-50/80 py-3 px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="font-medium">{patientName}</h2>
                <p className="text-sm text-muted-foreground">{patientId}</p>
              </div>
            </div>
            <Button 
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5"
              onClick={() => setShowSources(!showSources)}
            >
              <ClipboardIcon className="h-4 w-4" />
              View Sources
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container max-w-5xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Interaction Documentation</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">33%</span>
            <Progress value={33} className="h-1.5 w-48" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Collapsible defaultOpen={true}>
              <div className="border rounded-md bg-white">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 border-b">
                  <h3 className="font-medium">Table of Contents</h3>
                  <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                    <ArrowLeftIcon className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="py-2">
                    {tocItems.map(item => (
                      <Button 
                        key={item.id} 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start text-left pl-4 py-1.5 h-auto" 
                      >
                        {item.title}
                      </Button>
                    ))}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue="interaction-summary" className="w-full">
              <div className="flex items-center mb-4 overflow-x-auto">
                <TabsList className="bg-transparent p-0 h-auto">
                  <TabsTrigger 
                    value="interaction-summary" 
                    className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
                  >
                    Interaction Summary
                  </TabsTrigger>
                  <TabsTrigger 
                    value="mg11" 
                    className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
                  >
                    MG11
                  </TabsTrigger>
                  <TabsTrigger 
                    value="mg11b" 
                    className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
                  >
                    MG11b
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="interaction-summary" className="border rounded-md p-6 mt-0">
                <ThriveSection />
              </TabsContent>
              
              <TabsContent value="mg11" className="border rounded-md p-6 mt-0">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">MG11 form content would go here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="mg11b" className="border rounded-md p-6 mt-0">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">MG11b form content would go here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryViewPage;
