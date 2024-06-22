import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();

export const getHosts = async (where) => {
	return await prisma.host.findMany({ where });
};

export const createHost = async (
	username,
	password,
	name,
	email,
	phoneNumber,
	profilePicture,
	aboutMe
) => {
	const prisma = new PrismaClient();
	await prisma.host.create({
		data: {
			username,
			password,
			name,
			email,
			phoneNumber,
			profilePicture,
			aboutMe,
			id: v4(),
		},
	});
};

export const getHostById = async (id) => {
	return await prisma.host.findFirst({ where: { id } });
};

export const updateHost = async (id, data) => {
	await prisma.host.updateMany({ where: { id }, data });
};

export const deleteHost = async (id) => {
	await prisma.host.deleteMany({ where: { id } });
};
