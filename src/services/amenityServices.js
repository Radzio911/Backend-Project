import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();

export const getAmenities = async () => {
	return await prisma.amenity.findMany();
};

export const createAmenity = async (name) => {
	await prisma.amenity.create({
		data: { name, id: v4() },
	});
};

export const getAmenityById = async (id) => {
	return await prisma.amenity.findFirst({ where: { id } });
};

export const updateAmenity = async (id, data) => {
	await prisma.amenity.updateMany({ where: { id }, data });
};

export const deleteAmenity = async (id) => {
	await prisma.amenity.deleteMany({ where: { id } });
};
