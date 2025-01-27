"use client"

import { useState } from "react"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../config/firebaseconfig"
import { MailIcon, LockIcon } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)
    try {
      await sendPasswordResetEmail(auth, email)
      setMessage({ type: "success", text: "Password reset email sent! Check your inbox." })
    } catch (error) {
      console.error("Error sending password reset email:", error)
      setMessage({ type: "error", text: "Failed to send password reset email. Please try again." })
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Reset Password</h2>
          <p className="text-center text-gray-600 mb-8">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300 ${
                isLoading ? "opacity-75 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <LockIcon className="mr-2 animate-spin" size={18} />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <LockIcon className="mr-2" size={18} />
                  Reset Password
                </span>
              )}
            </button>
          </form>
          {message && (
            <div
              className={`mt-4 p-3 rounded-md ${
                message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

