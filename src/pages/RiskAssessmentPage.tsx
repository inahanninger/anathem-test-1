
import { useState } from "react";
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon, PlusCircleIcon, ClipboardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";
import RiskFactorItem from "@/components/risk/RiskFactorItem";
import QuotesPanel from "@/components/risk/QuotesPanel";
import { RiskFactor } from "@/types/risk";

const RiskAssessmentPage = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("Laura Doe");
  const [patientId, setPatientId] = useState("SCR-11234");
  const [isFactorsOpen, setIsFactorsOpen] = useState(true);
  const [showSources, setShowSources] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFactor, setExpandedFactor] = useState<string | null>("harm");
  const [completedSections, setCompletedSections] = useState(2);
  const totalSections = 6;
  
  const riskFactors: RiskFactor[] = [
    { id: "threat", name: "Threat", status: "red", completed: 0, total: 8, isExpanded: false },
    { id: "harm", name: "Harm", status: "amber", completed: 4, total: 10, isExpanded: true,
      items: [
        { id: "physical-injury", name: "Physical injury (actual or potential)", description: "Bodily harm assessment" },
        { id: "psychological-trauma", name: "Psychological/emotional trauma", description: "Mental health impact evaluation", quotes: 1 },
        { id: "financial-damage", name: "Financial/economic damage", description: "Material and monetary losses" },
        { id: "reputational-harm", name: "Reputational harm", description: "Impact on social standing" },
        { id: "community-impact", name: "Community impact/harm", description: "Effects on broader community" },
        { id: "environmental-damage", name: "Environmental damage", description: "Ecological consequences" }
      ]
    },
    { id: "risk", name: "Risk", status: "green", completed: 7, total: 11, isExpanded: false },
    { id: "investigation", name: "Investigation", status: "amber", completed: 5, total: 12, isExpanded: false },
    { id: "vulnerability", name: "Vulnerability", status: "amber", completed: 4, total: 18, isExpanded: false },
    { id: "engagement", name: "Engagement", status: "green", completed: 11, total: 13, isExpanded: false },
    { id: "officer-decision", name: "Officer Decision-Making", status: "green", completed: 7, total: 8, isExpanded: false },
    { id: "environmental-context", name: "Environmental Context", status: "green", completed: 5, total: 8, isExpanded: false },
    { id: "resource-considerations", name: "Resource Considerations", status: "green", completed: 5, total: 7, isExpanded: false },
    { id: "legal-framework", name: "Legal Framework", status: "green", completed: 6, total: 7, isExpanded: false },
    { id: "public-interest", name: "Public Interest Factors", status: "green", completed: 5, total: 7, isExpanded: false },
    { id: "outcome-evaluation", name: "Outcome Evaluation", status: "amber", completed: 3, total: 6, isExpanded: false },
    { id: "technological-considerations", name: "Technological Considerations", status: "amber", completed: 2, total: 5, isExpanded: false },
    { id: "intelligence-context", name: "Intelligence Context", status: "red", completed: 0, total: 4, isExpanded: false },
    { id: "victim-specific", name: "Victim-Specific Factors", status: "amber", completed: 3, total: 7, isExpanded: false }
  ];
  
  const filteredFactors = riskFactors.filter(factor => 
    factor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleFactorClick = (factorId: string) => {
    setExpandedFactor(expandedFactor === factorId ? null : factorId);
  };
  
  const handleAddQuote = () => {
    // Logic to add a quote would go here
  };
  
  const percentage = Math.round(completedSections / totalSections * 100);
  
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
                <BreadcrumbLink href="/risk-assessment" className="text-xs font-medium">Risk Assessment</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/review" className="text-xs text-neutral-600">Review Summaries</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem className="ml-auto">
                <Button variant="outline" className="text-neutral-800 bg-neutral-200 hover:bg-neutral-100 text-sm" onClick={() => navigate('/transcribe')}>
                  Back
                </Button>
                <Button className="bg-blue-800 hover:bg-blue-900 text-sm" onClick={() => navigate('/summary-view')}>
                  Submit
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
          <h1 className="text-xl font-semibold">Risk & Vulnerability Hub</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{percentage}%</span>
            <Progress value={percentage} className="h-1.5 w-48" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="border">
              <Collapsible open={isFactorsOpen} onOpenChange={setIsFactorsOpen}>
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="font-medium">Risk Factors</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                      {isFactorsOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent>
                  <div className="py-2">
                    {filteredFactors.map((factor) => (
                      <div 
                        key={factor.id}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-50 ${expandedFactor === factor.id ? 'bg-gray-100' : ''}`}
                        onClick={() => handleFactorClick(factor.id)}
                      >
                        <span className="text-sm">{factor.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t">
                    <Input 
                      placeholder="Search risk factors..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <div className="space-y-6">
              {riskFactors.map(factor => {
                if (factor.id === expandedFactor && factor.items) {
                  return (
                    <RiskFactorItem 
                      key={factor.id}
                      factor={factor}
                      onAddQuote={handleAddQuote}
                    />
                  );
                }
                return null;
              })}
              
              {!expandedFactor && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Select a risk factor from the left to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {expandedFactor === "harm" && (
        <div className="fixed bottom-6 right-6 z-10">
          <QuotesPanel onAddQuote={handleAddQuote} />
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentPage;
