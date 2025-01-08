import React from 'react'

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`shadow-sm focus:outline-none active:outline-none   block w-full sm:text-sm  rounded-md ${className}`}
      {...props}
    />
  )
}

