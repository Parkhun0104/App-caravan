import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Users } from 'lucide-react';

const CaravanCard = ({ caravan }) => {
    return (
        <Link to={`/caravan/${caravan.id}`} className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={caravan.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={caravan.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-900 shadow-sm">
                    ₩{(caravan.pricePerDay || 0).toLocaleString()}/night
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
                        {caravan.title}
                    </h3>
                    <div className="flex items-center text-sm font-medium text-gray-900">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {caravan.rating}
                    </div>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {caravan.location}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {caravan.capacity} Guests
                    </div>
                    <span className="text-primary-600 font-medium group-hover:underline">
                        View Details
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default CaravanCard;
