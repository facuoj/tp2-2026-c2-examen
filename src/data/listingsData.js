import { ObjectId } from "mongodb";
import { getDb } from "./connection.js";

export async function findAllListings(page, pageSize) {
    const db = getDb();
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const listings = await db.collection("listingsAndReviews")
            .find()
            .skip(skip)
            .limit(pageSize)
            .toArray();
        return listings;
    } else {
        // Sin paginación: trae todos los documentos
        const listings = await db.collection("listingsAndReviews").find().toArray();
        return listings;
    }
}

export async function findListingById(id) {
    const db = getDb();
    const listing = await db.collection("listingsAndReviews").findOne({ _id: id });
    console.log(listing);
    return listing;
}

export async function findListingByType(type) {
    const db = getDb();
    const listing = await db.collection("listingsAndReviews").find({ property_type: type }).limit(20).toArray();
    console.log(listing);
    return listing;
}

export async function findListingByHostId(host_id) {
    const db = getDb();
    const listing = await db.collection("listingsAndReviews").find({ "host.host_id": host_id }).limit(20).toArray();
    console.log(listing);
    return listing;
}

export async function findListingTopHostsByLimit(limit) {
    const db = getDb();
    const topHosts = await db.collection("listingsAndReviews")
        .aggregate([
            { $group: { _id: "$host.host_id", host_name: { $first: "$host.name" }, property_count: { $sum: 1 } } },
            { $sort: { property_count: -1 } },
            { $limit: limit }
        ])
        .toArray();
    return topHosts;
}

export async function updateListing(id, listingData) {
    const _id = findListingByHostId(id);
    if (!_id) return null;
    const updated = await getCollection().findOneAndReplace({ _id }, listingData, { returnDocument: "after" });
    return updated;
}
