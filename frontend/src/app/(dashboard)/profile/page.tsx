'use client'
import { useState } from 'react'
import { User, Shield, Bell, Lock, LogOut, Save } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    allergies: 'Penicillin, Peanuts',
    bloodGroup: 'O+'
  })
  const [notifications, setNotifications] = useState(true)

  const handleSave = () => {
    alert('Profile preferences updated successfully!')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Profile & Settings</h2>
        <button 
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800 font-medium text-sm border border-red-200 px-3 py-1.5 rounded-lg"
        >
          <LogOut className="w-4 h-4 mr-1.5" /> Logout
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-600" /> Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" value={profile.fullName} 
              onChange={(e) => setProfile({...profile, fullName: e.target.value})}
              className="w-full mt-1 p-2 border rounded-lg text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" value={profile.email} disabled 
              className="w-full mt-1 p-2 border rounded-lg text-sm bg-gray-100 text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Medical Preferences */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-green-600" /> Medical Preferences & History
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Known Allergies</label>
            <input 
              type="text" value={profile.allergies} 
              onChange={(e) => setProfile({...profile, allergies: e.target.value})}
              className="w-full mt-1 p-2 border rounded-lg text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Group</label>
            <input 
              type="text" value={profile.bloodGroup} 
              onChange={(e) => setProfile({...profile, bloodGroup: e.target.value})}
              className="w-full mt-1 p-2 border rounded-lg text-sm bg-white"
            />
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-medium text-gray-900">Medication Reminders</h4>
            <p className="text-sm text-gray-500">Receive push or email notifications for scheduled doses.</p>
          </div>
        </div>
        <input 
          type="checkbox" checked={notifications} 
          onChange={() => setNotifications(!notifications)}
          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
      </div>

      <button 
        onClick={handleSave}
        className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 flex items-center justify-center shadow-sm"
      >
        <Save className="w-5 h-5 mr-2" /> Save All Changes
      </button>
    </div>
  )
}