import { Router } from "express";
import {
	getAmenities,
	createAmenity,
	getAmenityById,
	updateAmenity,
	deleteAmenity,
} from "../services/amenityServices.js";
import { authMiddleware } from "../middleware/auth.js";

export const amenityRouter = new Router();

amenityRouter.get("/", async (req, res) => {
	res.json(await getAmenities());
});

amenityRouter.post("/", authMiddleware, async (req, res) => {
	const { name } = req.body;
	if (name) {
		await createAmenity(name);
		res.status(201).json({ message: "Amenity created successfully" });
	} else {
		res.status(400).json({ message: "Bad request" });
	}
});

amenityRouter.get("/:amenityId", async (req, res) => {
	const { amenityId } = req.params;
	const amenity = await getAmenityById(amenityId);
	if (amenity) {
		res.json(amenity);
	} else {
		res.status(404).json({ message: "Booking not found" });
	}
});

amenityRouter.put("/:amenityId", authMiddleware, async (req, res) => {
	const { amenityId } = req.params;
	const { name } = req.body;
	if (name) {
		const amenity = await getAmenityById(amenityId);
		if (amenity) {
			await updateAmenity(amenityId, {
				name,
			});
			res.json({ message: "Amenity updated successfully" });
		} else {
			res.status(404).json({ message: "Amenity not found" });
		}
	} else {
		res.status(400).json({ message: "Bad request" });
	}
});

amenityRouter.delete("/:amenityId", authMiddleware, async (req, res) => {
	const { amenityId } = req.params;
	const amenity = await getAmenityById(amenityId);
	if (amenity) {
		await deleteAmenity(amenityId);
		res.json({ message: "Amenity deleted successfully" });
	} else {
		res.status(404).json({ message: "Amenity not found" });
	}
});
