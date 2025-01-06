import React, { useState, memo } from 'react';
import { Shield, X } from 'lucide-react';

const FormField = memo(({ label, name, type = "text", required = false, textarea = false, value, onChange }) => (
    <div className="space-y-2">
        <label htmlFor={name} className="block text-sm font-medium text-orange-500">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {textarea ? (
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full min-h-[80px] bg-black resize-none rounded-md border border-orange-500/30 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-orange-500"
            />
        ) : (
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full h-9 bg-black rounded-md border border-orange-500/30 shadow-sm px-3 focus:outline-none active:outline-none text-orange-500"
            />
        )}
    </div>
));

const FormSection = memo(({ title, children }) => (
    <div className="bg-black rounded-lg shadow-sm border border-orange-500/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-orange-500/20">
            <h3 className="text-lg font-semibold text-orange-500">{title}</h3>
        </div>
        <div className="p-6 space-y-4">
            {children}
        </div>
    </div>
));

const AddAdminDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        phone_number: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        bio: '',
        institution_name: '',
        institution_description: '',
        institution_website: '',
        institution_address: '',
        institution_contact_email: '',
        institution_contact_phone: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/users/register/b2b-admin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1NjI4Njc3LCJpYXQiOjE3MzU2MjUwNzcsImp0aSI6IjU2ZWRjYWQ2ODBlYjQ4MmM5OTBlNjhiZDliNzNhZDY1IiwidXNlcl9pZCI6MX0.FJN7p2gLpdmbEPMHsaLoosHWzQ9x-y8XFkBgNnkSyIQ'}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(Object.entries(data).map(([key, value]) =>
                    `${key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.slice(1)}: ${Array.isArray(value) ? value.join(', ') : value}`
                ).join('\n'));
            }
            setFormData({
                phone_number: '',
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                date_of_birth: '',
                bio: '',
                institution_name: '',
                institution_description: '',
                institution_website: '',
                institution_address: '',
                institution_contact_email: '',
                institution_contact_phone: ''
            });
            setIsOpen(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
                <Shield className="mr-2 h-4 w-4" />
                Add B2B Admin
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                            onClick={() => !loading && setIsOpen(false)}
                        />

                        <div className="inline-block align-bottom bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                            <div className="absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="text-orange-500/60 hover:text-orange-500/80 focus:outline-none"
                                    onClick={() => !loading && setIsOpen(false)}
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <Shield className="h-6 w-6 text-orange-500" />
                                    <h2 className="text-xl font-semibold text-orange-500">Add New B2B Admin</h2>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 bg-neutral-950 rounded-md">
                                        <p className="text-sm text-red-600 whitespace-pre-line">{error}</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormSection title="Personal Information">
                                            <FormField
                                                label="Phone Number"
                                                name="phone_number"
                                                type="tel"
                                                required
                                                value={formData.phone_number}
                                                onChange={handleChange}
                                            />
                                            <FormField
                                                label="Email"
                                                name="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            <FormField
                                                label="Password"
                                                name="password"
                                                type="password"
                                                required
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    label="First Name"
                                                    name="first_name"
                                                    value={formData.first_name}
                                                    onChange={handleChange}
                                                />
                                                <FormField
                                                    label="Last Name"
                                                    name="last_name"
                                                    value={formData.last_name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <FormField
                                                label="Date of Birth"
                                                name="date_of_birth"
                                                type="date"
                                                value={formData.date_of_birth}
                                                onChange={handleChange}
                                            />
                                            <FormField
                                                label="Bio"
                                                name="bio"
                                                textarea
                                                value={formData.bio}
                                                onChange={handleChange}
                                            />
                                        </FormSection>

                                        <FormSection title="Institution Information">
                                            <FormField
                                                label="Institution Name"
                                                name="institution_name"
                                                required
                                                value={formData.institution_name}
                                                onChange={handleChange}
                                            />
                                            <FormField
                                                label="Description"
                                                name="institution_description"
                                                textarea
                                                value={formData.institution_description}
                                                onChange={handleChange}
                                            />
                                            <FormField
                                                label="Website"
                                                name="institution_website"
                                                type="url"
                                                value={formData.institution_website}
                                                onChange={handleChange}
                                            />
                                            <FormField
                                                label="Address"
                                                name="institution_address"
                                                textarea
                                                value={formData.institution_address}
                                                onChange={handleChange}
                                            />
                                            <FormField
                                                label="Contact Email"
                                                name="institution_contact_email"
                                                type="email"
                                                required
                                                value={formData.institution_contact_email}
                                                onChange={handleChange}
                                            />
                                            <FormField
                                                label="Contact Phone"
                                                name="institution_contact_phone"
                                                type="tel"
                                                required
                                                value={formData.institution_contact_phone}
                                                onChange={handleChange}
                                            />
                                        </FormSection>
                                    </div>

                                    <div className="flex justify-end gap-3 py-4 px-6 bg-orange-500/10 border-t border-orange-500/20 mt-6 -mx-6">
                                        <button
                                            type="button"
                                            onClick={() => !loading && setIsOpen(false)}
                                            disabled={loading}
                                            className="px-4 py-2 text-sm font-medium text-orange-500 bg-black border border-orange-500/30 rounded-lg hover:bg-orange-500/10 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                                        >
                                            {loading ? 'Creating...' : 'Create Admin'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddAdminDialog;