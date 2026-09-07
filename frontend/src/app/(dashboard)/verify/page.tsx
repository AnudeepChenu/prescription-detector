'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Edit3, Save } from 'lucide-react'

export default function VerifyPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [prescription, setPrescription] = useState({
    medicine: 'Paracetamol 500mg',
    dosage: '1 tablet',
    frequency: 'Twice daily',
    duration: '5 days'
  })

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleConfirm = () => {
    alert('Prescription confirmed and added to medications!')
    router.push('/dashboard')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Verify Prescription Details</h2>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          {isEditing ? <Save className="w-4 h-4 mr-1" /> : <Edit3 className="w-4 h-4 mr-1" />}
          {isEditing ? 'Save Changes' : 'Edit Fields'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center justify-center h-80">
          <p className="text-gray-400">[Original Prescription Image Preview]</p>
        </div>

        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
              <input 
                type="text" value={prescription.medicine} disabled={!isEditing}
                onChange={(e) => setPrescription({...prescription, medicine: e.target.value})}
                className="w-full mt-1 p-2 border rounded bg-white disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Dosage</label>
              <input 
                type="text" value={prescription.dosage} disabled={!isEditing}
                onChange={(e) => setPrescription({...prescription, dosage: e.target.value})}
                className="w-full mt-1 p-2 border rounded bg-white disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Frequency</label>
              <input 
                type="text" value={prescription.frequency} disabled={!isEditing}
                onChange={(e) => setPrescription({...prescription, frequency: e.target.value})}
                className="w-full mt-1 p-2 border rounded bg-white disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input 
                type="text" value={prescription.duration} disabled={!isEditing}
                onChange={(e) => setPrescription({...prescription, duration: e.target.value})}
                className="w-full mt-1 p-2 border rounded bg-white disabled:bg-gray-100"
              />
            </div>
          </div>

          <button 
            onClick={handleConfirm}
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center mt-6"
          >
            <CheckCircle className="w-5 h-5 mr-2" /> Confirm & Save Prescription
          </button>
        </div>
      </div>
    </div>
  )
}