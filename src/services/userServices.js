import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();

export const getUsers = async (where) => {
	return await prisma.user.findMany({ where });
};

export const createUser = async (
	username,
	password,
	name,
	email,
	phoneNumber,
	profilePicture
) => {
	const prisma = new PrismaClient();
	await prisma.user.create({
		data: {
			username,
			password,
			name,
			email,
			phoneNumber,
			profilePicture,
			id: v4(),
		},
	});
};

export const getUserById = async (id) => {
	return await prisma.user.findFirst({ where: { id } });
};

export const updateUser = async (id, data) => {
	await prisma.user.updateMany({ where: { id }, data });
};

export const deleteUser = async (id) => {
	await prisma.user.deleteMany({ where: { id } });
};
