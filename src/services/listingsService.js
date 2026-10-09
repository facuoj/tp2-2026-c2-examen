import { findAllListings, findListingById, findListingByType, findListingByHostId, findListingTopHostsByLimit } from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const getListingByType = async (type) => {
    return await findListingByType(type);
}

export const getListingByHostId = async (host_id) => {
    return await findListingByHostId(host_id);
}

export const getListingTopHostsByLimit = async (limit) => {
    return await findListingTopHostsByLimit(limit);
}

export async function replaceListing(id, data) {
    validateListingData(data);
    const { availability_30, availability_60, availability_90, availability_365 } = data;
    const updated = await updateListing(id, { availability_30, availability_60, availability_90, availability_365 });
    if (!updated) {
        throw createHttpError(404, "Propiedad no encontrada");
    }
    return updated;
}