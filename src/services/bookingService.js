import { db } from './mockDb';

export const bookingService = {
    create: async (bookingData) => {
        // Check for overlaps
        const allBookings = await db.bookings.findAll();
        const caravanBookings = allBookings.filter(b => b.caravanId === bookingData.caravanId && b.status !== 'cancelled');

        const hasOverlap = caravanBookings.some(b => {
            const start = new Date(b.startDate);
            const end = new Date(b.endDate);
            const newStart = new Date(bookingData.startDate);
            const newEnd = new Date(bookingData.endDate);
            return (newStart < end && newEnd > start);
        });

        if (hasOverlap) {
            throw new Error('Selected dates are not available');
        }

        // Calculate total price
        const caravan = await db.caravans.findById(bookingData.caravanId);
        const days = Math.ceil((new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24));
        const totalPrice = days * caravan.pricePerDay;

        return await db.bookings.create({
            ...bookingData,
            totalPrice,
            createdAt: new Date().toISOString()
        });
    },

    getUserBookings: async (userId, role) => {
        return await db.bookings.findByUser(userId, role);
    },

    updateStatus: async (id, status) => {
        return await db.bookings.update(id, { status });
    }
};
