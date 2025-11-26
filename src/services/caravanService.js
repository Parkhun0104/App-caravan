import { db } from './mockDb';

export const caravanService = {
    getAll: async () => {
        return await db.caravans.findAll();
    },

    getById: async (id) => {
        return await db.caravans.findById(id);
    },

    search: async (filters) => {
        console.log('Searching with filters:', filters);
        const all = await db.caravans.findAll();
        const results = all.filter(c => {
            if (filters.location && !c.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
            if (filters.subLocation && !c.location.toLowerCase().includes(filters.subLocation.toLowerCase())) return false;
            // Handle minPrice 0 correctly (0 is falsy but valid)
            if (filters.minPrice !== '' && filters.minPrice !== null && c.pricePerDay < Number(filters.minPrice)) return false;
            if (filters.maxPrice !== '' && filters.maxPrice !== null && c.pricePerDay > Number(filters.maxPrice)) return false;
            if (filters.capacity && c.capacity < Number(filters.capacity)) return false;
            return true;
        });
        console.log('Search results:', results.length);
        return results;
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
