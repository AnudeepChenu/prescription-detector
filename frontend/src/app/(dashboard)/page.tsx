'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Upload, Activity, Clock, ArrowRight, ShieldCheck } from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalPrescriptions: 14,
    activeMedications: 3,
    recentScansCount: 5
  })

  const recentActivity = [
    { id: 1, title: 'Prescription Scanned: Paracetamol', time: '2 hours ago', status: 'Success' },
    { id: 2, title: 'Medication Schedule Updated', time: '1 day ago', status: 'Updated' },
    { id: 3, title: 'Prescription Verified: Amoxicillin', time: '3 days ago', status: 'Completed' }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-1">Here is the summary of your digitized prescriptions and active health logs.</p>
        </div>
        <Link 
          href="/scan" 
          className="flex items-center bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Upload className="w-4 h-4 mr-2" /> Quick Scan
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Prescriptions</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalPrescriptions}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Active Medications</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.activeMedications}</h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">System Accuracy</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">96.4%</h3>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
          <Link href="/history" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
            View All History <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {recentActivity.map((item) => (
            <div key={item.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 text-gray-600 rounded-full">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}