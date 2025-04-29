
import React, { useState } from "react";
import { ClinicalLayout } from "@/components/ClinicalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Calendar, Filter, ChevronDown, FileText, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

// Mock data for consultations
const mockConsultations = [
  { id: 1, patientName: "James Wilson", date: new Date(2025, 3, 25), type: "ADHD Assessment", status: "Completed" },
  { id: 2, patientName: "Sarah Smith", date: new Date(2025, 3, 23), type: "Autism Assessment", status: "Pending" },
  { id: 3, patientName: "Michael Johnson", date: new Date(2025, 3, 20), type: "ADHD/Autism Combined", status: "In Progress" },
  { id: 4, patientName: "Emma Brown", date: new Date(2025, 3, 18), type: "ADHD Assessment", status: "Completed" },
  { id: 5, patientName: "Thomas Davis", date: new Date(2025, 3, 15), type: "Autism Assessment", status: "Completed" },
];

const ConsultationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter consultations based on search query
  const filteredConsultations = searchQuery
    ? mockConsultations.filter(consultation => 
        consultation.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.status.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockConsultations;

  return (
    <ClinicalLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">All Consultations</h1>
          <Button className="bg-blue-800 hover:bg-blue-900">
            <FileText className="mr-2 h-4 w-4" /> New Consultation
          </Button>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search consultations" 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Date</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {/* Consultations Table */}
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <div className="flex items-center">
                    Patient Name
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConsultations.length > 0 ? (
                filteredConsultations.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell className="font-medium">{consultation.patientName}</TableCell>
                    <TableCell>{format(consultation.date, 'dd MMM yyyy')}</TableCell>
                    <TableCell>{consultation.type}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        consultation.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        consultation.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {consultation.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No consultations found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </ClinicalLayout>
  );
};

export default ConsultationsPage;
