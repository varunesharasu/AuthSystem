"use client"

import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
  const navigate = useNavigate()
  const { login, error } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <div className="relative w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-100 rounded-full opacity-70"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-200 rounded-full opacity-70"></div>

        <div className="relative text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-600">Log in to your account</p>
        </div>

        {error && (
          <div className="relative bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="relative mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
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
              </div>
              {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
            </div>

            <div>
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
              className="relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 transition-all duration-200 overflow-hidden group"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              {submitting ? "Logging in..." : "Log in"}
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
