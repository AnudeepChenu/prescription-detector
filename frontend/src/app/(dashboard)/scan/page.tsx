'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, Upload, Loader2 } from 'lucide-react'

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:8000/api/scan', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      console.log('Processed:', data)
      // Redirect to verification page with response data
      router.push('/verify')
    } catch (err) {
      console.error('Upload failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Scan Prescription</h2>

      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 mb-6"
      >
        {preview ? (
          <img src={preview} alt="Prescription preview" className="max-h-64 mx-auto object-contain" />
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-gray-600">Click to upload or drag & drop prescription image/PDF</p>
          </div>
        )}
        <input 
          type="file" ref={fileInputRef} onChange={handleFileChange} 
          accept="image/*,application/pdf" className="hidden" 
        />
      </div>

      <button 
        onClick={handleUpload} 
        disabled={!file || loading}
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 flex items-center justify-center"
      >
        {loading && <Loader2 className="animate-spin mr-2 w-5 h-5" />}
        {loading ? 'Processing with AI...' : 'Analyze Prescription'}
      </button>
    </div>
  )
}