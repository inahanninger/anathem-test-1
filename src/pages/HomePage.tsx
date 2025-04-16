import { useState } from "react";
import { Link } from "react-router-dom";
import { Mic, FileText, Search, Calendar, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const consultations = [
  {
    id: 1,
    patientName: "John Doe",
    appointmentType: "ADHD/Autism Combined",
    files: 5,
    status: "Review drafts",
    statusType: "review",
    date: "18/11/23, 9:34 am"
  },
  {
    id: 2,
    patientName: "John Doe",
    appointmentType: "ADHD/Autism Combined",
    files: 1,
    status: "Generate Drafts",
    statusType: "generate",
    date: "18/11/23, 9:34 am"
  },
  {
    id: 3,
    patientName: "Cody Fisher",
    appointmentType: "ADHD/Autism Combined",
    files: 0,
    status: "Generate Drafts",
    statusType: "generate",
    date: "18/11/23, 9:34 am"
  },
  {
    id: 4,
    patientName: "Floyd Miles",
    appointmentType: "ADHD/Autism Combined",
    files: 3,
    status: "Scheduled",
    statusType: "scheduled",
    date: "18/11/23, 9:34 am"
  },
  {
    id: 5,
    patientName: "Robert Brown",
    appointmentType: "ADHD/Autism Combined",
    files: 2,
    status: "Generate Drafts",
    statusType: "generate",
    date: "17/11/23, 10:45 am"
  }
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Consultations");

  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedDate = `Today, ${dayNames[today.getDay()]}, ${today.getDate()} ${monthNames[today.getMonth()]}`;

  return <div className="min-h-screen bg-white">
      <div className="container max-w-6xl px-4 pt-8 pb-12 mx-auto">
        <h1 className="font-bold mb-6 text-neutral-900 text-xl">{formattedDate}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-50/80">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Mic className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold">Transcribe a Consultation</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">Generate paperwork through transcribing a patient consultation.</p>
              
              <Button asChild className="w-full bg-red-800 hover:bg-red-900">
                <Link to="/transcribe" className="flex items-center justify-center gap-2">
                  <Mic className="h-4 w-4" />
                  Start Transcription
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50/80">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold">Create Assessment Report</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">Generate reports with multiple file uploads and consultation recordings.</p>
              
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/workflow/upload" className="flex items-center justify-center gap-2">
                  Create Report
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-md shadow-sm mb-6">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <div className="flex space-x-2">
              <Button variant={activeTab === "Consultations" ? "default" : "ghost"} onClick={() => setActiveTab("Consultations")} className={activeTab === "Consultations" ? "bg-blue-600" : ""} size="sm">
                Consultations
              </Button>
              <Button variant={activeTab === "To Do" ? "default" : "ghost"} onClick={() => setActiveTab("To Do")} className={activeTab === "To Do" ? "bg-blue-600" : ""} size="sm">
                To Do
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search" className="pl-8 w-[220px] h-9" />
              </div>
              
              <Select defaultValue="status">
                <SelectTrigger className="w-[120px] h-9">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-600 mr-2" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="review">Review Drafts</SelectItem>
                  <SelectItem value="generate">Generate Drafts</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="date">
                <SelectTrigger className="w-[120px] h-9">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Date" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="appointment">
                <SelectTrigger className="w-[160px] h-9">
                  <SelectValue placeholder="Appointment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="adhd">ADHD/Autism</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Appointment Type</TableHead>
                <TableHead>Files</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consultations.map(consultation => <TableRow key={consultation.id}>
                  <TableCell className="font-medium">{consultation.patientName}</TableCell>
                  <TableCell>{consultation.appointmentType}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>{consultation.files}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`
                        ${consultation.statusType === 'review' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                        ${consultation.statusType === 'generate' ? 'bg-purple-50 text-purple-700 border-purple-200' : ''}
                        ${consultation.statusType === 'scheduled' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                      `}>
                      {consultation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{consultation.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          © 2025 Anathem • All rights reserved
        </div>
      </div>
    </div>;
};

export default HomePage;
