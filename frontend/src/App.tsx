import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return  (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6">
        
        {/* Icon */}
        <div className="flex-shrink-0">
          <svg
            className="h-12 w-12 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 21h-3a1.5 1.5 0 01-1.5-1.5V15h6v4.5a1.5 1.5 0 01-1.5 1.5zM5.25 8.25l1.5 10.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5l1.5-10.5M3.75 8.25h16.5M10.5 8.25v-3a1.5 1.5 0 013 0v3"
            />
          </svg>
        </div>

        {/* Text Content */}
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome to Tailwind Magic</h1>
          <p className="mt-1 text-sm sm:text-base">
            Build stunning UIs with utility-first CSS — fast, responsive, and elegant.
          </p>
        </div>

        {/* Call to Action */}
        <div>
          <button className="bg-white text-purple-700 hover:bg-purple-100 font-semibold py-2 px-4 rounded shadow-md transition-all duration-200">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
