"use client"

import { useState, useContext } from "react"
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const errors = {}

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

    // Validate full name
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required"
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 to-white py-10 relative">
      <div className="absolute inset-0 z-0">
        <ParticleBackground variant="register" />
      </div>

      <div className="relative w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden z-10">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-100 rounded-full opacity-70"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-200 rounded-full opacity-70"></div>

        <div className="relative text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
            Create an Account
          </h1>
          <p className="mt-2 text-gray-600">Join our community today</p>
        </div>

        {error && (
          <div className="relative bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="relative mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
                />
                {formErrors.fullName && <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
                />
                {formErrors.username && <p className="mt-1 text-sm text-red-600">{formErrors.username}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
                placeholder="you@example.com"
              />
              {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="1234567890"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
              />
              {formErrors.phoneNumber && <p className="mt-1 text-sm text-red-600">{formErrors.phoneNumber}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
                  placeholder="••••••••"
                />
                {formErrors.password && <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500 transition-all duration-200"
                  placeholder="••••••••"
                />
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 transition-all duration-200 overflow-hidden group"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              {submitting ? "Creating account..." : "Create account"}
            </button>
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
