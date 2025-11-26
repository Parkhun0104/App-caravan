import React, { useState } from 'react';
import Button from './ui/Button';
import { Upload, ShieldCheck, X, FileText } from 'lucide-react';

const VerificationModal = ({ onClose, onVerify, isLoading }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            onVerify(file);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-5 h-5 text-primary-600" />
                        <h2 className="text-lg font-bold text-gray-900">Identity Verification</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="text-center mb-6">
                        <p className="text-gray-600 mb-2">
                            To build trust in our community, we ask all members to verify their identity.
                        </p>
                        <p className="text-sm text-gray-500">
                            Please upload a clear photo of your Government ID, Driver's License, or Passport.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                required
                            />
                            {file ? (
                                <div className="flex flex-col items-center text-primary-600">
                                    <FileText className="w-10 h-10 mb-2" />
                                    <span className="font-medium">{file.name}</span>
                                    <span className="text-xs text-gray-400 mt-1">Click to change</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <Upload className="w-10 h-10 mb-2" />
                                    <span className="font-medium">Click to upload document</span>
                                    <span className="text-xs mt-1">JPG, PNG up to 5MB</span>
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            isLoading={isLoading}
                            disabled={!file}
                        >
                            Submit for Verification
                        </Button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-400 flex items-center justify-center">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            Your data is encrypted and stored securely
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationModal;
