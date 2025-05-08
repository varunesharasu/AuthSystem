"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import ParticleBackground from "./ParticleBackground"

const Login = () => {
  const navigate = useNavigate()
  const { login, error } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateIn(true)
    }, 100)
  }, [])

  const validateForm = () => {
    const errors = {}

    // Validate email
    if (!email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid"
    }

    // Validate password
    if (!password) {
      errors.password = "Password is required"
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const errors = validateForm()
    setFormErrors(errors)

    // If we have errors, don't submit
    if (Object.keys(errors).length > 0) {
      return
    }

    setSubmitting(true)

    try {
      const result = await login(email, password)

      if (result.success) {
        navigate("/dashboard")
      }
    } catch (err) {
      console.error("Login error:", err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground variant="login" />
      </div>

      {/* Animated floating elements */}
      <div className="absolute w-64 h-64 -top-20 -right-20 bg-sky-100 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute w-96 h-96 -bottom-32 -left-20 bg-sky-200 rounded-full opacity-20 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute w-32 h-32 top-1/4 left-1/4 bg-sky-300 rounded-full opacity-10 animate-ping" style={{ animationDuration: '10s' }}></div>

      <div 
        className={`relative w-full max-w-md p-8 space-y-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden z-10 transition-all duration-700 ease-out ${
          animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full opacity-70"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-sky-200 to-sky-100 rounded-full opacity-70"></div>

        <div className="relative text-center">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-600">Log in to your account</p>
        </div>

        {error && (
          <div className="relative bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md animate-pulse" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="relative mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
                  placeholder="you@example.com"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
              {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
            </div>

            <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              {formErrors.password && <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-sky-600 hover:text-sky-500 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 transition-all duration-300 overflow-hidden group transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="absolute left-0 w-8 h-32 -mt-12 transition-all duration-1000 transform -translate-x-12 bg-white opacity-10 rotate-12 group-hover:translate-x-40 ease"></span>
              {submitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </div>
              ) : (
                "Log in"
              )}
            </button>
          </div>
        </form>

        <div className="relative text-center mt-4">
          <p className="inline-flex text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="ml-1 font-medium text-sky-600 hover:text-sky-500 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
