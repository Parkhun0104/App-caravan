import { db } from './mockDb';

export const paymentService = {
    processPayment: async (paymentData) => {
        // Simulate card validation
        if (!paymentData.cardNumber || paymentData.cardNumber.length < 16) {
            throw new Error('Invalid card number');
        }

        // Simulate random failure (5% chance)
        if (Math.random() < 0.05) {
            throw new Error('Payment declined by bank');
        }

        return await db.payments.create({
            bookingId: paymentData.bookingId,
            amount: paymentData.amount,
            method: 'credit_card',
            status: 'completed'
        });
    }
};
