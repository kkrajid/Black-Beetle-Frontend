import React from 'react';
import { ArrowRight } from 'lucide-react';

const SubmitButton = ({ isLoading }) => (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-orange-600 text-white py-2.5 px-4 rounded-lg font-medium
               hover:bg-orange-700 transition-colors flex items-center justify-center
               disabled:opacity-50 disabled:cursor-not-allowed space-x-2"
    >
      <span>{isLoading ? 'Authenticating...' : 'Admin Sign In'}</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  );
  
export default SubmitButton;
