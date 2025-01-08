import React from 'react';


const ErrorMessage = ({ message }) => (
    message && (
        <div className="bg-red-900/20 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg text-sm">
            {message}
        </div>
    )
);
export default ErrorMessage;