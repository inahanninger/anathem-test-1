import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MicIcon, FileTextIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { RecordedSession } from "@/types/patient";
interface TranscribeConsultationCardProps {
  isCompleted: boolean;
  recordedSessions: RecordedSession[];
}
const TranscribeConsultationCard: React.FC<TranscribeConsultationCardProps> = ({
  isCompleted,
  recordedSessions
}) => {
  return <Card className={`h-full transition-all border ${isCompleted ? 'bg-emerald-50 border-emerald-100' : 'border-gray-100'}`}>
      <CardContent className="p-5 h-full flex flex-col">
        <h3 className="text-lg font-medium mb-4">Transcribe Consultation</h3>
        
        <Link to="/transcribe" className="w-full block mb-4">
          <Button className="w-full py-2 bg-red-900 hover:bg-red-800">
            <MicIcon className="mr-2 h-5 w-5" />
            <span>Transcribe</span>
          </Button>
        </Link>
        
        {recordedSessions.length > 0 && <div className="space-y-3 flex-1">
            <h4 className="text-sm font-medium text-neutral-700">Recorded Sessions</h4>
            {recordedSessions.map(session => <div key={session.id} className="flex items-center justify-between p-3 bg-white rounded-md border shadow-sm hover:shadow transition-shadow">
                <div>
                  <h5 className="font-medium">{session.title}</h5>
                  <div className="text-xs text-neutral-500">{session.date} · {session.duration}</div>
                </div>
                <Button variant="ghost" size="sm">
                  <FileTextIcon size={16} className="mr-2" />
                  View
                </Button>
              </div>)}
          </div>}
      </CardContent>
    </Card>;
};
export default TranscribeConsultationCard;