import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const ResetPasswordLink = () => (
    <div className="text-center text-sm text-gray-400">
      Forgot your password?{' '}
      <Link 
        to="/admin-reset-password" 
        className="text-orange-500 hover:text-orange-400 transition-colors"
      >
        Reset Password
      </Link>
    </div>
  );

export default ResetPasswordLink;
