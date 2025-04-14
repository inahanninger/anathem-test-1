
import { useState } from "react";
import { MicIcon, ExpandIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const TranscribePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const navigate = useNavigate();
  
  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulating recording start
      setTimeout(() => {
        setIsRecording(false);
        setTranscription("Patient reports experiencing moderate anxiety related to neighborhood dispute. Neighbor has made verbal threats following a property boundary disagreement.");
      }, 3000);
    }
  };
  
  const handleGenerateReport = () => {
    navigate("/risk-assessment");
  };
  
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
              <h2 className="text-base font-medium">Transcribe Interaction</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MicIcon className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExpandIcon className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="text-sm font-medium block mb-2">Transcription</label>
            <Textarea 
              placeholder="Press record to start transcription"
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              className="min-h-[200px] resize-none overflow-visible"
            />
          </div>
          
          <div className="flex justify-center mb-4">
            <Button 
              variant={isRecording ? "destructive" : "default"}
              size="icon"
              className={`rounded-full h-14 w-14 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'}`}
              onClick={handleRecordToggle}
            >
              <MicIcon className="h-6 w-6 text-white" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        onClick={handleGenerateReport}
        className="mt-6 bg-blue-800 hover:bg-blue-900"
        disabled={!transcription.trim()}
      >
        Generate Report
      </Button>
    </div>
  );
};

export default TranscribePage;
