import React from 'react';

const InputField = ({ 
    type, 
    value, 
    onChange, 
    placeholder, 
    icon: Icon, 
    error,
    prefix 
  }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <div className="relative">
        {prefix && (
          <span className="absolute left-10 top-2.5 text-gray-400">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 
                   text-white placeholder:text-gray-400 focus:outline-none active:outline-none
                   transition-colors ${prefix ? 'pl-20 pr-10' : 'px-10'}`}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );

export default InputField;
