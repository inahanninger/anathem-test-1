import React from "react";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, FileText, Search, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
const HomePage = () => {
  const today = new Date();
  const formattedDate = format(today, "'Today,' EEE, dd MMM");
  return <ClinicalLayout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-blue-600 mb-6">{formattedDate}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Transcribe a Consultation Card */}
          <div className="border rounded-lg p-6 bg-neutral-50">
            <div className="flex items-start gap-3 mb-2">
              <Mic className="h-5 w-5 text-gray-500" />
              <h2 className="font-semibold text-base">Transcribe a Consultation</h2>
            </div>
            <p className="mb-6 ml-8 text-sm text-neutral-500">
              Generate paperwork through transcribing a patient consultation.
            </p>
            <Link to="/transcribe" className="block">
              <Button className="w-full bg-red-900 hover:bg-red-800">
                <Mic className="h-4 w-4 mr-2" /> Start Transcription
              </Button>
            </Link>
          </div>

          {/* Create Assessment Report Card */}
          <div className="border rounded-lg p-6 bg-neutral-50">
            <div className="flex items-start gap-3 mb-2">
              <FileText className="h-5 w-5 text-gray-500" />
              <h2 className="font-semibold text-base">Begin Patient Assessment Workflow</h2>
            </div>
            <p className="mb-6 ml-8 text-sm text-neutral-500">
              Generate reports with multiple file uploads and consultation recordings.
            </p>
            <Link to="/workflow/upload" className="block">
              <Button className="w-full text-white bg-blue-800 hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" /> Create Report
              </Button>
            </Link>
          </div>
        </div>

        {/* Consultations Section */}
        <div className="mt-10">
          <h2 className="font-semibold mb-4 text-base">Consultations</h2>
          
          <div className="border rounded-lg">
            {/* Tabs */}
            <div className="flex border-b">
              <button className="px-4 py-2 font-medium text-gray-900 border-b-2 border-blue-600">
                Consultations
              </button>
              <button className="px-4 py-2 font-medium text-gray-600">
                To Do
              </button>
            </div>
            
            {/* Search and Filters */}
            <div className="p-4 flex justify-between border-b">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 w-full border rounded-md" />
              </div>
              <div className="flex gap-2">
                <button className="p-2 border rounded-md">
                  <span className="h-2 w-2 rounded-full bg-blue-600 inline-block mr-2"></span>
                  <span className="text-sm">▼</span>
                </button>
                <button className="p-2 border rounded-md">
                  <Calendar className="h-4 w-4" />
                </button>
                <button className="p-2 border rounded-md">▼</button>
              </div>
            </div>
            
            {/* Empty State */}
            <div className="p-10 text-center text-gray-500">
              Your appointments will appear here.
            </div>
          </div>
        </div>
      </div>
    </ClinicalLayout>;
};
export default HomePage;