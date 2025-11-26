import React from 'react';
import { Tent } from 'lucide-react';

const Logo = ({ className = "" }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="bg-primary-600 p-1.5 rounded-lg shadow-sm">
                <Tent className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
                CaravanShare
            </span>
        </div>
    );
};

export default Logo;
