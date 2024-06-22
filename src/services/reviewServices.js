import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();

export const getReviews = async () => {
	return await prisma.review.findMany();
};

export const createReview = async (userId, propertyId, rating, comment) => {
	await prisma.review.create({
		data: { userId, propertyId, rating, comment, id: v4() },
	});
};

export const getReviewById = async (id) => {
	return await prisma.review.findFirst({ where: { id } });
};

export const updateReview = async (id, data) => {
	await prisma.review.updateMany({ where: { id }, data });
};

export const deleteReview = async (id) => {
	await prisma.review.deleteMany({ where: { id } });
};
