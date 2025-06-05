import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    accountNumber: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add login logic here
  }

  return (
    <div className="flex min-h-screen items-center font-plus justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign in</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Account Number</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                maxLength={10}
                className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                placeholder="Enter your account number"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline block mt-2">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-text to-[#00388C] text-white py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New to the platform?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login