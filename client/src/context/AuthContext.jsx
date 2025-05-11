"use client"

import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("authToken")
    if (token) {
      loadUser(token)
    } else {
      setIsLoading(false)
    }
  }, [])

  // Load user data with token
  const loadUser = async (token) => {
    try {
      setIsLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.get("http://10.108.51.97:5000/api/auth/profile", config)

      setUser(data.user)
      setError(null)
    } catch (error) {
      localStorage.removeItem("authToken")
      setError("Authentication failed. Please login again.")
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Register user
  const register = async (userData) => {
    try {
      setIsLoading(true)
      const { data } = await axios.post("http://10.108.51.97:5000/api/auth/register", userData)

      // Save token to localStorage
      localStorage.setItem("authToken", data.token)

      // Load user
      setUser(data.user)
      setError(null)

      return { success: true }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.")
      return { success: false, error: error.response?.data?.message }
    } finally {
      setIsLoading(false)
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      setIsLoading(true)
      const { data } = await axios.post("http://10.108.51.97:5000/api/auth/login", { email, password })

      // Save token to localStorage
      localStorage.setItem("authToken", data.token)

      // Set user
      setUser(data.user)
      setError(null)

      return { success: true }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.")
      return { success: false, error: error.response?.data?.message }
    } finally {
      setIsLoading(false)
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem("authToken")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
