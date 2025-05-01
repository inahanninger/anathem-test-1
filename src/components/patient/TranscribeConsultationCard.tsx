import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MicIcon, FileTextIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { RecordedSession } from "@/types/patient";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface TranscribeConsultationCardProps {
  isCompleted: boolean;
  recordedSessions: RecordedSession[];
}

const TranscribeConsultationCard: React.FC<TranscribeConsultationCardProps> = ({
  isCompleted,
  recordedSessions
}) => {
  const [selectedSession, setSelectedSession] = useState<RecordedSession | null>(null);
  const [showSplitView, setShowSplitView] = useState(false);
  
  const handleSessionClick = (session: RecordedSession) => {
    setSelectedSession(session);
    setShowSplitView(true);
  };
  
  const handleBackClick = () => {
    setShowSplitView(false);
  };
  
  if (showSplitView && selectedSession) {
    return <SessionSplitView session={selectedSession} onBack={handleBackClick} />;
  }
  
  return (
    <Card className={`h-full transition-all border ${isCompleted ? 'bg-emerald-50 border-emerald-100' : 'border-gray-100'}`}>
      <CardContent className="p-5 h-full flex flex-col">
        <h3 className="text-lg font-medium mb-4">Transcribe Consultation</h3>
        
        <Link to="/transcribe" className="w-full block mb-4">
          <Button className="w-full py-2 bg-blue-800 hover:bg-blue-700">
            <MicIcon className="mr-2 h-5 w-5" />
            <span>Transcribe</span>
          </Button>
        </Link>
        
        {recordedSessions.length > 0 && (
          <div className="space-y-3 flex-1">
            <h4 className="text-sm font-medium text-neutral-700">Recorded Sessions</h4>
            {recordedSessions.map(session => (
              <div 
                key={session.id}
                className="flex items-center justify-between p-3 bg-white rounded-md border shadow-sm hover:shadow transition-shadow cursor-pointer"
                onClick={() => handleSessionClick(session)}
              >
                <div>
                  <h5 className="font-medium">{session.title}</h5>
                  <div className="text-xs text-neutral-500">{session.date} · {session.duration}</div>
                </div>
                <Button variant="ghost" size="sm">
                  <FileTextIcon size={16} className="mr-2" />
                  View
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface SessionSplitViewProps {
  session: RecordedSession;
  onBack: () => void;
}

const SessionSplitView: React.FC<SessionSplitViewProps> = ({ session, onBack }) => {
  return (
    <Card className="h-full border border-gray-100">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{session.title}</h2>
            <p className="text-sm text-neutral-500">{session.date} · {session.duration}</p>
          </div>
          <Button variant="outline" size="sm" onClick={onBack} className="h-8">
            Back
          </Button>
        </div>
        
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="p-6 h-full overflow-y-auto">
              <h3 className="text-lg font-medium mb-4">Recorded Sessions</h3>
              <div className="space-y-3">
                <div className="p-3 bg-neutral-50 rounded-md border">
                  <h5 className="font-medium">{session.title}</h5>
                  <div className="text-xs text-neutral-500">{session.date} · {session.duration}</div>
                </div>
                {/* Placeholder for other sessions */}
                <div className="p-3 bg-white rounded-md border">
                  <h5 className="font-medium text-neutral-500">Other Session</h5>
                  <div className="text-xs text-neutral-500">Date · Duration</div>
                </div>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-gray-200 w-[3px] mx-[5px]" />
          
          <ResizablePanel defaultSize={70} minSize={50}>
            <Tabs defaultValue="content" className="h-full flex flex-col">
              <div className="border-b px-6 py-2">
                <TabsList>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="content" className="p-6 flex-1 overflow-y-auto">
                <h3 className="text-lg font-medium mb-4">Consultation Content</h3>
                <p className="text-sm text-neutral-700">
                  This is the full transcription of the consultation session. The content includes all details discussed during the {session.duration} consultation.
                </p>
                <div className="mt-4 p-4 bg-neutral-50 rounded-md">
                  <p className="text-sm">
                    Doctor: "Good morning James, how are you feeling today?"<br/><br/>
                    Patient: "I've been having trouble focusing at school lately."<br/><br/>
                    Doctor: "I see. Can you tell me more about when you notice this happening?"<br/><br/>
                    Patient: "Usually during math class, or when I have to sit still for a long time."<br/><br/>
                    Doctor: "How long has this been going on?"<br/><br/>
                    Patient: "My teacher said she started noticing it about two months ago."
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="summary" className="p-6 flex-1 overflow-y-auto">
                <h3 className="text-lg font-medium mb-4">Consultation Summary</h3>
                <p className="text-sm text-neutral-700">
                  This is an AI-generated summary of the key points discussed during the consultation.
                </p>
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-neutral-50 rounded-md">
                    <h4 className="font-medium mb-2">Key Symptoms</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Difficulty focusing at school</li>
                      <li>Struggles particularly during math class</li>
                      <li>Difficulty sitting still for extended periods</li>
                      <li>Symptoms first noticed by teacher approximately two months ago</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-md">
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Complete ADHD assessment form</li>
                      <li>Schedule follow-up appointment in two weeks</li>
                      <li>Consider classroom accommodations</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

export default TranscribeConsultationCard;
