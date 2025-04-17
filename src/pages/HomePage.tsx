
import React from "react";
import { ClinicalLayout } from "@/components/ClinicalLayout";

const HomePage = () => {
  return (
    <ClinicalLayout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Recent Patients</h2>
            <p className="text-gray-500">No recent patients</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Upcoming Appointments</h2>
            <p className="text-gray-500">No upcoming appointments</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Tasks</h2>
            <p className="text-gray-500">No pending tasks</p>
          </div>
        </div>
      </div>
    </ClinicalLayout>
  );
};

export default HomePage;
