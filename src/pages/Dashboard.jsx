import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/bookingService';
import { caravanService } from '../services/caravanService';
import { identityService } from '../services/identityService';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import VerificationModal from '../components/VerificationModal';
import { Plus, Package, Calendar, CheckCircle, XCircle, Clock, ShieldCheck, Shield } from 'lucide-react';
import { KOREAN_REGIONS } from '../constants/locations';

const Dashboard = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [myCaravans, setMyCaravans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('bookings');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [verificationLoading, setVerificationLoading] = useState(false);

    useEffect(() => {
        if (user) {
            loadData();
        }
    }, [user]);

    const loadData = async () => {
        setLoading(true);
        try {
            const userBookings = await bookingService.getUserBookings(user.id, user.role);
            setBookings(userBookings);

            if (user.role === 'host') {
                const allCaravans = await caravanService.getAll();
                setMyCaravans(allCaravans.filter(c => c.hostId === user.id));
            }
        } catch (error) {
            console.error('Failed to load dashboard data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (bookingId, status) => {
        try {
            await bookingService.updateStatus(bookingId, status);
            loadData();
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const handleVerification = async (file) => {
        setVerificationLoading(true);
        try {
            await identityService.verifyIdentity(user.id, file);
            // Refresh user data - in a real app, context would update. 
            // Here we'll force a reload or update local state if we had it.
            // For MVP, simple alert and reload
            alert('Verification successful!');
            window.location.reload();
        } catch (error) {
            alert(error.message);
        } finally {
            setVerificationLoading(false);
            setShowVerificationModal(false);
        }
    };

    if (!user) return <div className="p-8 text-center">로그인이 필요합니다</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                        대시보드
                        {user.isVerified && (
                            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <ShieldCheck className="w-4 h-4 mr-1" />
                                인증됨
                            </span>
                        )}
                    </h1>
                    {!user.isVerified && (
                        <button
                            onClick={() => setShowVerificationModal(true)}
                            className="mt-2 text-sm text-primary-600 hover:text-primary-700 flex items-center font-medium"
                        >
                            <Shield className="w-4 h-4 mr-1" />
                            신뢰를 위해 본인 인증을 해주세요
                        </button>
                    )}
                </div>
                {user.role === 'host' && (
                    <Button onClick={() => setShowAddModal(true)}>
                        <Plus className="w-5 h-5 mr-2" />
                        캠핑카 등록하기
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`${activeTab === 'bookings'
                            ? 'border-primary-500 text-primary-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        {user.role === 'host' ? '예약 관리' : '내 여행'}
                    </button>
                    {user.role === 'host' && (
                        <button
                            onClick={() => setActiveTab('listings')}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'listings'
                                ? 'border-primary-500 text-primary-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            나의 캠핑카
                        </button>
                    )}
                </nav>
            </div>

            {loading ? (
                <div className="text-center py-8">로딩 중...</div>
            ) : (
                <>
                    {activeTab === 'bookings' && (
                        <div className="space-y-4">
                            {bookings.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">예약 내역이 없습니다</h3>
                                </div>
                            ) : (
                                bookings.map((booking) => (
                                    <div key={booking.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {booking.status.toUpperCase()}
                                                </span>
                                                <span className="text-sm text-gray-500">#{booking.id}</span>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900">
                                                캠핑카 예약 #{booking.caravanId}
                                            </h3>
                                            <p className="text-gray-500">
                                                {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                            </p>
                                            <p className="font-semibold text-gray-900 mt-1">
                                                총액: ₩{booking.totalPrice.toLocaleString()}
                                            </p>
                                        </div>

                                        {user.role === 'host' && booking.status === 'pending' && (
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700"
                                                    onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                                >
                                                    <CheckCircle className="w-4 h-4 mr-1" />
                                                    수락
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    className="text-red-600 hover:bg-red-50 border-red-200"
                                                    onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                                >
                                                    <XCircle className="w-4 h-4 mr-1" />
                                                    거절
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'listings' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myCaravans.map((caravan) => (
                                <div key={caravan.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <img src={caravan.images[0]} alt={caravan.title} className="h-48 w-full object-cover" />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-1">{caravan.title}</h3>
                                        <p className="text-gray-500 text-sm mb-4">{caravan.location}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-primary-600">₩{caravan.pricePerDay.toLocaleString()}/박</span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${caravan.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {caravan.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Add Camping Car Modal (Simplified) */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">새로운 캠핑카 등록</h2>
                        <AddCaravanForm onClose={() => { setShowAddModal(false); loadData(); }} />
                    </div>
                </div>
            )}

            {showVerificationModal && (
                <VerificationModal
                    onClose={() => setShowVerificationModal(false)}
                    onVerify={handleVerification}
                    isLoading={verificationLoading}
                />
            )}
        </div>
    );
};

const AddCaravanForm = ({ onClose }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        subLocation: '',
        pricePerDay: 100000,
        capacity: '',
        type: 'Camper Van',
        length: '',
        amenities: []
    });

    const AMENITY_OPTIONS = ['WiFi', 'Kitchen', 'Shower', 'Toilet', 'TV', 'Air Conditioning', 'Heating', 'BBQ', 'Solar Power'];
    const VEHICLE_TYPES = ['Camper Van', 'Motorhome', 'Caravan', 'Travel Trailer', 'Truck Camper'];

    const handleAmenityChange = (amenity) => {
        setFormData(prev => {
            const newAmenities = prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity];
            return { ...prev, amenities: newAmenities };
        });
    };
    const [loading, setLoading] = useState(false);

    const getRandomImages = () => {
        const pool = [
            'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1517816428103-7dc26ec58372?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1627664819818-e147d6221422?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1566847438217-76e82d383f84?auto=format&fit=crop&q=80&w=800'
        ];
        // Shuffle and pick 3-5 images
        const shuffled = pool.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.floor(Math.random() * 3) + 3);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await caravanService.create({
                ...formData,
                location: `${formData.location} ${formData.subLocation}`,
                hostId: user.id,
                images: getRandomImages(),
                hostId: user.id,
                images: getRandomImages(),
                amenities: formData.amenities,
                specs: {
                    length: formData.length,
                    type: formData.type,
                    features: formData.amenities.slice(0, 3) // Just take top 3 as features for specs display
                }
            });
            onClose();
        } catch (error) {
            console.error('Failed to create caravan', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="캠핑카 이름"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">캠핑카 위치</label>
                <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2 bg-white"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value, subLocation: '' })}
                >
                    <option value="">지역 선택</option>
                    {Object.keys(KOREAN_REGIONS).map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
            </div>
            {formData.location && KOREAN_REGIONS[formData.location] && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">세부 지역</label>
                    <select
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2 bg-white"
                        required
                        value={formData.subLocation}
                        onChange={(e) => setFormData({ ...formData, subLocation: e.target.value })}
                    >
                        <option value="">세부 지역 선택</option>
                        {KOREAN_REGIONS[formData.location].map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">1박 가격: ₩{Number(formData.pricePerDay).toLocaleString()}</label>
                    <input
                        type="range"
                        min="10000"
                        max="500000"
                        step="10000"
                        className="w-full"
                        value={formData.pricePerDay}
                        onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                    />
                </div>
                <Input
                    label="수용 인원"
                    type="number"
                    required
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">차량 타입</label>
                    <select
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2 bg-white"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                        {VEHICLE_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <Input
                    label="차량 길이 (예: 5.2m)"
                    required
                    value={formData.length}
                    onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">편의 시설 및 옵션</label>
                <div className="grid grid-cols-3 gap-2">
                    {AMENITY_OPTIONS.map(amenity => (
                        <label key={amenity} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                checked={formData.amenities.includes(amenity)}
                                onChange={() => handleAmenityChange(amenity)}
                            />
                            <span>{amenity}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                <textarea
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>
            <div className="flex space-x-3 pt-4">
                <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>취소</Button>
                <Button type="submit" className="flex-1" isLoading={loading}>등록</Button>
            </div>
        </form>
    );
};

export default Dashboard;
