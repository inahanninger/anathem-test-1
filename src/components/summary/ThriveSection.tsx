
import { useState } from "react";
import { ClipboardCopyIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import EditableField from "@/components/EditableField";

const ThriveSection = () => {
  const [threatText, setThreatText] = useState(
    "The immediate threat is verbal only at this time. The neighbour, Mr. John Davies, has shouted aggressive threats through the fence, including 'I'll make you regret it' after a disagreement over property boundaries. No immediate physical violence reported."
  );
  
  const [harmText, setHarmText] = useState(
    "Risk of emotional harm to Mrs. Lewis, who is visibly distressed and lives alone. Caller reports past history of anti-social behaviour by the neighbour, though no previous physical assaults. Potential for escalation if not addressed."
  );
  
  const [riskText, setRiskText] = useState(
    "Low immediate physical risk, but moderate risk of further harassment or escalation if left unresolved. Risk of repeat incidents based on prior behaviour pattern. Neighbour known to police for previous noise complaints and minor public order offences."
  );
  
  const [investigationText, setInvestigationText] = useState(
    "Opportunity to obtain evidential CCTV footage from Mrs. Lewis' Ring doorbell and neighbouring properties. Potential to identify whether criminal offences (public order) have occurred. Caller willing to provide a written statement."
  );
  
  const [vulnerabilityText, setVulnerabilityText] = useState(
    "Mrs. Lewis is a 68-year-old female living alone with no nearby family support. She expressed anxiety about leaving her property due to fear of encountering the neighbour. Limited mobility issues increase her sense of vulnerability."
  );
  
  return (
    <div className="space-y-8">
      <h2 className="text-lg font-medium">THRIVE Summary</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Threat (T)</h3>
            <button className="text-blue-600 hover:text-blue-800">
              <ClipboardCopyIcon className="h-4 w-4" />
            </button>
          </div>
          <Textarea 
            value={threatText}
            onChange={(e) => setThreatText(e.target.value)}
            className="min-h-[100px] resize-none overflow-visible"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Harm (H)</h3>
            <button className="text-blue-600 hover:text-blue-800">
              <ClipboardCopyIcon className="h-4 w-4" />
            </button>
          </div>
          <Textarea 
            value={harmText}
            onChange={(e) => setHarmText(e.target.value)}
            className="min-h-[100px] resize-none overflow-visible"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Risk (R)</h3>
            <button className="text-blue-600 hover:text-blue-800">
              <ClipboardCopyIcon className="h-4 w-4" />
            </button>
          </div>
          <Textarea 
            value={riskText}
            onChange={(e) => setRiskText(e.target.value)}
            className="min-h-[100px] resize-none overflow-visible"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Investigation (I)</h3>
            <button className="text-blue-600 hover:text-blue-800">
              <ClipboardCopyIcon className="h-4 w-4" />
            </button>
          </div>
          <Textarea 
            value={investigationText}
            onChange={(e) => setInvestigationText(e.target.value)}
            className="min-h-[100px] resize-none overflow-visible"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Vulnerability (V)</h3>
            <button className="text-blue-600 hover:text-blue-800">
              <ClipboardCopyIcon className="h-4 w-4" />
            </button>
          </div>
          <Textarea 
            value={vulnerabilityText}
            onChange={(e) => setVulnerabilityText(e.target.value)}
            className="min-h-[100px] resize-none overflow-visible"
          />
        </div>
      </div>
    </div>
  );
};

export default ThriveSection;
