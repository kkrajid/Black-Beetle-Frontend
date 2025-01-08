import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/admin-login/Header'
import LoginForm from '../components/admin-login/LoginForm';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      phone: '',
      password: ''
    });
    const [errors, setErrors] = useState({});

    console.log(formData,"dfdfdf")
  
    const validateForm = () => {
      const newErrors = {};
      
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
      
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleInputChange = (field, value) => {
      if (field === 'phone') {
        // Only allow numbers and limit to 10 digits
        const cleaned = value.replace(/\D/g, '').slice(0, 10);
        setFormData(prev => ({
          ...prev,
          [field]: cleaned
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [field]: value
        }));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!validateForm()) return;
      
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/admin/dashboard');
      } catch (error) {
        setErrors({ auth: 'Invalid credentials' });
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-full max-w-md px-4 py-8">
          <div className="flex flex-col items-center justify-center">
            <Header />
            <div className="bg-black w-full p-4">
              <LoginForm
                formData={formData}
                errors={errors}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  
  export default AdminLogin;