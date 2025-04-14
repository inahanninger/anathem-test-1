
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MicIcon, UploadIcon } from "lucide-react";
import ProgressSteps from "@/components/ClinicalFlow/ProgressSteps";
import { toast } from "sonner";

const TranscribePage = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate transcription completion
      setTimeout(() => {
        setTranscription("Patient reports experiencing moderate headaches for the past two weeks, occurring primarily in the morning. Reports that over-the-counter pain medication provides minimal relief. No nausea or visual disturbances associated with headaches. Patient also mentions increased stress at work which may be contributing to symptoms.");
        toast.success("Recording transcribed successfully");
      }, 1000);
    } else {
      setIsRecording(true);
      toast.info("Recording started");
    }
  };

  const handleUploadAudio = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast.info(`Processing "${file.name}"...`);
        // Simulate processing
        setTimeout(() => {
          setTranscription("Audio transcription from uploaded file: Patient describes chronic lower back pain that has persisted for approximately 6 months. Pain is rated as 7/10 on average, worse with prolonged sitting. Patient has tried physical therapy with some improvement but pain returns when exercises are discontinued.");
          toast.success("Audio transcribed successfully");
        }, 1500);
      }
    };
    input.click();
  };

  const handleContinue = () => {
    navigate("/clinical-flow/select-report");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold text-blue-700 mb-2">Clinical Report Generation</h1>
        <p className="text-gray-600 mb-8">Complete all steps to generate a comprehensive clinical report</p>
        
        <ProgressSteps currentStep={2} />

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Transcribe Assessment Consultation</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                  <MicIcon className="h-5 w-5 mr-2 text-blue-600" />
                  <h3 className="font-medium text-gray-800">Transcription</h3>
                </div>
              </div>
              
              <div className="p-6 flex flex-col">
                <Button
                  onClick={toggleRecording}
                  className={`flex items-center justify-center 
                    ${isRecording 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-red-600 hover:bg-red-700'
                    } mb-6 mx-auto w-48`}
                >
                  <MicIcon className="mr-2 h-5 w-5" />
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
                
                {transcription ? (
                  <div className="bg-white border border-gray-200 p-4 rounded-md text-gray-700 text-sm flex-grow">
                    {transcription}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-md text-gray-500 text-sm flex-grow">
                    Click the button above to start recording your consultation. Transcription will appear here once active.
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  className="mt-4 w-full border-gray-300 text-blue-700"
                  onClick={handleUploadAudio}
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Audio File
                </Button>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                  <FileIcon className="h-5 w-5 mr-2 text-blue-600" />
                  <h3 className="font-medium text-gray-800">Clinical Notes</h3>
                </div>
              </div>
              
              <div className="p-6 flex flex-col h-full">
                <Textarea
                  placeholder="Enter clinical notes here..."
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  className="flex-grow min-h-[300px] resize-none text-sm"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Changes are automatically saved
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            className="px-8"
            onClick={() => navigate("/clinical-flow/review")}
          >
            Skip
          </Button>
          <Button
            className="bg-blue-700 hover:bg-blue-800 px-8"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TranscribePage;

const FileIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
