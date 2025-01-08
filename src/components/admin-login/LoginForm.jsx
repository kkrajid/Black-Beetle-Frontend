import React from 'react';
import InputField from './InputField';
import ErrorMessage from './ErrorMessage';
import ResetPasswordLink from './ResetPasswordLink';
import SubmitButton from './SubmitButton';
import { Phone, Lock } from 'lucide-react';

const LoginForm = ({ formData, errors, isLoading, handleSubmit, handleInputChange }) => (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {errors.auth && (
        <div className="bg-red-900/20 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg text-sm">
          {errors.auth}
        </div>
      )}
      
      <InputField
        type="tel"
        value={formData.phone}
        onChange={e => handleInputChange('phone', e.target.value)}
        placeholder="Phone number"
        icon={Phone}
        error={errors.phone}
        prefix="+91"
      />
      
      <InputField
        type="password"
        value={formData.password}
        onChange={e => handleInputChange('password', e.target.value)}
        placeholder="Password"
        icon={Lock}
        error={errors.password}
      />
      
      <SubmitButton isLoading={isLoading} />
      <ResetPasswordLink />
    </form>
  );
  


export default LoginForm;
