/**
 * Mock Database using localStorage
 * Simulates a database with tables for users, caravans, bookings, reviews.
 */

const DB_KEYS = {
    USERS: 'caravan_users',
    CARAVANS: 'caravan_items',
    BOOKINGS: 'caravan_bookings',
    REVIEWS: 'caravan_reviews',
    PAYMENTS: 'caravan_payments',
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
                title: 'Vintage Airstream in the Woods',
                description: 'Experience nature in this beautifully restored 1970s Airstream. Located in a private forest clearing.',
                location: 'Portland, OR',
                pricePerDay: 120,
                capacity: 2,
                status: 'available',
                images: [
                    'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800'
                ],
                amenities: ['WiFi', 'Kitchen', 'Heating', 'Fire Pit'],
                rating: 4.9,
                reviewCount: 12
            },
            {
                id: 'caravan_2',
                hostId: 'user_1',
                title: 'Modern Camper Van with Ocean View',
                description: 'Wake up to the sound of waves in this fully equipped modern camper van.',
                location: 'Malibu, CA',
                pricePerDay: 200,
                capacity: 4,
                status: 'available',
                images: [
                    'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800'
                ],
                amenities: ['Ocean View', 'Solar Power', 'Shower', 'BBQ'],
                rating: 4.7,
                reviewCount: 8
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
