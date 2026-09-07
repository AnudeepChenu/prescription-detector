'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input 
          type="email" placeholder="Email" value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-2 mb-4 border rounded" required 
        />
        <input 
          type="password" placeholder="Password" value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-2 mb-6 border rounded" required 
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  )
}