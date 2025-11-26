/**
 * Mock Database using localStorage
 * Simulates a database with tables for users, caravans, bookings, reviews.
 */

const DB_KEYS = {
    USERS: 'caravan_users_v5',
    CARAVANS: 'caravan_items_v5',
    BOOKINGS: 'caravan_bookings_v5',
    REVIEWS: 'caravan_reviews_v5',
    PAYMENTS: 'caravan_payments_v5',
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getTable = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

const setTable = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Seed initial data if empty
export const seedDatabase = () => {
    if (!localStorage.getItem(DB_KEYS.USERS)) {
        const initialUsers = [
            {
                id: 'user_1',
                email: 'host@test.com',
                passwordHash: 'password', // In real app, this would be hashed
                role: 'host',
                name: 'John Host',
                trustScore: 4.8,
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                id: 'user_2',
                email: 'guest@test.com',
                passwordHash: 'password',
                role: 'guest',
                name: 'Jane Guest',
                trustScore: 4.5,
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            }
        ];
        setTable(DB_KEYS.USERS, initialUsers);
    }

    if (!localStorage.getItem(DB_KEYS.CARAVANS)) {
        const initialCaravans = [
            {
                id: 'caravan_1',
                hostId: 'user_1',
                title: '에어스트림 플라잉 클라우드 23FB',
                description: '숲속에서 즐기는 빈티지 감성 캠핑. 1970년대 에어스트림을 완벽하게 복원했습니다.',
                location: '강원 강릉시',
                pricePerDay: 120000,
                capacity: 2,
                status: 'available',
                images: [
                    'https://images.unsplash.com/photo-1627664819818-e147d6221422?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800'
                ],
                amenities: ['WiFi', 'Kitchen', 'Heating', 'Fire Pit'],
                specs: {
                    length: '23ft',
                    type: 'Travel Trailer',
                    features: ['Queen Bed', 'Full Bath', 'Solar Panels']
                },
                rating: 4.9,
                reviewCount: 12
            },
            {
                id: 'caravan_2',
                hostId: 'user_1',
                title: '현대 스타리아 라운지 캠퍼',
                description: '오션뷰와 함께하는 모던한 캠핑. 최신형 스타리아 캠퍼로 편안한 여행을 즐기세요.',
                location: '제주 제주시',
                pricePerDay: 200000,
                capacity: 4,
                status: 'available',
                images: [
                    'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1517816428103-7dc26ec58372?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1533630763629-679c94162c8d?auto=format&fit=crop&q=80&w=800'
                ],
                amenities: ['Ocean View', 'Solar Power', 'Shower', 'BBQ'],
                specs: {
                    length: '5.2m',
                    type: 'Camper Van',
                    features: ['Pop-up Roof', 'Slide-out Table', 'Awning']
                },
                rating: 4.7,
                reviewCount: 8
            },
            {
                id: 'caravan_3',
                hostId: 'user_1',
                title: '위네바고 미니 위니 31K',
                description: '온 가족이 함께 즐길 수 있는 넓고 편안한 럭셔리 모터홈입니다. 모든 편의시설이 완비되어 있습니다.',
                location: '경기 가평군',
                pricePerDay: 350000,
                capacity: 6,
                status: 'available',
                images: [
                    'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1566847438217-76e82d383f84?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1519003300449-424ad0405076?auto=format&fit=crop&q=80&w=800'
                ],
                amenities: ['TV', 'Air Conditioning', 'Full Kitchen', 'Shower', 'Toilet'],
                specs: {
                    length: '32ft',
                    type: 'Class C Motorhome',
                    features: ['Slide-out', 'Generator', 'Rear Bedroom']
                },
                rating: 4.9,
                reviewCount: 24
            },
            {
                id: 'caravan_4',
                hostId: 'user_1',
                title: '폭스바겐 T6 캘리포니아',
                description: '커플 여행에 딱 맞는 아늑하고 감성적인 미니 캠퍼밴입니다. 어디든 자유롭게 떠나보세요.',
                location: '부산 해운대구',
                pricePerDay: 150000,
                capacity: 2,
                status: 'available',
                images: [
                    'https://images.unsplash.com/photo-1517816428103-7dc26ec58372?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800'
                ],
                amenities: ['Bluetooth Speaker', 'Camping Chairs', 'Mini Fridge', 'Stove'],
                specs: {
                    length: '4.9m',
                    type: 'Camper Van',
                    features: ['Pop-top Roof', 'Swivel Seats', 'Kitchenette']
                },
                rating: 4.8,
                reviewCount: 15
            },
            {
                id: 'caravan_5',
                hostId: 'user_1',
                title: '포레스트 리버 와일드우드',
                description: '편안한 휴식을 위한 고정형 카라반입니다. 넓은 데크와 바베큐 시설이 준비되어 있습니다.',
                location: '강원 춘천시',
                pricePerDay: 180000,
                capacity: 4,
                status: 'available',
                images: [
                    'https://images.unsplash.com/photo-1627664819818-e147d6221422?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1496080174650-637e3f22fa03?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1470246973918-29a53295c452?auto=format&fit=crop&q=80&w=800'
                ],
                amenities: ['Deck', 'BBQ Grill', 'Heating', 'WiFi'],
                specs: {
                    length: '26ft',
                    type: 'Travel Trailer',
                    features: ['Bunk Beds', 'Outdoor Kitchen', 'Large Awning']
                },
                rating: 4.6,
                reviewCount: 32
            }
        ];
        setTable(DB_KEYS.CARAVANS, initialCaravans);
    }
};

export const db = {
    users: {
        find: async (predicate) => {
            await delay(300);
            const users = getTable(DB_KEYS.USERS);
            return users.find(predicate);
        },
        create: async (user) => {
            await delay(300);
            const users = getTable(DB_KEYS.USERS);
            const newUser = { ...user, id: `user_${Date.now()}` };
            users.push(newUser);
            setTable(DB_KEYS.USERS, users);
            return newUser;
        },
        update: async (id, updates) => {
            await delay(300);
            const users = getTable(DB_KEYS.USERS);
            const index = users.findIndex(u => u.id === id);
            if (index !== -1) {
                users[index] = { ...users[index], ...updates };
                setTable(DB_KEYS.USERS, users);
                return users[index];
            }
            return null;
        }
    },
    caravans: {
        findAll: async () => {
            await delay(300);
            return getTable(DB_KEYS.CARAVANS);
        },
        findById: async (id) => {
            await delay(300);
            const caravans = getTable(DB_KEYS.CARAVANS);
            return caravans.find(c => c.id === id);
        },
        create: async (caravan) => {
            await delay(300);
            const caravans = getTable(DB_KEYS.CARAVANS);
            const newCaravan = { ...caravan, id: `caravan_${Date.now()}` };
            caravans.push(newCaravan);
            setTable(DB_KEYS.CARAVANS, caravans);
            return newCaravan;
        },
        update: async (id, updates) => {
            await delay(300);
            const caravans = getTable(DB_KEYS.CARAVANS);
            const index = caravans.findIndex(c => c.id === id);
            if (index !== -1) {
                caravans[index] = { ...caravans[index], ...updates };
                setTable(DB_KEYS.CARAVANS, caravans);
                return caravans[index];
            }
            return null;
        }
    },
    bookings: {
        findAll: async () => {
            await delay(300);
            return getTable(DB_KEYS.BOOKINGS);
        },
        create: async (booking) => {
            await delay(300);
            const bookings = getTable(DB_KEYS.BOOKINGS);
            const newBooking = { ...booking, id: `booking_${Date.now()}`, status: 'pending' };
            bookings.push(newBooking);
            setTable(DB_KEYS.BOOKINGS, bookings);
            return newBooking;
        },
        update: async (id, updates) => {
            await delay(300);
            const bookings = getTable(DB_KEYS.BOOKINGS);
            const index = bookings.findIndex(b => b.id === id);
            if (index !== -1) {
                bookings[index] = { ...bookings[index], ...updates };
                setTable(DB_KEYS.BOOKINGS, bookings);
                return bookings[index];
            }
            return null;
        },
        findByUser: async (userId, role) => {
            await delay(300);
            const bookings = getTable(DB_KEYS.BOOKINGS);
            if (role === 'host') {
                // Find bookings for caravans owned by this host
                const caravans = getTable(DB_KEYS.CARAVANS);
                const myCaravanIds = caravans.filter(c => c.hostId === userId).map(c => c.id);
                return bookings.filter(b => myCaravanIds.includes(b.caravanId));
            } else {
                return bookings.filter(b => b.guestId === userId);
            }
        }
    },
    payments: {
        create: async (payment) => {
            await delay(500); // Simulate processing time
            const payments = getTable(DB_KEYS.PAYMENTS);
            const newPayment = { ...payment, id: `payment_${Date.now()}`, timestamp: new Date().toISOString() };
            payments.push(newPayment);
            setTable(DB_KEYS.PAYMENTS, payments);
            return newPayment;
        }
    }
};
