import React from 'react';
import { ChevronDown } from 'lucide-react';

export function Select({ children, className = '', ...props }) {
  return (
    <select
      className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

export function SelectContent({ children, className = '', ...props }) {
  return (
    <div 
      className={`absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg ${className}`}
      {...props}
    >
      <div className="py-1 max-h-60 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export function SelectItem({ children, className = '', ...props }) {
  return (
    <select
      className={`px-3 py-2  text-sm cursor-pointer hover:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      {...props}
    >
      {children}
      <ChevronDown className="w-4 h-4 ml-2" />
    </button>
  );
}

export function SelectValue({ children, placeholder = '', className = '', ...props }) {
  return (
    <span 
      className={`block truncate ${children ? 'text-gray-900' : 'text-gray-500'} ${className}`}
      {...props}
    >
      {children || placeholder}
    </span>
  );
}
