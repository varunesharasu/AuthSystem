"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import ParticleBackground from "./ParticleBackground"

const Register = () => {
  const navigate = useNavigate()
  const { register, error } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    fullName: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 2

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateIn(true)
    }, 100)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateStep = (step) => {
    const errors = {}

    if (step === 1) {
      // Validate username
      if (!formData.username.trim()) {
        errors.username = "Username is required"
      }

      // Validate email
      if (!formData.email) {
        errors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid"
      }

      // Validate full name
      if (!formData.fullName.trim()) {
        errors.fullName = "Full name is required"
      }
    } else if (step === 2) {
      // Validate password
      if (!formData.password) {
        errors.password = "Password is required"
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters"
      }

      // Validate password confirmation
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match"
      }

      // Validate phone number
      if (!formData.phoneNumber) {
        errors.phoneNumber = "Phone number is required"
      } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
        errors.phoneNumber = "Phone number must be 10 digits"
      }
    }

    return errors
  }

  const nextStep = () => {
    const errors = validateStep(currentStep)
    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const errors = validateStep(currentStep)
    setFormErrors(errors)

    // If we have errors, don't submit
    if (Object.keys(errors).length > 0) {
      return
    }

    setSubmitting(true)

    try {
      const { username, email, password, phoneNumber, fullName } = formData
      const result = await register({
        username,
        email,
        password,
        phoneNumber,
        fullName,
      })

      if (result.success) {
        navigate("/dashboard")
      }
    } catch (err) {
      console.error("Registration error:", err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 to-white py-10 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground variant="register" />
      </div>

      {/* Animated floating elements */}
      <div className="absolute w-80 h-80 -top-32 -right-20 bg-sky-100 rounded-full opacity-30 animate-pulse" style={{ animationDuration: '15s' }}></div>
      <div className="absolute w-96 h-96 -bottom-40 -left-20 bg-sky-200 rounded-full opacity-20 animate-pulse" style={{ animationDuration: '12s' }}></div>
      <div className="absolute w-40 h-40 top-1/3 right-1/4 bg-sky-300 rounded-full opacity-10 animate-ping" style={{ animationDuration: '20s' }}></div>

      <div 
        className={`relative w-full max-w-md p-8 space-y-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden z-10 transition-all duration-700 ease-out ${
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
            Create an Account
          </h1>
          <p className="mt-2 text-gray-600">Join our community today</p>
        </div>

        {/* Progress bar */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-sky-600 bg-sky-100">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-sky-600">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-sky-100">
            <div
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-500 ease-in-out"
            ></div>
          </div>
        </div>

        {error && (
          <div className="relative bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md animate-pulse" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="relative mt-6 space-y-5" onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="space-y-4 transition-opacity duration-500 ease-in-out">
              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                {formErrors.fullName && <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>}
              </div>

              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                {formErrors.username && <p className="mt-1 text-sm text-red-600">{formErrors.username}</p>}
              </div>

              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
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
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 transition-opacity duration-500 ease-in-out">
              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="1234567890"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                {formErrors.phoneNumber && <p className="mt-1 text-sm text-red-600">{formErrors.phoneNumber}</p>}
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
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
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

              <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                )}
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center px-4 py-2 border border-sky-300 rounded-xl shadow-sm text-sm font-medium text-sky-600 bg-white hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className={`${currentStep > 1 ? 'ml-auto' : 'w-full'} inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]`}
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className={`${currentStep > 1 ? 'ml-auto' : 'w-full'} inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 transition-all duration-300 overflow-hidden group transform hover:scale-[1.02] active:scale-[0.98]`}
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                {submitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  "Create account"
                )}
              </button>
            )}
          </div>
        </form>

        <div className="relative text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-sky-600 hover:text-sky-500 transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
