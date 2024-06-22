import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();

export const getProperties = async () => {
	return await prisma.property.findMany();
};

export const createProperty = async (
	title,
	description,
	location,
	pricePerNight,
	bedroomCount,
	bathRoomCount,
	maxGuestCount,
	hostId,
	rating
) => {
	await prisma.property.create({
		data: {
			title,
			description,
			location,
			pricePerNight,
			bedroomCount,
			bathRoomCount,
			maxGuestCount,
			hostId,
			rating,
			id: v4(),
		},
	});
};

export const getPropertyById = async (id) => {
	return await prisma.property.findFirst({ where: { id } });
};

export const updateProperty = async (id, data) => {
	await prisma.property.updateMany({ where: { id }, data });
};

export const deleteProperty = async (id) => {
	await prisma.property.deleteMany({ where: { id } });
};
