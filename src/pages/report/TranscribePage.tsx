
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Mic, Square, Pause, Play } from "lucide-react";
import Stepper from "@/components/Stepper";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const steps = [
  { id: 1, name: "Upload", description: "Upload supporting documents" },
  { id: 2, name: "Review", description: "Review information" },
  { id: 3, name: "Transcribe", description: "Record consultation" },
  { id: 4, name: "Select", description: "Select report type" },
  { id: 5, name: "Review", description: "Final review" },
];

enum RecordingState {
  INACTIVE = 'inactive',
  RECORDING = 'recording',
  PAUSED = 'paused',
  COMPLETED = 'completed'
}

export default function TranscribePage() {
  const navigate = useNavigate();
  const [recordingState, setRecordingState] = useState<RecordingState>(RecordingState.INACTIVE);
  const [transcription, setTranscription] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startRecording = () => {
    setRecordingState(RecordingState.RECORDING);
    toast.success("Recording started");
    // Start the timer
    timerRef.current = window.setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const pauseRecording = () => {
    if (recordingState === RecordingState.RECORDING) {
      setRecordingState(RecordingState.PAUSED);
      // Clear the timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      toast.info("Recording paused");
    } else {
      setRecordingState(RecordingState.RECORDING);
      // Restart the timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
      toast.info("Recording resumed");
    }
  };

  const stopRecording = () => {
    setRecordingState(RecordingState.COMPLETED);
    // Clear the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    toast.success("Recording completed");
    
    // Simulate a transcription being generated
    setTimeout(() => {
      setTranscription(
        "Patient reports experiencing persistent headaches for the past 3 weeks, " +
        "primarily in the frontal region. The pain is described as throbbing and " +
        "is typically worse in the morning. Patient has tried over-the-counter pain " +
        "relievers with minimal relief. Patient also reports occasional dizziness " +
        "when standing up quickly. No visual disturbances or nausea reported. " +
        "Family history includes migraines in mother and sister. Current medications " +
        "include Lisinopril 10mg for mild hypertension and a daily multivitamin."
      );
      toast.success("Transcription generated");
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 bg-white py-3">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-6 mt-4">
            <Stepper steps={steps} currentStep={3} />
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-6 py-6">
        <Card className="mb-6 shadow-sm border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-blue-800">Consultation Recording</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center">
                {recordingState === RecordingState.INACTIVE ? (
                  <div className="mb-4 text-center">
                    <Mic className="h-16 w-16 mx-auto text-blue-800 mb-2" />
                    <p className="text-gray-600">Click below to start recording your consultation</p>
                  </div>
                ) : (
                  <div className="mb-4 text-center">
                    <div className="relative">
                      <Mic className={`h-16 w-16 mx-auto ${recordingState === RecordingState.RECORDING ? 'text-red-500' : 'text-blue-800'}`} />
                      {recordingState === RecordingState.RECORDING && (
                        <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          <span className="animate-ping absolute h-12 w-12 rounded-full bg-red-400 opacity-75"></span>
                        </span>
                      )}
                    </div>
                    <p className="text-xl font-medium mt-2">{formatTime(recordingTime)}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  {recordingState === RecordingState.INACTIVE && (
                    <Button 
                      onClick={startRecording} 
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Start Recording
                    </Button>
                  )}
                  
                  {(recordingState === RecordingState.RECORDING || recordingState === RecordingState.PAUSED) && (
                    <>
                      <Button 
                        onClick={pauseRecording} 
                        variant="outline"
                        className="border-gray-300"
                      >
                        {recordingState === RecordingState.RECORDING ? (
                          <><Pause className="h-4 w-4 mr-2" /> Pause</>
                        ) : (
                          <><Play className="h-4 w-4 mr-2" /> Resume</>
                        )}
                      </Button>
                      
                      <Button 
                        onClick={stopRecording}
                        variant="outline"
                        className="border-gray-300"
                      >
                        <Square className="h-4 w-4 mr-2" /> Stop
                      </Button>
                    </>
                  )}

                  {recordingState === RecordingState.COMPLETED && (
                    <Button 
                      onClick={togglePlayback} 
                      variant="outline"
                      className="border-gray-300"
                    >
                      {isPlaying ? (
                        <><Pause className="h-4 w-4 mr-2" /> Pause</>
                      ) : (
                        <><Play className="h-4 w-4 mr-2" /> Play Recording</>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {recordingState === RecordingState.COMPLETED && (
                <div className="w-full mt-8">
                  <h3 className="text-lg font-medium mb-2">Transcription</h3>
                  <Textarea 
                    value={transcription} 
                    onChange={(e) => setTranscription(e.target.value)}
                    className="min-h-[200px]"
                    placeholder="Transcription will appear here..."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    You can edit the transcription text as needed for accuracy.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/report/review")}
            className="flex items-center gap-2 border-gray-300 text-gray-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button 
            onClick={() => navigate("/report/select")}
            className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900"
            disabled={recordingState !== RecordingState.COMPLETED}
          >
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
