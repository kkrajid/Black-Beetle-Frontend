import React from 'react'

export function Button({ children, variant = 'default', size = 'default', className = '', ...props }) {
  const baseStyles = 'font-medium rounded focus:outline-none '
  const variantStyles = {
    default: 'bg-blue-600 text-white ',
    outline: 'border border-gray-300 text-gray-700  ',
    ghost: 'text-gray-700 ',
  }
  const sizeStyles = {
    default: 'px-4 py-2',
    sm: 'px-3 py-1 text-sm',
    lg: 'px-6 py-3 text-lg',
  }

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

