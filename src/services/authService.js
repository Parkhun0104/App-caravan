import { db } from './mockDb';

export const authService = {
    login: async (email, password) => {
        const user = await db.users.find(u => u.email === email);
        if (!user) throw new Error('User not found');
        if (user.passwordHash !== password) throw new Error('Invalid password'); // Simple check for mock

        // Return user without password
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    },

    register: async (userData) => {
        const existing = await db.users.find(u => u.email === userData.email);
        if (existing) throw new Error('Email already exists');

        const newUser = await db.users.create({
            ...userData,
            trustScore: 0,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`
        });

        const { passwordHash, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    },

    getCurrentUser: async () => {
        // In a real app, this would check a token
        const stored = localStorage.getItem('currentUser');
        return stored ? JSON.parse(stored) : null;
    },

    logout: async () => {
        localStorage.removeItem('currentUser');
    }
};
