import { db } from './mockDb';

export const caravanService = {
    getAll: async () => {
        return await db.caravans.findAll();
    },

    getById: async (id) => {
        return await db.caravans.findById(id);
    },

    search: async (filters) => {
        const all = await db.caravans.findAll();
        return all.filter(c => {
            if (filters.location && !c.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
            if (filters.minPrice && c.pricePerDay < filters.minPrice) return false;
            if (filters.maxPrice && c.pricePerDay > filters.maxPrice) return false;
            if (filters.capacity && c.capacity < filters.capacity) return false;
            return true;
        });
    },

    create: async (caravanData) => {
        return await db.caravans.create({
            ...caravanData,
            status: 'available',
            rating: 0,
            reviewCount: 0
        });
    },

    updateStatus: async (id, status) => {
        return await db.caravans.update(id, { status });
    }
};
