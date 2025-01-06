import React from 'react'

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`shadow-sm focus:outline-none active:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${className}`}
      {...props}
    />
  )
}

