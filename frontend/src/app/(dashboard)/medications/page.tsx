'use client'
import { useState } from 'react'
import { Pill, Clock, Calendar, CheckCircle2 } from 'lucide-react'

export default function MedicationsPage() {
  const [medications, setMedications] = useState([
    { id: 1, name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '5 days', status: 'Active' },
    { id: 2, name: 'Amoxicillin 250mg', dosage: '1 capsule', frequency: 'Three times daily', duration: '7 days', status: 'Active' }
  ])

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Current Medications & Schedule</h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {medications.length} Active Prescriptions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {medications.map((med) => (
          <div key={med.id} className="bg-white p-6 rounded-lg shadow border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Pill className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{med.name}</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  {med.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-400" /> Dosage: {med.dosage}</p>
                <p className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-gray-400" /> Frequency: {med.frequency}</p>
                <p className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-gray-400" /> Duration: {med.duration}</p>
              </div>
            </div>

            <button className="w-full bg-gray-50 text-blue-600 border border-blue-200 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              View Schedule Details
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}