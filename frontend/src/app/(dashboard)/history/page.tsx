'use client'
import { useState } from 'react'
import { Search, Filter, FileText, Calendar, ChevronRight } from 'lucide-react'

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [prescriptions, setPrescriptions] = useState([
    { id: 'rx-001', date: '2026-09-01', doctor: 'Dr. Smith', primaryMedicine: 'Paracetamol 500mg', status: 'Completed' },
    { id: 'rx-002', date: '2026-08-15', doctor: 'Dr. Rao', primaryMedicine: 'Amoxicillin 250mg', status: 'Completed' },
    { id: 'rx-003', date: '2026-07-22', doctor: 'Dr. Sharma', primaryMedicine: 'Metformin 500mg', status: 'Reviewed' }
  ])

  const filteredPrescriptions = prescriptions.filter(rx => 
    rx.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.primaryMedicine.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Prescription History</h2>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by doctor or medicine..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium">
            <Filter className="w-4 h-4 mr-2 text-gray-500" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
        <div className="divide-y divide-gray-200">
          {filteredPrescriptions.map((rx) => (
            <div key={rx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">{rx.primaryMedicine}</h4>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <span className="font-medium text-gray-700 mr-2">{rx.doctor}</span> • 
                    <Calendar className="w-3.5 h-3.5 ml-2 mr-1 text-gray-400" /> {rx.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  {rx.status}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
          {filteredPrescriptions.length === 0 && (
            <div className="p-8 text-center text-gray-500">No prescriptions found matching your query.</div>
          )}
        </div>
      </div>
    </div>
  )
}