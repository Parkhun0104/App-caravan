import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { caravanService } from '../services/caravanService';
import { bookingService } from '../services/bookingService';
import { paymentService } from '../services/paymentService';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import PaymentModal from '../components/PaymentModal';
import { MapPin, Users, Star, Check, User, Calendar } from 'lucide-react';

const CaravanDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [caravan, setCaravan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingDates, setBookingDates] = useState({
        startDate: '',
        endDate: ''
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [pendingBooking, setPendingBooking] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCaravan();
    }, [id]);

    const loadCaravan = async () => {
        try {
            const data = await caravanService.getById(id);
            setCaravan(data);
        } catch (error) {
            console.error('Failed to load caravan', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setError('');

        // Validate dates
        if (!bookingDates.startDate || !bookingDates.endDate) {
            setError('Please select dates');
            return;
        }

        setShowPaymentModal(true);
    };

    const processPaymentAndBooking = async (cardData) => {
        setBookingLoading(true);
        setError('');
        try {
            // 1. Create Booking (Pending)
            const booking = await bookingService.create({
                caravanId: id,
                guestId: user.id,
                startDate: bookingDates.startDate,
                endDate: bookingDates.endDate,
                status: 'pending_payment' // Initial status
            });

            // 2. Process Payment
            await paymentService.processPayment({
                bookingId: booking.id,
                amount: totalPrice,
                ...cardData
            });

            // 3. Update Booking to Confirmed
            await bookingService.updateStatus(booking.id, 'confirmed');

            setShowPaymentModal(false);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Payment failed');
            // Optional: Rollback booking or leave as pending_payment
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!caravan) return <div className="p-8 text-center">Caravan not found</div>;

    const days = bookingDates.startDate && bookingDates.endDate
        ? Math.ceil((new Date(bookingDates.endDate) - new Date(bookingDates.startDate)) / (1000 * 60 * 60 * 24))
        : 0;

    const totalPrice = days > 0 ? days * caravan.pricePerDay : 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 rounded-xl overflow-hidden h-[400px]">
                <img
                    src={caravan.images[0]}
                    alt={caravan.title}
                    className="w-full h-full object-cover"
                />
                <div className="grid grid-cols-2 gap-4">
                    {caravan.images.slice(1).map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`${caravan.title} ${idx + 2}`}
                            className="w-full h-full object-cover"
                        />
                    ))}
                    {/* Fallback if only 1 image, duplicate for layout or show placeholder */}
                    {caravan.images.length === 1 && (
                        <>
                            <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400">More photos coming soon</div>
                            <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400">More photos coming soon</div>
                            <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400">More photos coming soon</div>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{caravan.title}</h1>
                            <div className="flex items-center space-x-1 text-sm font-medium">
                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                <span>{caravan.rating}</span>
                                <span className="text-gray-500">({caravan.reviewCount} reviews)</span>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-500 mb-4">
                            <MapPin className="w-5 h-5 mr-2" />
                            {caravan.location}
                        </div>
                        <div className="flex items-center text-gray-500 space-x-4 py-4 border-t border-b border-gray-100">
                            <div className="flex items-center">
                                <Users className="w-5 h-5 mr-2" />
                                {caravan.capacity} Guests
                            </div>
                            <div className="flex items-center">
                                <User className="w-5 h-5 mr-2" />
                                Hosted by {caravan.hostId === 'user_1' ? 'John Host' : 'Host'}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">About this caravan</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {caravan.description}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {caravan.amenities?.map((amenity, index) => (
                                <div key={index} className="flex items-center text-gray-600">
                                    <Check className="w-5 h-5 text-primary-600 mr-2" />
                                    {amenity}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Booking Widget */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <span className="text-2xl font-bold text-gray-900">${caravan.pricePerDay}</span>
                                <span className="text-gray-500"> / night</span>
                            </div>
                        </div>

                        <form onSubmit={handleBooking} className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">CHECK-IN</label>
                                    <input
                                        type="date"
                                        required
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                        value={bookingDates.startDate}
                                        onChange={(e) => setBookingDates({ ...bookingDates, startDate: e.target.value })}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">CHECKOUT</label>
                                    <input
                                        type="date"
                                        required
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                        value={bookingDates.endDate}
                                        onChange={(e) => setBookingDates({ ...bookingDates, endDate: e.target.value })}
                                        min={bookingDates.startDate || new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>

                            {days > 0 && (
                                <div className="py-4 space-y-2 border-t border-gray-100">
                                    <div className="flex justify-between text-gray-600">
                                        <span>${caravan.pricePerDay} x {days} nights</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Service fee</span>
                                        <span>$0</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                                        <span>Total</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full" size="lg" isLoading={bookingLoading} disabled={days <= 0}>
                                {user ? 'Reserve' : 'Log in to Reserve'}
                            </Button>

                            <p className="text-xs text-center text-gray-500 mt-2">
                                You won't be charged yet
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {showPaymentModal && (
                <PaymentModal
                    amount={totalPrice}
                    onClose={() => setShowPaymentModal(false)}
                    onConfirm={processPaymentAndBooking}
                    isLoading={bookingLoading}
                />
            )}
        </div>
    );
};

export default CaravanDetail;
