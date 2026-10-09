import express from "express";
import { getAllListings, getListingId, getListingType, getListingHostId, getListingTopHosts, updateListing } from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
//router.get("/", getAllListings);
router.get("/", authMiddleware, getAllListings);
router.get("/property-type/:type", authMiddleware, getListingType);
router.get("/host/:host_id", authMiddleware, getListingHostId);
router.get("/top-hosts", authMiddleware, getListingTopHosts);
router.put("/:id", authMiddleware, updateListing);
router.get("/:id", authMiddleware, getListingId);

export default router;
