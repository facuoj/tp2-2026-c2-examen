import { getListings, getListingById, getListingByType, getListingByHostId, getListingTopHostsByLimit, replaceListing } from "../services/listingsService.js";

export const getAllListings = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const listings = await getListings(page, pageSize);
        res.json(listings);
    } catch (error) {
        console.log("Error fetching listings: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingId = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const listing = await getListingById(id);
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingType = async (req, res) => {
    try {
        const type = req.params.type;
        console.log(type);
        const listing = await getListingByType(type);
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingHostId = async (req, res) => {
    try {
        const host_id = req.params.host_id;
        console.log(host_id);
        const listing = await getListingByHostId(host_id);
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingTopHosts = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const topHosts = await getListingTopHostsByLimit(limit);
        res.json(topHosts);
    } catch (error) {
        console.log("Error fetching top hosts: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function updateListing(req, res, next) {
    try {
        const { id } = req.params;
        const listing = await replaceListing(id, req.body);
        res.status(200).json({ message: "Propiedad actualizada", data: listing });
    } catch (error) {
        console.log("Error fetching update: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}