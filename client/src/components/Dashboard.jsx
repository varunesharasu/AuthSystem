"use client"

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="relative overflow-hidden bg-white shadow-lg rounded-2xl p-8">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-200 rounded-full opacity-50"></div>

              <div className="relative">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 flex items-center justify-center text-white text-2xl font-bold">
                    {user?.fullName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.fullName}!</h2>
                    <p className="text-gray-500">We're glad to see you back</p>
                  </div>
                </div>

                <div className="bg-white shadow-md overflow-hidden rounded-xl border border-gray-100">
                  <div className="px-6 py-5 bg-gradient-to-r from-sky-50 to-white">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
                    <p className="mt-1 text-sm text-gray-500">Your personal details and account information.</p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-white px-6 py-4 grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{user?.fullName}</dd>
                      </div>
                      <div className="bg-gray-50 px-6 py-4 grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">Username</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{user?.username}</dd>
                      </div>
                      <div className="bg-white px-6 py-4 grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{user?.email}</dd>
                      </div>
                      <div className="bg-gray-50 px-6 py-4 grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{user?.phoneNumber}</dd>
                      </div>
                      <div className="bg-white px-6 py-4 grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">Account created</dt>
                        <dd className="text-sm text-gray-900 col-span-2">
                          {new Date(user?.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-sky-100 rounded-md p-3">
                          <svg
                            className="h-6 w-6 text-sky-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Profile Settings</dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">Update Info</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm">
                        <a href="#" className="font-medium text-sky-600 hover:text-sky-500">
                          Edit profile
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-sky-100 rounded-md p-3">
                          <svg
                            className="h-6 w-6 text-sky-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Security</dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">Password & Auth</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm">
                        <a href="#" className="font-medium text-sky-600 hover:text-sky-500">
                          Change password
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-sky-100 rounded-md p-3">
                          <svg
                            className="h-6 w-6 text-sky-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Notifications</dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">Preferences</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm">
                        <a href="#" className="font-medium text-sky-600 hover:text-sky-500">
                          Manage settings
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
