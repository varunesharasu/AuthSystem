"use client"

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 to-white">
        <div className="text-center p-8 max-w-sm mx-auto">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-sky-200 rounded-full animate-spin"></div>
            <div
              className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-sky-600 rounded-full animate-spin"
              style={{ animationDuration: "1s" }}
            ></div>
          </div>
          <p className="text-lg font-medium text-gray-700">Loading your account...</p>
          <p className="mt-2 text-sm text-gray-500">Please wait while we prepare your dashboard</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
