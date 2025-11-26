import React, { useState, useEffect } from 'react';
import { caravanService } from '../services/caravanService';
import CaravanCard from '../components/CaravanCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Search, MapPin, Calendar } from 'lucide-react';

const Home = () => {
    const [caravans, setCaravans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
        capacity: ''
    });

    useEffect(() => {
        loadCaravans();
    }, []);

    const loadCaravans = async () => {
        setLoading(true);
        try {
            const data = await caravanService.getAll();
            setCaravans(data);
        } catch (error) {
            console.error('Failed to load caravans', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await caravanService.search(filters);
            setCaravans(data);
        } catch (error) {
            console.error('Failed to search caravans', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-primary-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20" />
                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        Find Your Perfect Mobile Getaway
                    </h1>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Discover unique caravans, camper vans, and RVs for your next adventure.
                    </p>

                    {/* Search Bar */}
                    <div className="bg-white p-4 rounded-lg shadow-xl max-w-4xl mx-auto">
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Where to?"
                                    className="pl-10 w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 py-2.5 text-gray-900"
                                    value={filters.location}
                                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="Max Price"
                                    className="w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 py-2.5 text-gray-900"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="Guests"
                                    className="w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 py-2.5 text-gray-900"
                                    value={filters.capacity}
                                    onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
                                />
                            </div>
                            <Button type="submit" size="lg" className="w-full">
                                <Search className="w-5 h-5 mr-2" />
                                Search
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Listings Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {filters.location ? `Stays in ${filters.location}` : 'Explore Caravans'}
                    </h2>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="bg-white rounded-xl shadow-sm h-80 animate-pulse" />
                        ))}
                    </div>
                ) : caravans.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caravans.map((caravan) => (
                            <CaravanCard key={caravan.id} caravan={caravan} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No caravans found matching your criteria.</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                setFilters({ location: '', minPrice: '', maxPrice: '', capacity: '' });
                                loadCaravans();
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
