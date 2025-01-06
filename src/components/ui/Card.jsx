import React from 'react'

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`bg-black shadow rounded-lg ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`px-4 py-5 border-b border-[#58522a] sm:px-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`px-4 py-5 sm:p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 className={`text-lg leading-6 font-medium text-gray-900 ${className}`} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={`mt-1 max-w-2xl text-sm text-gray-500 ${className}`} {...props}>
      {children}
    </p>
  )
}

