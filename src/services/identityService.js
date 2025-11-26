import { db } from './mockDb';

export const identityService = {
    verifyIdentity: async (userId, documentData) => {
        // Simulate document upload and verification delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate random rejection (10% chance)
        if (Math.random() < 0.1) {
            throw new Error('Verification failed. Document unclear.');
        }

        // Update user status in DB
        await db.users.update(userId, { isVerified: true });

        return { success: true };
    }
};
