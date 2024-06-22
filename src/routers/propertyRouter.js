import { Router } from "express";
import {
	getProperties,
	createProperty,
	getPropertyById,
	updateProperty,
	deleteProperty,
} from "../services/propertyServices.js";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.js";

export const propertyRouter = new Router();

propertyRouter.get("/", async (req, res) => {
	const prisma = new PrismaClient();
	const { location, pricePerNight, amenities } = req.query;
	const where = {};
	const include = {};
	if (location) {
		where.location = location;
	}
	if (pricePerNight) {
		where.pricePerNight = parseFloat(pricePerNight);
	}
	if (amenities) {
		where.amenities = {
			some: {
				amenity: {
					name: amenities,
				},
			},
		};
		include.amenities = {
			include: { amenity: true },
		};
	}
	res.json(await prisma.property.findMany({ where, include }));
});
propertyRouter.post("/", authMiddleware, async (req, res) => {
	const {
		title,
		description,
		location,
		pricePerNight,
		bedroomCount,
		bathRoomCount,
		maxGuestCount,
		hostId,
		rating,
	} = req.body;
	if (
		title &&
		description &&
		location &&
		pricePerNight &&
		bedroomCount &&
		bathRoomCount &&
		maxGuestCount &&
		hostId &&
		rating
	) {
		await createProperty(
			title,
			description,
			location,
			pricePerNight,
			bedroomCount,
			bathRoomCount,
			maxGuestCount,
			hostId,
			rating
		);
		res.status(201).json({ message: "Property created successfully" });
	} else {
		res.status(400).json({ message: "Bad request" });
	}
});

propertyRouter.get("/:propertyId", async (req, res) => {
	const { propertyId } = req.params;
	const property = await getPropertyById(propertyId);
	if (property) {
		res.json(property);
	} else {
		res.status(404).json({ message: "Property not found" });
	}
});

propertyRouter.put("/:propertyId", authMiddleware, async (req, res) => {
	const { propertyId } = req.params;
	const {
		title,
		description,
		location,
		pricePerNight,
		bedroomCount,
		bathRoomCount,
		maxGuestCount,
		rating,
	} = req.body;
	if (
		title &&
		description &&
		location &&
		pricePerNight &&
		bedroomCount &&
		bathRoomCount &&
		maxGuestCount &&
		rating
	) {
		const property = await getPropertyById(propertyId);
		if (property) {
			await updateProperty(propertyId, {
				title,
				description,
				location,
				pricePerNight,
				bedroomCount,
				bathRoomCount,
				maxGuestCount,
				rating,
			});
			res.json({ message: "Property updated successfully" });
		} else {
			res.status(404).json({ message: "Property not found" });
		}
	} else {
		res.status(400).json({ message: "Bad request" });
	}
});

propertyRouter.delete("/:propertyId", authMiddleware, async (req, res) => {
	const { propertyId } = req.params;
	const property = await getPropertyById(propertyId);
	if (property) {
		await deleteProperty(propertyId);
		res.json({ message: "Property deleted successfully" });
	} else {
		res.status(404).json({ message: "Property not found" });
	}
});
